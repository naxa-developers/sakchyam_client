/* eslint-disable react/no-did-update-set-state */
import React from 'react';
import { connect } from 'react-redux';
import ReactApexChart from 'react-apexcharts';
import { getProductProcessList } from '../../../../../actions/productProcess.actions';

class RadarChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [],
      options: {},
    };
  }

  plotChart = () => {
    const options = {
      // dataLabels: {
      //   enabled: true,
      //   background: {
      //     enabled: true,
      //     borderRadius: 2,
      //   },
      // },
      chart: {
        toolbar: { show: false },
        height: 350,
        type: 'radar',
        dropShadow: {
          enabled: true,
          blur: 1,
          left: 1,
          top: 1,
        },
      },
      title: {
        text: undefined,
      },
      stroke: {
        width: 2,
      },
      fill: {
        opacity: 0.1,
      },
      markers: {
        size: 4,
      },
      xaxis: {
        labels: {
          show: !this.props.activeModal ? false : true,
          // show: true,
        },
        categories: [],
      },
      yaxis: {
        show: false,
        min: 0,
        max: 10,
        tickAmount: 5,
        // labels: {
        //   formatter(val) {
        //     return val.toFixed(0);
        //   },
        // },
      },
      legend: {
        show: true,
        // offsetX: 0,
        // offsetY: 50,
        fontFamily: 'Avenir Book',
        // itemMargin: {
        //   horizontal: 5,
        //   vertical: 50,
        // },
        onItemClick: {
          toggleDataSeries: false,
        },
      },
    };

    this.setState({ options });
  };

  updateChartData = () => {
    const {
      productProcessReducer: { radarChartData },
    } = this.props;

    this.setState(preState => ({
      series: radarChartData.series,
      options: {
        ...preState.options,
        xaxis: {
          ...preState.options.xaxis,
          categories: radarChartData.categories,
        },
      },
    }));
  };

  componentDidMount() {
    this.plotChart();

    const { activeModal } = this.props;
    if (activeModal) this.updateChartData();
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.productProcessReducer.radarChartData !==
      prevProps.productProcessReducer.radarChartData
    ) {
      this.updateChartData();
    }
  }

  render() {
    const { options, series } = this.state;

    const { activeModal } = this.props;

    let height = 425;
    let width = 425;

    if (activeModal) {
      if (window.innerWidth > 1600) {
        height = 900;
        width = 1500;
      } else if (window.innerWidth < 1600) {
        height = 570;
        width = 1000;
        // } else if (window.innerWidth < 1600) {
        //   height = 570;
        //   width = 1000;
      }
    } else {
      // height = 425;
      height = 434;
      width = 450;
    }

    return (
      <div
        id="chart"
        // style={
        // height: {!activeModal ? '434px' : height},
        // width: {width}
        // }
        style={{ height: !activeModal && 434 }}
      >
        <ReactApexChart
          options={options}
          series={series}
          type="radar"
          // height={!activeModal ? 425 : 685}
          height={height}
          // width={width}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ productProcessReducer }) => ({
  productProcessReducer,
});

export default connect(mapStateToProps, { getProductProcessList })(
  RadarChart,
);
