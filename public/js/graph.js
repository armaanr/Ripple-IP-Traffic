var ipButtons = document.getElementsByTagName('li');

window.onload = function () {

    console.log(ipButtons[0].getAttribute('name'));

    for (var i = 0; i < ipButtons.length; i++) {
        ipButtons[i].addEventListener('click', getData, false);
    }
}


function getData(){

    var dataRequest = new XMLHttpRequest();
    var ip = this.getAttribute('name');
    var url = "http://localhost:8080/data?ip="+ip+"";

    dataRequest.onreadystatechange = function() {
        var status = dataRequest.status;
        var state = dataRequest.readyState;
        if (state == 4 && status == 200) {
            var info = JSON.parse(dataRequest.responseText);
            console.log(info);
            graphGenerator(info);
        }

    };

    dataRequest.open("get", url, true);
    dataRequest.send();
}

function graphGenerator(data) {

    console.log(data);

    $('#graph').highcharts({
        chart: {
            zoomType: 'x'
        },
        title: {
            text: 'Requests per second'
        },
        subtitle: {
            text: document.ontouchstart === undefined ?
                'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in'
        },
        xAxis: {
            type: 'datetime',
            dateTimeLabelFormats: {
                second: '%H:%M:%S',
                minute: '%H:%M',
                hour: '%H:%M',
                day: '%e. %b'
            }
        },
        yAxis: {
            title: {
                text: 'Requests'
            }
        },
        legend: {
            enabled: false
        },
        plotOptions: {
            area: {
                fillColor: {
                    linearGradient: {
                        x1: 0,
                        y1: 0,
                        x2: 0,
                        y2: 1
                    },
                    stops: [
                        [0, Highcharts.getOptions().colors[0]],
                        [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                    ]
                },
                marker: {
                    radius: 2
                },
                lineWidth: 1,
                states: {
                    hover: {
                        lineWidth: 1
                    }
                },
                threshold: null
            }
        },

        series: [{
            type: 'area',
            name: 'Requests per second',
            data: data
        }]
    });
};