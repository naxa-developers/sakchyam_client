/* eslint-disable */ 
import React, { Component } from 'react'
import ApexCharts from 'apexcharts';
import SaveAlt from '../../../img/save_alt.svg';
export class SingleChart extends Component {

    // componentDidMount(){
    //     const options = {
    //         series: [
    //             // {
    //             //     name: 'Planned As per AFP contract Budget',
    //             //     type: 'column',
    //             //     data: this.props.plannedData,
    //             // },
    //             // {
    //             //     name: 'Achieved',
    //             //     type: 'column',
    //             //     data: this.props.achievedData,
    //             // },
    //             {
    //                 // name: 'Planned',
    //                 name: 'Planned As per AFP contract Budget',
    //                 type: 'line',
    //                 data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
    //             },
    //             {
    //                 // name: 'Planned As per AFP contract Budget',
    //                 name: 'Achieved',
    //                 type: 'line',
    //                 data: [3, 5, 6, 20, 25, 5, 6, 5, 9, 6, 9],
    //             },
    //         ],
    //         chart: {
    //             height: 350,
    //             type: 'line',
    //             stacked: false,
    //         },
    //         stroke: {
    //             width: [0, 1, 1],
    //             curve: 'straight',
    //         },
    //         plotOptions: {
    //             bar: {
    //                 columnWidth: '60%',
    //             },
    //         },
    //         colors: ['#C2002F', '#007078'],
    //         fill: {
    //             opacity: [0.85, 0.25, 1],
    //             gradient: {
    //                 inverseColors: false,
    //                 shade: 'light',
    //                 type: 'vertical',
    //                 opacityFrom: 0.85,
    //                 opacityTo: 0.55,
    //                 stops: [0, 100, 100, 100],
    //             },
    //         },
    //         labels: [
    //             '01/01/2003',
    //             '02/01/2003',
    //             '03/01/2003',
    //             '04/01/2003',
    //             '05/01/2003',
    //             '06/01/2003',
    //             '07/01/2003',
    //             '08/01/2003',
    //             '09/01/2003',
    //             '10/01/2003',
    //             '11/01/2003',
    //         ],
    //         markers: {
    //             size: 0,
    //         },
    //         xaxis: {
    //             // categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
    //             type: 'datetime',
    //         },
    //         yaxis: {
    //             title: {
    //                 // text: 'Points',
    //             },
    //             min: 0,
    //         },
    //         tooltip: {
    //             shared: true,
    //             intersect: false,
    //             y: {
    //                 formatter(y) {
    //                     if (typeof y !== 'undefined') {
    //                         return `${y.toFixed(0)} points`;
    //                     }
    //                     return y;
    //                 },
    //             },
    //         },
    //     };
    
    //     const chart = new ApexCharts(
    //         document.querySelector('#chart'),
    //         options,
    //     );
    //     chart.render();
    //    }
            

    
    componentDidUpdate(prevProps){
        // console.log("on chart", this.props.currentChart);
   if(prevProps.currentChart!==this.props.currentChart){
      
    const options = {
        series: [
            {
                name: 'Planned As per AFP contract Budget',
                type: 'column',
                data: this.props.plannedData,
            },
            {
                name: 'Achieved',
                type: 'column',
                data: this.props.achievedData,
            },
            // {
            //     // name: 'Planned',
            //     name: 'Planned As per AFP contract Budget',
            //     type: 'line',
            //     data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
            // },
            // {
            //     // name: 'Planned As per AFP contract Budget',
            //     name: 'Achieved',
            //     type: 'line',
            //     data: [3, 5, 6, 20, 25, 5, 6, 5, 9, 6, 9],
            // },
        ],
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
                columnWidth: '60%',
            },
        },
        colors: ['#C2002F', '#007078'],
        fill: {
            opacity: [0.85, 0.25, 1],
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
        ],
        markers: {
            size: 0,
        },
        xaxis: {
            // categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
            type: 'datetime',
        },
        yaxis: {
            title: {
                // text: 'Points',
            },
            min: 0,
        },
        tooltip: {
            shared: true,
            intersect: false,
            y: {
                formatter(y) {
                    if (typeof y !== 'undefined') {
                        return `${y.toFixed(0)} points`;
                    }
                    return y;
                },
            },
        },
    };

    const chart = new ApexCharts(
        document.querySelector('#chart'),
        options,
    );
   setTimeout(() => {
    chart.render();
   }, 1000) 
   }
        

    }
   
    render() {
        // console.log("from", this.props.currentChart);
        
        // console.log("planned",this.props.plannedData);
        // console.log("achived",this.props.achievedData);
        return (
            <div className="info-content">
            <div className="info-content-header">
              <h1>
                Sustainable improvements in the livelihoods of poor
                people
              </h1>
              <div className="info-header-top">
                <span className="title-span">
                  {/* Number of sustainable new jobs created */}
                </span>
                <span className="span-title">
                  Impact Indicator 1
                </span>
              </div>

              <div className="info-header-bottom">
                <div className="option-wrap">
                  <div className="data">
                    <span className="span-option">Data</span>
                    <div className="data-wrap">
                      <span>Individual</span>
                      <ul className="ul-dropdown">
                        <li>Individual</li>
                        <li>Cumulative</li>
                      </ul>
                    </div>
                  </div>
                  <div className="chart">
                    <span className="span-option">Chart</span>
                    <div className="chart-wrap">
                      <span>Bar</span>
                      <span>Time graph</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="info-slider">
              <a href="foo" className="download-icon-image">
                <img src={SaveAlt} alt="" />
              </a>
              <div className="slider-container">
                <div id="chart" />
                <div id="chartone" />
              </div>
            </div>
            <div className="info-content-footer">
              <p className="para">
                Income increase is derived from loan disbursed to
                beneficiaries by the partner BFIs considering that
                income increases by £0.24 per £1 loan borrowed by
                the beneficiaries (based on Sakchyam Mid-term
                Evaluation Survey 2019 findings).By investing the
                principal borrowed in agriculture and
                non-agricultural economic activities/MSMEs,
                beneficiaries realize a 24% net increase in income.
                Loan fund disbursed by partner BFIs to target group
                is one of the key indicators for monitoring.
                Increased income at beneficiaries level is directly
                dependent on the loan disbursed to the beneficiaries
                for the productive investment. Sakchyam encourages
                partners to disburse more loans to productive
                sectors both in terms of number of beneficiaries,
                volume of loan including encouragment and support to
                design and implement appropriate loan product (s),
                promote financial literacy and provide enterprise
                related trainings to help increase demand for loan
                and investment. Saving generates some interest
                (different rate) as well as funds for investment
                that attribute to increase in income. Furthermore,
                the actual attribution measurement of income
                increased will be measured at the end-line surveys.
              </p>
            </div>
          </div>
        )
    }
}

export default SingleChart
