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
            callback(response.json.routes.map(function (route) {
                return {
                    duration: route.legs[0].duration.text,
                    departureTime: route.legs[0].departure_time.text,
                    arrivalTime: route.legs[0].arrival_time.text,
                    steps: getSteps(route.legs[0])
                };
            }));
        } else {
            console.error(err);
        }
    })
}

function getSteps(leg) {
    return leg.steps.map(function (step) {
        return {
            travelMode: step.travel_mode,
            durationOfStep: step.duration.text,
            instruction: step.html_instructions,
            lineDetails: step.transit_details != null ?
                {
                    departureStop: step.transit_details.departure_stop.name,
                    lineType: step.transit_details.line.name,
                    vehicle: step.transit_details.line.vehicle.type,
                    number: step.transit_details.line.short_name,
                    numberOfStops: step.transit_details.num_stops,
                    arrivalStop: step.transit_details.arrival_stop.name
                } : null
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
