var pg = require('pg');
pg.defaults.poolIdleTimeout = 2000;
//pg.defaults.ssl = true;
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

    var LineByLineReader = require('line-by-line'),
        lr = new LineByLineReader('../../logs.txt');

    lr.on('error', function (err) {
        console.error(err);
        // 'err' contains error object
    });

    lr.on('line', function (line) {
        // pause emitting of lines...
        lr.pause();

        var tokens = line.split(" ");

        var date = tokens[0];
        var time = tokens[1].substr(0,15);
        var timeStamp = date + " " + time;
        var ip = tokens[6].substr(5,13);

        console.log(timeStamp + " ip address => "+ ip);

        var query = client.query("INSERT into ripple values (TIMESTAMP '"+timeStamp+"','"+ip+"');");

        query.on('row', function(row) {
            console.log(row);
        });

        // ...do your asynchronous line processing..
        setTimeout(function () {

            // ...and continue emitting lines.
            lr.resume();
        }, 1000);
    });

    lr.on('end', function () {
        // All lines are read, file is closed now.
    });

});

//var client = new pg.Client(connectionString);
console.log(connectionString);

