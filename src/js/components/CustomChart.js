import React, { Component } from 'react';
import ReactApexChart from 'react-apexcharts';

function convert(x) {
  if (isNaN(x)) return x;

  if (x < 9999) {
    return x;
  }

  if (x < 1000000) {
    return `${Math.round(x / 1000)}K`;
  }
  if (x < 10000000) {
    return `${(x / 1000000).toFixed(2)}M`;
  }

  if (x < 1000000000) {
    return `${Math.round(x / 1000000)}M`;
  }

  if (x < 1000000000000) {
    return `${Math.round(x / 1000000000)}B`;
  }

  return '1T+';
}
export default class CustomChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      statsData: [],
      series: [
        // {
        //   name: 'Planned As per AFP contract Budget',
        //   type: 'column',
        //   data: planned,
        // },
        // {
        //   name: 'Achieved',
        //   type: 'column',
        //   data: achieved,
        // },
        // {
        //   name: 'Planned As per AFP contract Budget',
        //   type: 'line',
        //   data: planned,
        // },
        // {
        //   name: 'Achieved',
        //   type: 'line',
        //   data: achieved,
        // },
        {
          name: 'Achieved',
          type: 'column',
          data: [33, 21, 32, 37, 23, 32, 27, 11, 34, 32, 40],
        },
        {
          name: 'Planned As per AFP contract Budget',
          type: 'column',
          data: [13, 5, 12, 17, 10, 12, 17, 11, 14, 12, 20],
        },
        {
          name: 'Achieved',
          type: 'line',
          data: [33, 21, 32, 37, 23, 32, 27, 11, 34, 32, 40],
        },
        {
          // name: 'Planned',
          name: 'Planned As per AFP contract Budget',
          type: 'line',
          data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
        },
      ],
      options: {
        chart: {
          height: 350,
          type: 'line',
          stacked: false,
        },
        stroke: {
          width: [0, 1, 1],
          curve: 'straight',
        },
        plotOptions: {
          bar: {
            columnWidth: '20%',
          },
        },
        colors: ['#b41833', '#287078'],
        fill: {
          opacity: [0.85, 1, 1],
          gradient: {
            inverseColors: false,
            shade: 'light',
            type: 'vertical',
            opacityFrom: 0.85,
            opacityTo: 0.55,
            stops: [0, 100, 100, 100],
          },
        },
        labels: [
          '01/01/2003',
          '02/01/2003',
          '03/01/2003',
          '04/01/2003',
          '05/01/2003',
          '06/01/2003',
          '07/01/2003',
          '08/01/2003',
          '09/01/2003',
          '10/01/2003',
          '11/01/2003',
          '12/01/2003',
          '01/01/2004',
          '02/01/2004',
        ],
        markers: {
          size: 5,
          offsetX: 0,
          offsetY: 0,
        },
        xaxis: {
          categories: [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
          ],
          type: 'category',
        },
        yaxis: {
          title: {
            text: 'Points',
          },
          floating: false,
          labels: {
            show: true,
            align: 'right',
            minWidth: 0,
            maxWidth: 160,
            style: {
              colors: [],
              fontSize: '12px',
              fontFamily: 'Helvetica, Arial, sans-serif',
              fontWeight: 400,
              cssClass: 'apexcharts-yaxis-label',
            },
            offsetX: 0,
            offsetY: 0,
            rotate: 0,
            formatter: value => {
              const roundNumber = Math.round(value);
              //   console.log(roundNumber);
              //   console.log(convert(roundNumber));
              return convert(roundNumber);
            },
          },
          min: 0,
        },
        title: {
          text: undefined,
          rotate: -90,
          offsetX: 0,
          offsetY: 0,
          style: {
            color: undefined,
            fontSize: '12px',
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontWeight: 600,
            cssClass: 'apexcharts-yaxis-title',
          },
        },
        tooltip: {
          shared: true,
          intersect: false,
          y: {
            formatter(y) {
              if (typeof y !== 'undefined') {
                return `${y.toFixed(0)} £`;
              }
              return y;
            },
          },
        },
      },
    };
  }

  filterDataWithDate = () => {
    // eslint-disable-next-line react/destructuring-assignment
    const { activeDate, activeLayer } = this.props;
    const { statsData } = this.state;
    const filtered = [];
    // eslint-disable-next-line array-callback-return
    activeDate.map(date => {
      // eslint-disable-next-line array-callback-return
      statsData.map(data => {
        if (
          data.year.range === date &&
          data.sub_category.name === activeLayer
        ) {
          filtered.push(data);
        }
      });
    });

    // const filtered = statsData.filter(result => {
    //   return result.year.range === JSON.stringify(d);
    // });
    const planned = filtered.map(el => {
      return el.planned_afp;
    });
    const achieved = filtered.map(el => {
      return el.achieved;
    });
    const label = filtered.map(el => {
      return el.year.name;
    });
    // const category = 'Test Year';
    const category = filtered.map(el => {
      return el.year.range;
    });
    const series = [
      {
        name: 'Planned As per AFP contract Budget',
        type: 'column',
        data: planned,
      },
      {
        name: 'Achieved',
        type: 'column',
        data: achieved,
      },
      {
        name: 'Planned As per AFP contract Budget',
        type: 'line',
        data: planned,
      },
      {
        name: 'Achieved',
        type: 'line',
        data: achieved,
      },
    ];
    this.setState(prevState => ({
      series,
      options: {
        ...prevState.options,
        labels: label,
        xaxis: { ...prevState.options.xaxis, categories: category },
      },
    }));
  };

  filterDataWithLayer = () => {
    const a = this.props.activeLayer;
    //   const that = this;
    //   fetch('https://sakchyam.naxa.com.np/api/v1/log_data_alt')
    //     .then(function(response) {
    //       if (response.status !== 200) {
    //         console.log(
    //           `Looks like there was a problem. Status Code: ${response.status}`,
    //         );
    //         return;
    //       }
    //       // Examine the text in the response
    //       response.json().then(function(data) {
    //         console.log(data, 'data');
    //         that.setState({ statsData: data }, () => {
    const { statsData } = this.state;
    // console.log(statsData);
    const filtered = statsData.filter(result => {
      //   if (result.category === 'IMPACT') {
      //   console.log(a);
      return result.sub_category.name === a;
      //   }
    });
    // console.log(filtered, 'filtered');
    const planned = filtered.map(el => {
      return el.planned_afp;
    });
    const achieved = filtered.map(el => {
      return el.achieved;
    });
    const label = filtered.map(el => {
      //   console.log(el, 'elLabel');
      return el.year.name;
    });
    const category = filtered.map(el => {
      //   console.log(el, 'elLabel');
      return el.year.range;
    });
    // console.log(label, 'label');
    // console.log(achieved, 'achieved');
    const series = [
      {
        name: 'Planned As per AFP contract Budget',
        type: 'column',
        data: planned,
      },
      {
        name: 'Achieved',
        type: 'column',
        data: achieved,
      },
      {
        name: 'Planned As per AFP contract Budget',
        type: 'line',
        data: planned,
      },
      {
        name: 'Achieved',
        type: 'line',
        data: achieved,
      },
    ];
    // console.log(series, 'se');
    this.setState(prevState => ({
      series,
      options: {
        ...prevState.options,
        labels: label,
        xaxis: { ...prevState.options.xaxis, categories: category },
      },
    }));
    // this.setState({
    //   series,
    //   options: { ...this.state.options, labels: label },
    // });
  };

  componentDidUpdate(prevProps) {
    if (prevProps.activeLayer !== this.props.activeLayer) {
      this.filterDataWithLayer();
    }

    if (prevProps.updateChart !== this.props.updateChart) {
      this.filterDataWithDate();
    }
  }

  componentDidMount() {
    const that = this;
    console.log(this.props.activeDate, 'activeLayer');
    const a = this.props.activeLayer;
    fetch('https://sakchyam.naxa.com.np/api/v1/logFrame-data')
      .then(function(response) {
        if (response.status !== 200) {
          console.log(
            `Looks like there was a problem. Status Code: ${response.status}`,
          );
          return;
        }
        // Examine the text in the response
        response.json().then(function(data) {
          //   console.log(data, 'data');
          that.setState({ statsData: data });
        });

        // console.log(this.state.series, 'series');
      })
      .catch(function(err) {
        console.log('Fetch Error :-S', err);
      });
  }

  render() {
    const { activeLayer, statsData } = this.state;
    return (
      <div id="chart">
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="line"
          height={350}
        />
      </div>
    );
  }
}
