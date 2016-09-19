//connects to postgres db
var pg = require('pg');
pg.defaults.ssl = true;

var ips = [];

console.log("asdasdsadds");

var connectionString = {
    user: 'zziybtldxgdpqt',
    password: '1alMVnpHdShvbCMgbn9AGJNxND',
    database: 'd3etic8hcd3h7c',
    host: 'ec2-50-17-209-1.compute-1.amazonaws.com',
    port: '5432',
    ssl: true
};

pg.connect(connectionString, function(err, client) {
    if (err) throw err;
    console.log('Connected to postgres! Getting schemas...');

    var query = client.query("SELECT ip from ripple;");

    query.on('row', function(row) {
        console.log(row);
    });

});