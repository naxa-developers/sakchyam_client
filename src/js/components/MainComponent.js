import React, { Component } from 'react';
import ApexCharts from 'apexcharts';
import Background from '../../img/banner.png';
import Logo from '../../img/logo.png';
import UkaidLogo from '../../img/ukaid.png';
import SaveAlt from '../../img/save_alt.svg';

class MainComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const options = {
      series: [
        {
          name: 'Planned As per AFP contract Budget',
          type: 'column',
          data: [13, 5, 12, 17, 10, 12, 17, 11, 14, 12, 20],
        },
        {
          name: 'Achieved',
          type: 'column',
          data: [33, 21, 32, 37, 23, 32, 27, 11, 34, 32, 40],
        },
        {
          // name: 'Planned',
          name: 'Planned As per AFP contract Budget',
          type: 'line',
          data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
        },
        {
          // name: 'Planned As per AFP contract Budget',
          name: 'Achieved',
          type: 'line',
          data: [3, 5, 6, 20, 25, 5, 6, 5, 9, 6, 9],
        },
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
    chart.render();
  }

  render() {
    return (
      <>
        <header className="main-header">
          <div className="container">
            <ul>
              <li>
                <a href="index.html" className="logo">
                  <img src={Logo} alt="sakchyam logo" />
                </a>
              </li>
              <li>
                <a href="index.html" className="logo">
                  <img src={UkaidLogo} alt="ukaid" />
                </a>
              </li>
            </ul>
          </div>
        </header>
        <main className="main">
          <section
            className="banner"
            id="banner"
            style={{
              backgroundImage: `url(${Background})`,
            }}
          >
            <div className="banner-content">
              <div className="banner-header">
                <h1>
                  Sakchyam Access
                  <span>to</span>
                  <br />
                  Finance Programme Logical Framework
                </h1>
                <p>
                  Revised Indicators as per the Budget Allocated to
                  the Access to Finance Programme, and Over Achieved
                  Indicators
                </p>
              </div>
              <div className="dashed" />
              <div className="banner-footer">
                <h5>ACCESS TO FINANCE FOR POOR (AFP) PROGRAMME </h5>
                <p>Based on Results from Implementation Phase</p>
                <h4>
                  <time>December 2014</time>
                  <span>to</span>
                  <time>December 2019</time>
                </h4>
              </div>
            </div>
          </section>

          <section className="content">
            <div className="sidebar">
              <ul className="sidebar-li">
                <h2>Indicators</h2>
                <li>Input</li>
                <li className="li-dropdown">
                  Output
                  <ul className="sidebar-sublist">
                    <li>
                      <a href="foo">Output1</a>
                    </li>
                    <li>
                      <a href="foo">Output2</a>
                    </li>
                    <li>
                      <a href="foo">Output3</a>
                    </li>
                    <li>
                      <a href="foo">Output4</a>
                    </li>
                  </ul>
                </li>
                <li>Outcome</li>
                <li>Impact</li>
              </ul>

              <ul className="date-list">
                <h2>Time period</h2>
                <li>
                  <span>Year 1</span>
                  Dec 14 - Aug 15
                </li>
                <li>
                  <span>Year 2</span>
                  Dec 15- Aug 16
                </li>
                <li>
                  <span>Year 3</span>
                  Dec 16 - Aug 17
                </li>
                <li>
                  <span>Year 4</span>
                  Dec 17 - Aug 18
                </li>
                <li>
                  <span>Year 5</span>
                  Dec 18 - Aug 19
                </li>
              </ul>
            </div>
            <div className="info-content">
              <div className="info-content-header">
                <h1>
                  Sustainable improvements in the livelihoods of poor
                  people
                </h1>
                <div className="info-header-top">
                  <span className="title-span">
                    Number of sustainable new jobs created
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
                          <li>Cummulative</li>
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
          </section>
        </main>

        <button
          type="button"
          className="scroll-top scroll-to-target open"
          data-target="html"
        >
          <i className="material-icons">arrow_upward</i>
        </button>
      </>
    );
  }
}

export default MainComponent;
