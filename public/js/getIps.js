//connects to postgres db
var pg = require('pg');
pg.defaults.ssl = true;

var ips = [];

pg.connect(connectionString, function(err, client) {
    if (err) throw err;
    console.log('Connected to postgres! Getting schemas...');

    var query = client.query("SELECT ip from ripple;");

    query.on('row', function(row) {
        console.log(row);
    });

});