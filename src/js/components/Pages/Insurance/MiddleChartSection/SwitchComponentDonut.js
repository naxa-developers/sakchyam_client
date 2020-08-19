import React from 'react';
import FilterBadge from '../../../common/FilterBadge';

export default function SwitchComponentDonut(props) {
  const { selectedTab, setSelectedTab } = props;

  return (
    <div className="partnership-tab" id="donut-tab-insurance">
      <ul style={{ width: '330px' }}>
        <FilterBadge
          viewDataBy={selectedTab}
          onclick={() => {
            setSelectedTab('innovation');
          }}
          dataTitle="innovation"
          title="Innovation"
        />
        <FilterBadge
          viewDataBy={selectedTab}
          onclick={() => {
            setSelectedTab('product');
          }}
          dataTitle="product"
          title="Product"
        />
        <FilterBadge
          viewDataBy={selectedTab}
          onclick={() => {
            setSelectedTab('partner');
          }}
          dataTitle="partner"
          title="Partner"
        />
      </ul>
    </div>
  );
}
