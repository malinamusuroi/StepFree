const express = require('express');
const app = express();
const request = require('request');
const inArray = require('in-array');

app.get('/getDirections', function (req, res) {
    getDirections(req.query.origin, req.query.destination, req.query.departure_time, function (json) {
        res.json({routes: json});
    });
});

const googleMapsClient = require('@google/maps').createClient({
    key: process.env.WEBAPPS_GMAPS_KEY
});

function getDirections(origin, destination, departure_time, callback) {
    console.log(origin, destination);
    googleMapsClient.directions({
        origin: origin,
        destination: destination,
        mode: 'transit',
        departure_time: departure_time,
        alternatives: true
        
    }, function (err, response) {
        if (!err) {
            getAccessibility(function (allStations) {
                callback(response.json.routes.map(function (route) {
                    return {
                        duration: route.legs[0].duration.text,
                        departureTime: route.legs[0].departure_time.text,
                        arrivalTime: route.legs[0].arrival_time.text,
                        steps: getSteps(route.legs[0]),
                        accessibility: '' + isStepFree(allStations.filter((station) => inArray(usedStations(route.legs),
                            station.stationName)))
                    };
                })//.filter((r) => r.accessibility)
                );
            })
        } else {
            console.error(err);
        }
    })
}

function isStepFree(access) {
    if (access.length === 0) {return "Step Free Route"}
    var info = access.map((station) => station.lift === 'Yes').reduce((x, y) => x && y);
    return info ? "Step Free Route" : "Not Step Free Route"
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

function usedStations(legs) {
    const stations = legs[0].steps.filter((step) => step.travel_mode === "TRANSIT")
        .map((e) => e.transit_details)
        .map((details) => [details.departure_stop.name, details.arrival_stop.name]);
    return Array.from(new Set([].concat.apply([], stations)))
        .map((station) => (station.replace(" London Underground Station", "")))
        .map((station) => (station.replace(" Station", "")));
}

function getAccessibility(callback) {
    request("https://tfl.gov.uk/tfl/syndication/feeds/step-free-tube-guide.xml", function (err, response, body) {
        const parseString = require('xml2js').parseString;
        parseString(body, function (err, result) {
            if (!err) {
                callback(result.Stations.Station.map(function (station) {
                    const liftExistence = station.Accessibility[0].Lifts[0].AccessViaLift[0];
                    return {
                        stationName: station.StationName[0],
                        lift: (liftExistence === "" ? "No" : liftExistence),
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
