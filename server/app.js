const express = require('express');
const app = express();
const request = require('request');
const zip = require('zip-array');

app.get('/getDirections', function (req, res) {

    getDirections(req.query.origin, req.query.destination, function (json) {
        res.json(json);
    });
});

getAccessibility(function (body) {
    console.log(body);
});

const googleMapsClient = require('@google/maps').createClient({
    key: process.env.WEBAPPS_GMAPS_KEY
});

function getDirections(origin, destination, callback) {
    googleMapsClient.directions({
        origin: origin,
        destination: destination,
        mode: 'transit',
    }, function (err, response) {
        if (!err) {
            const j = {
                duration: response.json.routes[0].legs[0].duration.text,
                legs: getInstruction(response.json.routes[0].legs)
            };
            callback(j)
        } else {
            console.error(err);
        }
    });
}

function getAccessibility(callback) {
    request("https://tfl.gov.uk/tfl/syndication/feeds/step-free-tube-guide.xml", function (err, response, body) {
        const parseString = require('xml2js').parseString;
        parseString(body, function (err, result) {
            if (!err) {
                const xml = {
                    /* Lift existence: Yes/No/Undefined */
                    liftExistence: getLiftInformation(result.Stations)
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
        stations.Station.map((station) => station.Accessibility[0].Lifts[0].AccessViaLift[0]));
}

app.listen(process.env.PORT || 3000);
