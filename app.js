var express = require('express');
var http = require('http');
var app = express();
var pg = require('pg');

// set the port of our application
var port = process.env.PORT || 8080;

var connectionString = {
    user: 'zziybtldxgdpqt',
    password: '1alMVnpHdShvbCMgbn9AGJNxND',
    database: 'd3etic8hcd3h7c',
    host: 'ec2-50-17-209-1.compute-1.amazonaws.com',
    port: '5432',
    timeout: 2000,
    ssl: true
};

// set the view engine to ejs
app.set('view engine', 'ejs');

// make express look in the public directory for assets (public/js/img)
app.use(express.static(__dirname + '/public'));

// set the home page route
app.get('/', function(req, res) {

    // ejs render automatically looks in the views folder
    res.render('index',{'ips':ips});

});

var ips = [];

//deploy the website
pg.connect(connectionString, function(err, client, done) {

    if (err)
        throw err;

    var query = client.query("SELECT ip from ripple;");

    query.on('row', function(row) {
        if(ips.indexOf(row.ip) == -1){
            ips.push(row.ip);
        }
    });

    query.on('end', function(row){

        app.listen(port, function() {
        });

    });

});

//sends requests per data information back to client
app.get('/data', function(req, res) {

    var searchIp = req.param('ip');
    var reqPerSec = {};

    pg.connect(connectionString, function(err, client, done) {

        console.log('Connected to postgres! Getting schemas...');

        var query = client.query("SELECT * from ripple where ip = inet '"+searchIp+"';");

        query.on('row', function(row) {

            if(row['timestamp'] in reqPerSec){
                var temp = reqPerSec[row['timestamp']];
                reqPerSec[row['timestamp']] = temp + 1;
            }
            else{
                reqPerSec[row['timestamp']] = 1 ;
            }

        });

        query.on('end', function(){

            //converts reqPerSec object into an array. Required for using highcharts api.

            var newIps = [];

            Object.keys(reqPerSec).forEach(function (element, index) {
                var myDate = new Date(element);
                var timeInMillis = myDate.getTime();
                var curr = [timeInMillis, reqPerSec[element]];
                newIps.push(curr);
            });

            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');

            res.send(JSON.stringify(newIps.sort()));
            done();
        });

    });

});







