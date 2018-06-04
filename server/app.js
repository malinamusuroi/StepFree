const express = require('express');
const app = express();
const request = require('request');
const zip = require('zip-array');

app.get('/getDirections', function (req, res) {
    getDirections(req.query.origin, req.query.destination, function (json) {
        res.json({routes: json});
    });
});

const googleMapsClient = require('@google/maps').createClient({
    key: process.env.WEBAPPS_GMAPS_KEY
});

function getDirections(origin, destination, callback) {
    googleMapsClient.directions({
        origin: origin,
        destination: destination,
        mode: 'transit',
        alternatives: true
    }, function (err, response) {
        if (!err) {
            callback(response.json.routes.map(function (x) {
                return {
                    duration: x.legs[0].duration.text,
                    legs: getInstruction(x.legs)
                };
            }));
        } else {
            console.error(err);
        }
    })
}

function getAccessibility(callback) {
    request("https://tfl.gov.uk/tfl/syndication/feeds/step-free-tube-guide.xml", function (err, response, body) {
        const parseString = require('xml2js').parseString;
        parseString(body, function (err, result) {
            if (!err) {
                const xml = {
                    /* Lift existence: Yes/No/Undefined */
                    liftExistence: getLiftInformation(result.Stations),
                    lineInformation: getLineInformation(result.Stations)
                };
                callback(JSON.stringify(xml));
            } else {
                console.error(err);
            }
        });
    });
}

function getInstruction(legs) {
    return legs[0].steps.map((step) => step.html_instructions);
}

function getStationNames(stations) {
    return stations.Station.map((station) => station.StationName[0]);
}

function getLiftInformation(stations) {
    return zip.zip_longest(getStationNames(stations),
        stations.Station.map((station) => station.Accessibility[0].Lifts[0].AccessViaLift[0])
            .map((info) => (info === "") ? "No" : info));
}

function getLineInformation(stations) {
    const usableStations = (stations.Station).filter((i) => !(i.Lines[0] === "\r\n\r\n    "));
    return zip.zip_longest(usableStations.map((station) => station.StationName),
        usableStations.map((station) => station.Lines[0]).map((line) => line.Line));
}

app.listen(process.env.PORT || 3000);
