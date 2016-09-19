var express = require('express');
var app = express();
var pg = require('pg');

// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 8080;

var connectionString = {
    user: 'zziybtldxgdpqt',
    password: '1alMVnpHdShvbCMgbn9AGJNxND',
    database: 'd3etic8hcd3h7c',
    host: 'ec2-50-17-209-1.compute-1.amazonaws.com',
    port: '5432',
    ssl: true
};

var ips = [];

pg.connect(connectionString, function(err, client) {
    if (err) throw err;
    console.log('Connected to postgres! Getting schemas...');

    var query = client.query("SELECT ip from ripple;");

    query.on('row', function(row) {
        ips.push(row);
    });

});

// set the view engine to ejs
app.set('view engine', 'ejs');

// make express look in the public directory for assets (public/js/img)
app.use(express.static(__dirname + '/public'));

// set the home page route
app.get('/', function(req, res) {

    // ejs render automatically looks in the views folder
    res.render('index',{'ips':ips});
});

app.listen(port, function() {
    console.log('Our app is running on http://localhost:' + port);
});



