import React from 'react';
import FilterBadge from '../../../common/FilterBadge';

export default function MapFilter(props) {
  const { selectedTab, setSelectedTab } = props;

  return (
    <div className="partnership-tab" id="bar-tab-insurance">
      <ul style={{ width: '496px' }}>
        <FilterBadge
          viewDataBy={selectedTab}
          onclick={() => {
            setSelectedTab('insurance-premium');
          }}
          dataTitle="insurance-premium"
          title="Amount of Insurance Premium (NPR)"
        />
        <FilterBadge
          viewDataBy={selectedTab}
          onclick={() => {
            setSelectedTab('sum-insured');
          }}
          dataTitle="sum-insured"
          title="Amount of Sum Insured"
        />
        {/* <FilterBadge
          viewDataBy={selectedTab}
          onclick={() => {
            setSelectedTab('insurance');
          }}
          dataTitle="insurance"
          title="Insurance Policy Sold"
        /> */}
      </ul>
    </div>
  );
}
