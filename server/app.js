var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.get('/getDirections', function (req, res) {
    console.log("received get directions")
    res.json({message: 'It is too far'});
})

app.listen(3000);