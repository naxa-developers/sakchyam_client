/* eslint-disable react/no-did-update-set-state */
import React, { Component } from 'react';
import ReactApexChart from 'react-apexcharts';
import SwitchComponent from '../../MiddleChartSection/SwitchComponent';
import { getDuplicateObjectCount } from '../../../../common/utilFunctions';

class DonutChartInsurance extends Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [],
      options: {},
      selectedTab: 'innovations',
      data: '',
    };
  }

  plotChart = () => {
    const series = [44, 55, 41, 100, 15];
    const options = {
      chart: {
        type: 'donut',
      },
      labels: ['Apple', 'Mango', 'Orange', 'Watermelon', 'bananna'],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    };

    this.setState({ series, options });
  };

  componentDidMount() {
    this.plotChart();
  }

  componentDidUpdate(prevProps, prevState) {
    const { insuranceData } = this.props;
    const { selectedTab, data } = this.state;
    if (prevState.selectedTab !== selectedTab) {
      if (selectedTab === 'innovations') {
        this.setChartData(data, 'innovations');
      }
      if (selectedTab === 'products') {
        this.setChartData(data, 'products');
      }
      if (selectedTab === 'insurance') {
        this.setInsuranceData(data);
      }
    }

    if (insuranceData !== prevProps.insuranceData) {
      if (selectedTab === 'innovations') {
        this.setChartData(insuranceData, 'innovations');
      }
      if (selectedTab === 'products') {
        this.setChartData(insuranceData, 'products');
      }
      if (selectedTab === 'insurance') {
        this.setInsuranceData(insuranceData);
      }
    }
  }

  setSelectedTab = e => {
    this.setState({ selectedTab: e });
  };

  setInsuranceData = array => {
    const partnerList = array.map(item => item.partner_name);
    const uniquePartners = Array.from(new Set(partnerList));
    const newArray = [];

    uniquePartners.forEach(partner => {
      let count = 0;
      array.forEach(element => {
        if (partner === element.partner_name) {
          count += element.number_of_insurance_sold;
        }
      });
      newArray.push({ partner, count });
    });
    const labels = newArray.map(partner => partner.partner);
    const series = newArray.map(partner => partner.count);
    const options = {
      chart: {
        type: 'donut',
      },
      labels,
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    };
    this.setState({ series, options, data: array });
  };

  setChartData = (array, type) => {
    let partners;

    if (type === 'innovations') {
      partners = array.map(
        data => `${data.partner_name},${data.innovation}`,
      );
    } else if (type === 'products') {
      partners = array.map(
        data => `${data.partner_name},${data.product}`,
      );
    }

    const uniquePartners = Array.from(new Set(partners));

    const filteredArray = uniquePartners.map(item =>
      item.substring(0, item.indexOf(',')),
    );

    const graphData = getDuplicateObjectCount(filteredArray);
    const series = graphData.map(item => item.count);
    const labels = graphData.map(item => item.code);
    const options = {
      chart: {
        type: 'donut',
      },
      labels,
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    };
    this.setState({ series, options, data: array });
  };

  render() {
    const { selectedTab } = this.state;
    return (
      <>
        <SwitchComponent
          selectedTab={selectedTab}
          setSelectedTab={this.setSelectedTab}
        />
        <div id="chart">
          <ReactApexChart
            options={this.state.options}
            series={this.state.series}
            type="donut"
            height={350}
          />
        </div>
      </>
    );
  }
}

export default DonutChartInsurance;
