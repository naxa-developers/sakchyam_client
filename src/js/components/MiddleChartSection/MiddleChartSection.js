import React, { Component } from 'react';
import Slider from 'react-slick';
import CustomChart from '../CustomChart';
import SaveAlt from '../../../img/save_alt.svg';

class MiddleChartSection extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };
    const { activeLayer } = this.props;
    return (
      <div className="info-content">
        <div className="info-content-header">
          <h1>
            Sustainable improvements in the livelihoods of poor people
          </h1>
          <div className="info-header-top">
            <span className="title-span">
              Number of sustainable new jobs created
            </span>
            <span className="span-title">{activeLayer}</span>
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
            <Slider {...settings}>
              <CustomChart activeLayer={activeLayer} />
            </Slider>
          </div>
        </div>
        <div className="info-content-footer">
          <p className="para">
            Income increase is derived from loan disbursed to
            beneficiaries by the partner BFIs considering that income
            increases by £0.24 per £1 loan borrowed by the
            beneficiaries (based on Sakchyam Mid-term Evaluation
            Survey 2019 findings).By investing the principal borrowed
            in agriculture and non-agricultural economic
            activities/MSMEs, beneficiaries realize a 24% net increase
            in income. Loan fund disbursed by partner BFIs to target
            group is one of the key indicators for monitoring.
            Increased income at beneficiaries level is directly
            dependent on the loan disbursed to the beneficiaries for
            the productive investment. Sakchyam encourages partners to
            disburse more loans to productive sectors both in terms of
            number of beneficiaries, volume of loan including
            encouragment and support to design and implement
            appropriate loan product (s), promote financial literacy
            and provide enterprise related trainings to help increase
            demand for loan and investment. Saving generates some
            interest (different rate) as well as funds for investment
            that attribute to increase in income. Furthermore, the
            actual attribution measurement of income increased will be
            measured at the end-line surveys.
          </p>
        </div>
      </div>
    );
  }
}

export default MiddleChartSection;
