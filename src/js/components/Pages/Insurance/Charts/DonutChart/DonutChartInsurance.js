/* eslint-disable react/no-did-update-set-state */
import React, { Component } from 'react';
import ReactApexChart from 'react-apexcharts';
import {
  getDuplicateObjectCount,
  numberWithCommas,
} from '../../../../common/utilFunctions';
import SwitchComponentDonut from '../../MiddleChartSection/SwitchComponentDonut';

class DonutChartInsurance extends Component {
  constructor(props) {
    super(props);

    this.state = {
      partnerSeries: [],
      innovationSeries: [],
      productSeries: [],
      options: {},
      partnerOptions: {},
      innovationOptions: {},
      productOptions: {},
      data: '',
    };
  }

  plotChart = () => {
    const options = {
      chart: {
        width: 150,
        type: 'donut',
      },

      colors: [
        '#E11D3F',
        '#13A8BE',
        '#FF6D00',
        '#e69109',
        '#63a4ff',
        '#8629ff',
        '#e553ed',
        '#f2575f',
        '#915e0d',
        '#a1970d',
        '#4f7d14',
        '#07aba1',
        '#1d4c8f',
        '#491991',
        '#610766',
        '#6e0208',
        '#f07818',
        '#7F95D1',
        '#FF82A9',
        '#FFC0BE',
        '#f0e111',
        '#9ff035',
        '#34ede1',
        '#D13F31',
        '#DEDBA7',
        '#72B095',
        '#a1bd93',
      ],
      // fill: {
      //   colors: ['#E11D3F', '#13A8BE', '#FF6D00'],
      // },
      // labels: ['Apple', 'Mango', 'Orange', 'Watermelon', 'bananna'],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 150,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
      dataLabels: { enabled: false },
      plotOptions: {
        pie: {
          startAngle: 0,
          expandOnClick: true,
          offsetX: 0,
          offsetY: 0,
          customScale: 1,
          dataLabels: {
            offset: 0,
            minAngleToShowLabel: 10,
          },
          donut: {
            size: '65%',
            background: 'transparent',
            labels: {
              show: true,
              name: {
                show: false,
                fontSize: '22px',
                fontFamily: 'Helvetica, Arial, sans-serif',
                fontWeight: 600,
                color: '#d9202c',
                offsetY: 0,
                formatter(val) {
                  return val;
                },
              },
              value: {
                show: true,
                fontSize: '22px',
                fontFamily: 'Helvetica, Arial, sans-serif',
                fontWeight: 400,
                color: '#d9202c',
                offsetY: 0,
                formatter(val) {
                  return numberWithCommas(val);
                },
              },
              total: {
                show: true,
                showAlways: true,
                label: 'Total',
                fontSize: '24px',
                fontFamily: 'Avenir book',
                fontWeight: 100,
                // color: '#d9202c',
                color: '#d9202c',
                formatter(w) {
                  let x = 0;
                  w.globals.seriesTotals.forEach(i => {
                    x += i;
                  });
                  return numberWithCommas(x);
                },
              },
            },
          },
        },
      },
      tooltip: {
        marker: { show: false },
        fillSeriesColor: false,
        y: {
          formatter: val => numberWithCommas(val),
        },
      },
      legend: { show: true, horizontalAlign: 'left' },
    };

    this.setState({ options });
  };

  generateDonutChartData = data => {
    const innovationSeries = [];
    const productSeries = [];
    const partnerSeries = [];

    const innovation = [
      ...new Set(data.map(item => item.innovation)),
    ];
    const product = [...new Set(data.map(item => item.product))];
    const partner = [...new Set(data.map(item => item.partner_name))];

    function getCount(i, type) {
      const count = data
        .filter(item => item[type] === i)
        .reduce(
          (sum, item) => sum + item.number_of_insurance_sold,
          0,
        );

      return count;
    }

    innovation.forEach(item => {
      innovationSeries.push(getCount(item, 'innovation'));
    });
    product.forEach(item => {
      productSeries.push(getCount(item, 'product'));
    });
    partner.forEach(item => {
      partnerSeries.push(getCount(item, 'partner_name'));
    });

    this.setState(prev => ({
      partnerSeries,
      innovationSeries,
      productSeries,
      options: {
        ...prev.options,
        labels: partner,
      },
      partnerOptions: {
        ...prev.options,
        labels: partner,
      },
      innovationOptions: {
        ...prev.options,
        labels: innovation,
      },
      productOptions: {
        ...prev.options,
        labels: product,
      },
    }));
  };

  componentDidMount() {
    this.plotChart();

    const { activeModal, insuranceData } = this.props;
    if (activeModal) this.generateDonutChartData(insuranceData);
  }

  componentDidUpdate(prevProps, prevState) {
    const { insuranceData } = this.props;
    const { selectedTab, data } = this.state;

    if (insuranceData !== prevProps.insuranceData) {
      this.generateDonutChartData(insuranceData);
    }

    // if (prevState.selectedTab !== selectedTab) {
    //   if (selectedTab === 'innovations') {
    //     this.setChartData(data, 'innovations');
    //   }
    //   if (selectedTab === 'products') {
    //     this.setChartData(data, 'products');
    //   }
    //   if (selectedTab === 'insurance') {
    //     this.setInsuranceData(data);
    //   }
    // }

    // if (insuranceData !== prevProps.insuranceData) {
    //   if (selectedTab === 'innovations') {
    //     this.setChartData(insuranceData, 'innovations');
    //   }
    //   if (selectedTab === 'products') {
    //     this.setChartData(insuranceData, 'products');
    //   }
    //   if (selectedTab === 'insurance') {
    //     this.setInsuranceData(insuranceData);
    //   }
    // }
  }

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
              width: 150,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
      legend: { show: true, horizontalAlign: 'left' },
    };
    this.setState({ options, data: array });
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
    this.setState({ options, data: array });
  };

  render() {
    const {
      partnerSeries,
      innovationSeries,
      productSeries,
      partnerOptions,
      innovationOptions,
      productOptions,
    } = this.state;

    const {
      selectedTab,
      setSelectedTabDonut,
      activeModal,
      showRightSidebar,
    } = this.props;

    return (
      <>
        <SwitchComponentDonut
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTabDonut}
        />
        <div
          id="insurance-donut"
          style={{ height: !activeModal ? '347px' : '500px' }}
        >
          <ReactApexChart
            options={
              selectedTab === 'innovation'
                ? innovationOptions
                : selectedTab === 'product'
                ? productOptions
                : partnerOptions
            }
            series={
              selectedTab === 'innovation'
                ? innovationSeries
                : selectedTab === 'product'
                ? productSeries
                : partnerSeries
            }
            type="donut"
            height={!activeModal ? 337 : 437}
            width={
              activeModal && window.innerWidth < 1600
                ? 1400
                : activeModal && window.innerWidth > 1600
                ? 1750
                : showRightSidebar && window.innerWidth < 1600
                ? 780
                : showRightSidebar && window.innerWidth > 1600
                ? 1200
                : !showRightSidebar && window.innerWidth < 1600
                ? 1100
                : 1400
            }
          />
        </div>
      </>
    );
  }
}

export default DonutChartInsurance;
