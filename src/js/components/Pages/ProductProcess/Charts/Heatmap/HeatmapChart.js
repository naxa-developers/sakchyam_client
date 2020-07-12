/* eslint-disable react/no-did-update-set-state */
import React from 'react';
import { connect } from 'react-redux';
import ReactApexChart from 'react-apexcharts';
import {
  getProductProcessList,
  filterHeatmapChartData,
} from '../../../../../actions/productProcess.actions';

class HeatmapChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [],
      options: {},
    };
  }

  plotChart = () => {
    const options = {
      chart: {
        toolbar: { show: false },
        height: 350,
        type: 'heatmap',
        width: 900,
      },
      dataLabels: {
        enabled: false,
      },
      colors: ['#008FFB'],
      title: {
        text: undefined,
      },
      yaxis: {
        // labels: {
        //   // show: false,
        //   trim: true,
        //   // hideOverlappingLabels: false,
        // },
        labels: {
          show: true,
          trim: true,
          hideOverlappingLabels: false,
          align: 'right',
          minWidth: 0,
          maxWidth: 500,
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
        },
      },
      xaxis: {
        labels: {
          // show: false,
          trim: true,
          hideOverlappingLabels: false,
        },
      },
    };

    this.setState({ options });
  };

  updateChartData = () => {
    const {
      productProcessReducer: { heatMapData },
    } = this.props;

    this.setState({
      series: heatMapData,
    });
  };

  componentDidMount() {
    this.plotChart();

    const { activeModal } = this.props;
    if (activeModal) this.updateChartData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.productProcessReducer.heatMapData !==
      prevProps.productProcessReducer.heatMapData
    ) {
      this.updateChartData();
    }
  }

  render() {
    const { options, series } = this.state;
    return (
      <div id="chart" style={{ paddingLeft: '30px' }}>
        <ReactApexChart
          options={options}
          series={series}
          type="heatmap"
          height={550}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ productProcessReducer }) => ({
  productProcessReducer,
});

export default connect(mapStateToProps, {
  getProductProcessList,
  filterHeatmapChartData,
})(HeatmapChart);
