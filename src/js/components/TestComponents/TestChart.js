/* eslint-disable */
import React, { Component } from 'react';
import { FullPage, Slide } from 'react-full-page';
import Axios from 'axios';

import Background from '../../../img/banner.png';
import Logo from '../../../img/logo.png';
import UkaidLogo from '../../../img/ukaid.png';

import SingleChart from './SingleChart';

class TestChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // eslint-disable-next-line react/no-unused-state
            data: null,
            categories: null,
            impact: null,
            selectedData: null,
            plannedData: null,
            achievedData: null
        };
    }
    fixHeight = () => {
        const windowHeight = window.innerHeight;
        const headHeight = document.getElementsByClassName(
          'main-header',
        )[0].clientHeight;
        console.log("head", headHeight);
      
    
        document.getElementsByClassName(
          'banner',
        )[0].style.height = `${windowHeight - headHeight}px`;

        console.log(document.getElementsByClassName(
            'banner',
          )[0].clientHeight)
      };

    fetchData = () => {
        Axios.get(
            `https://sakchyam.naxa.com.np/api/v1/log_data`,
        ).then(res =>
            this.setState({
                data: res.data
            })
        )
    };

    fetchCategory = () => {
        Axios.get(
            `https://sakchyam.naxa.com.np/api/v1/log_category`,
        ).then(res => this.setState({ categories: res.data }))
    };

    updateChart = () => {
        console.log("on switch", this.state.currentChart);

        switch (this.state.currentChart) {
            case 'impact':
                this.filterData('IMPACT');
                break;
            case 'input':
                this.filterData('INPUT')
                break;
            case 'outcome':
                this.filterData('OUTCOME')
                break;
            default:
                console.log("no matches");

        }

    }

    filterData = (str) => {
        console.log("filter from ", str);

        let selectedData = [];
        let plannedData = [];
        let achievedData = [];
        this.state.data.map(data => {

            if (data.category == str) {

                selectedData.push(data)
                plannedData.push(parseInt(data.planned_afp))
                achievedData.push(parseInt(data.achieved))

            }

        })

        this.setState({ selectedData: selectedData, plannedData: plannedData, achievedData: achievedData })
    }


    componentDidMount() {
        // this.fixHeight();
        this.fetchData();
        this.fetchCategory()

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
                  <span> to</span>
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
                                <li onClick={() => this.setState({ currentChart: 'input' }, () => this.updateChart())}>Input</li>
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
                                <li onClick={() => this.setState({ currentChart: 'outcome' }, () => this.updateChart())}>Outcome</li>
                                <li onClick={() => this.setState({ currentChart: 'impact' }, () => this.updateChart())}>Impact</li>
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
                        <SingleChart
                            currentChart={this.state.currentChart}
                            data={this.state.selectedData && this.state.selectedData}
                            plannedData={this.state.plannedData}
                            achievedData={this.state.achievedData}
                            categories={this.state.categories}
                        />
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

export default TestChart;
