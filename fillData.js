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

//Inserts data into database
pg.connect(connectionString, function(err, client) {
    if (err) throw err;

    //iterates through a file line by line
    var LineByLineReader = require('line-by-line'),
        lr = new LineByLineReader('../../logs.txt');

    lr.on('error', function (err) {
        console.error(err);
    });

    lr.on('line', function (line) {
        // pause emitting of lines
        lr.pause();

        var tokens = line.split(" ");

        var date = tokens[0];
        var time = tokens[1].substr(0,15);
        var timeStamp = date + " " + time;
        var ip = tokens[6].substring(5).slice(0,-1);

        console.log(timeStamp + " ip address => "+ ip);

        var query = client.query("INSERT into ripple values (TIMESTAMP '"+timeStamp+"','"+ip+"');");

        query.on('row', function(row) {
            console.log(row);
        });

        setTimeout(function () {

            //resume line read after timeout
            lr.resume();
        }, 1000);
    });

    lr.on('end', function () {
        console.log("File read completed");
    });

});

