var ipButtons = document.getElementsByTagName('li');

window.onload = function () {

    for (var i = 0; i < ipButtons.length; i++) {
        ipButtons[i].addEventListener('click', getData, false);
    }
}

//sends get request to server for 'requests' data
function getData(){

    var dataRequest = new XMLHttpRequest();
    var ip = this.getAttribute('name');
    var url = "https://fast-coast-94108.herokuapp.com/data?ip="+ip+"";

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

//generates a highcharts graph using input data
function graphGenerator(data) {

    $('#graph').highcharts({
        chart: {
            zoomType: 'x'
        },
        title: {
            text: 'Requests per second'
        },
        subtitle: {
            text: 'Click and drag area to zoom'
        },
        xAxis: {
            type: 'datetime'
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