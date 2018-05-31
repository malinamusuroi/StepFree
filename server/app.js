const express = require('express');
const app = express();

app.get('/getDirections', function (req, res) {

    getDirections(req.query.origin, req.query.destination, function (json) {
        res.json(json)
    })
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

function getInstruction(legs) {
    return legs[0].steps.map((step) => step.html_instructions);
}

app.listen(process.env.PORT || 3000);
