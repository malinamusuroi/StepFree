const express = require('express');
const app = express();

app.get('/getDirections', function (req, res) {
    console.log("received get directions");

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
            const json = {
                origin: origin,
                destination: destination,
                legs: response.json.routes[0].legs
            };
            callback(json)
        } else {
            console.error(err);
        }
    });
}

app.listen(process.env.PORT || 3000);
