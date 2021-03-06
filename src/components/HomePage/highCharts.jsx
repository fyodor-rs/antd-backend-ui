import React from 'react';
import Highcharts from 'highcharts';
class HighCharts extends React.Component{
  componentDidMount() {
    this.renderGraph();
  }
  renderGraph = () => {
    let Data = {
      chart: {
        type: 'spline'
    },
    title: {
        align: 'left',
        text: '访客人数'
    },
    // subtitle: {
    //     text: '数据来源: WorldClimate.com'
    // },
    xAxis: {
        categories: ['一月', '二月', '三月', '四月', '五月', '六月',
                     '七月', '八月', '九月', '十月', '十一月', '十二月']
    },
    yAxis: {
        title: {
            text: '流量'
        },
        labels: {
            formatter: function () {
                return this.value + '°';
            }
        }
    },
    tooltip: {
        crosshairs: true,
        shared: true
    },
    plotOptions: {
        spline: {
            marker: {
                radius: 4,
                lineColor: '#666666',
                lineWidth: 1
            }
        }
    },
    series: [{
        name: '东京',
        marker: {
            symbol: 'square'
        },
        data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, {
            y: 26.5,
            marker: {
                symbol: 'url(https://www.highcharts.com/demo/gfx/sun.png)'
            }
        }, 23.3, 18.3, 13.9, 9.6]
    }, {
        name: '伦敦',
        marker: {
            symbol: 'diamond'
        },
        data: [{
            y: 3.9,
            marker: {
                symbol: 'url(https://www.highcharts.com/demo/gfx/snow.png)'
            }
        }, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
    }]
    }

    Highcharts.chart(this.refs.alarmHighChart, Data);
  }

  render() {
    return (
      <div ref="alarmHighChart" style={{width:'100%',height:400}} />
    );
  }

}
export default  HighCharts
