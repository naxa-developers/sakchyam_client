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
      tooltip: {
        enabled: true,
        // shared: true,
      },
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
          show: false,
          // show: true,
        },
        categories: [],
      },
      legend: {
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

    return (
      <div id="chart">
        <ReactApexChart
          options={options}
          series={series}
          type="radar"
          height={385}
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
