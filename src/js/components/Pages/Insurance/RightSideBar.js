import React, { Component } from 'react';
import {
  removeDuplicates,
  numberWithCommas,
} from '../../common/utilFunctions';
import OverviewTab from '../../common/overviewTab';

class RightSideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      partners: '',
      channels: '',
      innovations: '',
      products: '',
      policies: '',
      premium: '',
      totalSum: '',
      claimed: '',
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const { insuranceData } = this.props;

    if (insuranceData !== prevProps.insuranceData) {
      const uniquePartners = removeDuplicates(
        insuranceData,
        'partner_name',
      );
      const partners = uniquePartners.length;

      const uniqueDistributions = removeDuplicates(
        insuranceData,
        'distribution_channel',
      );
      const channels = uniqueDistributions.length;

      const uniqueInnovation = removeDuplicates(
        insuranceData,
        'innovation',
      );
      const innovations = uniqueInnovation.length;

      const uniqueProducts = removeDuplicates(
        insuranceData,
        'product',
      );
      const products = uniqueProducts.length;

      const policies = insuranceData.reduce(
        (total, i) => total + i.number_of_insurance_sold,
        0,
      );
      const premium = insuranceData.reduce(
        (total, i) => total + i.amount_of_insurance,
        0,
      );
      const totalSum = insuranceData.reduce(
        (total, i) => total + i.amount_of_sum_insuranced,
        0,
      );
      const claimed = insuranceData.reduce(
        (total, i) => total + i.amount_of_claim,
        0,
      );
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        partners,
        products,
        innovations,
        channels,
        policies,
        premium,
        totalSum,
        claimed,
      });

      console.log(
        'partners',
        partners,
        products,
        innovations,
        channels,
        policies,
        premium,
        totalSum,
        claimed,
      );
    }
  }

  render() {
    const {
      props: { activeOverview, setActiveOverview },
      state: {
        partners,
        products,
        innovations,
        channels,
        policies,
        premium,
        totalSum,
        claimed,
      },
    } = this;
    return (
      <aside
        className="sidebar right-sidebar literacy-right-sidebar"
        style={{ maxWidth: '345px' }}
      >
        <div className="sidebar-in">
          <div className="right-sidebar-header">
            <h5>Overview</h5>
          </div>
          <div className="aside-body">
            <div className="sidebar-widget">
              <div className="widget-body">
                <ul className="widget-list">
                  <OverviewTab
                    title="Partner Institution"
                    number={partners}
                    iconTitle="account_balance"
                    // iconTitle="payments"
                  />
                  <OverviewTab
                    title="Distribution Channel"
                    number={channels}
                    iconTitle="assignment"
                  />
                  <OverviewTab
                    title="Innovations"
                    number={innovations}
                    iconTitle="assignment"
                  />
                  <OverviewTab
                    title="Products"
                    number={products}
                    iconTitle="assignment"
                  />
                  <OverviewTab
                    title="Insurance Policies Sold"
                    number={numberWithCommas(policies)}
                    iconTitle="assignment"
                  />
                  <OverviewTab
                    title="Insurance Premium"
                    number={numberWithCommas(premium)}
                    iconTitle="account_balance"
                  />
                  <OverviewTab
                    title="Sum Insured"
                    number={numberWithCommas(totalSum)}
                    iconTitle="tablet_mac"
                  />
                  <OverviewTab
                    title="Claimed"
                    number={numberWithCommas(claimed)}
                    iconTitle="tablet_mac"
                  />
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`expand-button ${
            activeOverview ? 'active' : ''
          } `}
        >
          <button
            type="button"
            onClick={setActiveOverview}
            className="common-button is-clear close-all"
          >
            <i className="material-icons">chevron_right</i>
          </button>
        </div>
      </aside>
    );
  }
}

export default RightSideBar;