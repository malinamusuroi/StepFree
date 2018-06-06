const express = require('express');
const app = express();
const request = require('request');
const inArray = require('in-array');

app.get('/getDirections', function (req, res) {
    getDirections(req.query.origin, req.query.destination, function (json) {
        res.json(json);
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
        }, function (err, response) {
            if (!err) {
                getAccessibility(function (allStations) {
                    const j = {
                        duration: response.json.routes[0].legs[0].duration.text,
                        stations: usedStations(response.json.routes[0].legs),
                        accessibility: allStations.filter((station) => inArray(usedStations(response.json.routes[0].legs),
                            station.stationName))
                    };
                    callback(j);
                });
            }
            else {
                console.error(err);
            }
        }
    );
}

function usedStations(legs) {
    const stations = legs[0].steps.filter((step) => step.travel_mode === "TRANSIT")
        .map((e) => e.transit_details)
        .map((details) => [details.departure_stop.name, details.arrival_stop.name]);
    return Array.from(new Set([].concat.apply([], stations)))
        .map((station) => (station.replace(" Station", "")))
        .map((station) => (station.replace(" London Underground", "")));
}

function getAccessibility(callback) {
    request("https://tfl.gov.uk/tfl/syndication/feeds/step-free-tube-guide.xml", function (err, response, body) {
        const parseString = require('xml2js').parseString;
        parseString(body, function (err, result) {
            if (!err) {
                callback(result.Stations.Station.map(function (station) {
                    return {
                        stationName: station.StationName[0],
                        lift: (station.Accessibility[0].Lifts[0].AccessViaLift[0] === "" ? "No" :
                            station.Accessibility[0].Lifts[0].AccessViaLift[0]),
                        lineInfo: station.Lines[0] === "\r\n\r\n    " ? null : getLineDetails(station.Lines[0])
                    };
                }));
            } else {
                console.error(err);
            }
        });
    });
}

function getLineDetails(line) {
    return line.Line.map(function (line) {
        return {
            lineName: line.LineName[0],
            direction: line.Direction[0],
            directionTowards: line.DirectionTowards[0],
            stepMin: line.StepMin[0],
            stepMax: line.StepMax[0],
            gapMin: line.GapMin[0],
            gapMax: line.GapMax[0],
            manualRamp: line.LevelAccessByManualRamp[0]
        };
    });
}

app.listen(process.env.PORT || 3000);
