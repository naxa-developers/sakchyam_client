import React, { Component } from 'react';

class ContentSection extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <aside className="payement-content">
        <div className="payment-content-header">
          <h5>RTGS (Real Time Gross Settlement) System</h5>
          <h6>Nepal Rastriya Bank</h6>
        </div>
        <div className="payment-content-body">
          <p>
            Nationwide high value payment infrastructure deployed and
            implemented by Sakchyam at Nepal Rastra Bank with
            Production, Disaster Recovery and Test environment.
            Disaster Recovery Site is a full replica of Production
            environment and both sites have High Availability
            architecture for performance and business continuity.
          </p>
          <p>
            RTGS is operational since September 2019 and provided
            uninterrupted services even during long lockdown period.
            All 27 class A banks are Direct Members and Nepal Clearing
            House (NCHL) is a Technical Member of RTGS. NRB has plan
            to onboard all Class B and C financial institutions into
            RTGS which is being delayed due to COVID-19 impact.
          </p>
          <p>
            Normal installed capacity is to handle 20,000 transactions
            per day but it can go beyond double of the limit easily.
          </p>
          <p>
            Processed monthly average 17,259 transactions during 3
            months of lockdown. The monthly average value settled in
            RTGS in the same time was NPR 1006.37 billion (GBP 6.71
            billion @150).
          </p>
        </div>
      </aside>
    );
  }
}

export default ContentSection;
