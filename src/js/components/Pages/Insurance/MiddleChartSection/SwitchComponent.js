import React from 'react';
import FilterBadge from '../../../common/FilterBadge';

export default function MapFilter(props) {
  const { selectedTab, setSelectedTab } = props;

  return (
    <div className="partnership-tab">
      <ul>
        <FilterBadge
          viewDataBy={selectedTab}
          onclick={() => {
            setSelectedTab('innovations');
          }}
          dataTitle="innovations"
          title="Innovation"
        />
        <FilterBadge
          viewDataBy={selectedTab}
          onclick={() => {
            setSelectedTab('products');
          }}
          dataTitle="products"
          title="Products"
        />
        <FilterBadge
          viewDataBy={selectedTab}
          onclick={() => {
            setSelectedTab('insurance');
          }}
          dataTitle="insurance"
          title="Insurance Policy Sold"
        />
      </ul>
    </div>
  );
}
