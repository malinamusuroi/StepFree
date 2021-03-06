const express = require('express');
const app = express();
const request = require('request');
const inArray = require('in-array');
const controller = require('./controller');

app.get('/getDirections', function (req, res) {
    getDirections(req.query.origin, req.query.destination, req.query.departure_time, 'subway', function (subway) {

        getDirections(req.query.origin, req.query.destination, req.query.departure_time, 'bus', function (bus) {
            const routesJson = subway.filter((route) => route.accessibility.trim() === "Not Step Free Route");
            const busJson = filterStepFree(subway, bus);
            res.json({routes: (routesJson), bus: (busJson)});
        });
    });
});

app.get('/rateStation', function (req, res) {
    controller.rate(req.query.station, req.query.rating);
});

const googleMapsClient = require('@google/maps').createClient({
    key: process.env.WEBAPPS_GMAPS_KEY
});

function getDirections(origin, destination, departure_time, transitType, callback) {
    googleMapsClient.directions({
        origin: origin,
        destination: destination,
        mode: 'transit',
        transit_mode: transitType,
        departure_time: departure_time,
        alternatives: true
    }, function (err, response) {
        if (!err) {
            getAccessibility(function (allStations) {
                callback(response.json.routes.map(function (route) {
                    const duration = route.legs[0].duration.text;
                    let departureTime = "";
                    if (route.legs[0].departure_time) {
                       departureTime = route.legs[0].departure_time.text;
                    }
                    let arrivalTime = "";
                    if (route.legs[0].arrival_time) {
                        arrivalTime = route.legs[0].arrival_time.text;
                    }
                    const steps = getSteps(route.legs[0]);
                    const accessSteps = fillAccessibility(steps, allStations.filter((station) => inArray(usedStations(route.legs),
                        station.stationName)));

                    return {
                        duration: convertToMinutes(duration),
                        departureTime: departureTime,
                        arrivalTime: arrivalTime,
                        steps: accessSteps,
                        accessibility: '' + isStepFree(allStations.filter((station) => inArray(usedStations(route.legs),
                            station.stationName))),
                        usedStations: usedStations(route.legs)
                    };
                })
                );
            })
        } else {
            console.error(err);
        }
    });
}

function convertToMinutes(duration) {
    const arr = duration.split(' ');
    if (arr[1].trim() === 'hour') {
        return (parseInt(arr[0]) * 60 + parseInt(arr[2])) + " mins";
    }
    return duration
}

function filterStepFree(subway, bus) {
    const stepFreeSubway = subway.filter((route) => route.accessibility === "Step Free Route");
    stepFreeSubway.map((x) => bus.push(x));
    return bus.filter((route) => route.accessibility === "Step Free Route");
}

function fillAccessibility(steps, accessInfo) {
    return steps.map((step) => {
        if (step.travelMode === "TRANSIT") {
            let lineDetails = step.lineDetails;
            lineDetails.departureAccess = getAccess(lineDetails.departureStop, lineDetails.lineType, accessInfo);
            lineDetails.arrivalAccess = getAccess(lineDetails.arrivalStop, lineDetails.lineType, accessInfo);
            step.lineDetails = lineDetails;
            return step;
        } else {
            return step;
        }
    })
}

function stationIsEqual(s1, s2) {
    s2 = s2.replace(" London Underground Station", "");
    s2 = s2.replace(" Station", "");
    return s1 === s2;
}

function getAccess(stop, lineType, accessInfo) {
    const access = accessInfo.filter(x => stationIsEqual(x.stationName, stop));
    return access.map(a => {
        return {
            lift: a.lift,
            lineInfo: (a.lineInfo || []).filter(x => x.lineName === lineType)
        }
    })
}

function isStepFree(access) {
    if (access.length === 0) {return "Step Free Route"}
    const info = access.map((station) => station.lift === 'Yes').reduce((x, y) => x && y);
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
