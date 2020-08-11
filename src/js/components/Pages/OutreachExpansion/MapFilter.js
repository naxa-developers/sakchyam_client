import React, { useState } from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import FilterBadge from '../../common/FilterBadge';

const categoryOption = [
  'Population in the Local Unit',
  'Yearly Central Government Funding',
  'Social Security Payment Recipients',
  'HDI of District',
  'Yearly Social Security Payments',
  'Nearest Police Presence(Distance)',
  'Road distance from nearest Commercial Bank Branch (in KM)',
  'Nearest Road Access(Distance)',
  // 'Nearest Road Access(TypeOfRoad)',
  'Available Means of Communication(Landline)',
  'Available Means of Communication(Mobile)',
  'Available Means of Communication(Internet)',
  'Available Means of Communication(OtherInternet)',
  'Availability of Electricity(MainGrid)',
  'Availability of Electricity(Micro-Hydro)',
];

export default function MapFilter(props) {
  const {
    viewDataBy,
    activeView,
    mapViewDataBy,
    setViewDataBy,
    setMapViewDataBy,
    setOutreachByLU,
  } = props;

  const [selectedOption, setOption] = useState(
    'Population in the Local Unit',
  );

  const handelViewDataBy = e => {
    // console.log('data retrieved', e);
    setOption(e.value);
    setOutreachByLU(e.value);
  };

  return (
    <div className="partnership-tab">
      <ul>
        {activeView === 'visualization' ? (
          <>
            <FilterBadge
              viewDataBy={viewDataBy}
              onclick={() => {
                setViewDataBy('allocated_beneficiary');
              }}
              dataTitle="allocated_beneficiary"
              icon="people"
              title="Beneficiaries"
            />
            <FilterBadge
              viewDataBy={viewDataBy}
              onclick={() => {
                setViewDataBy('allocated_budget');
              }}
              dataTitle="allocated_budget"
              icon="monetization_on"
              title="Budget Allocated"
            />
            <FilterBadge
              viewDataBy={viewDataBy}
              onclick={() => {
                setViewDataBy('Leverage');
              }}
              dataTitle="Leverage"
              title="Leverage"
            />
          </>
        ) : (
          <>
            <FilterBadge
              viewDataBy={mapViewDataBy}
              onclick={() => {
                setMapViewDataBy('general_outreach');
              }}
              dataTitle="general_outreach"
              title="General Outreach"
            />
            <FilterBadge
              viewDataBy={mapViewDataBy}
              onclick={() => {
                setMapViewDataBy('outreach_local_units');
              }}
              dataTitle="outreach_local_units"
              title="Outreach by Local Unit"
            />
          </>
        )}
      </ul>
      {mapViewDataBy === 'outreach_local_units' && (
        <div className="outreach-dropdown">
          {/* style={{
            paddingLeft: '2vw',
            maxWidth: '100%',
            display: 'flex',
          }} */}

          <span>
            {/* style={{
              paddingTop: '1vh',
            }}
           */}
            view data by
          </span>
          <Dropdown
            className="filter-dropdown-selector"
            options={categoryOption}
            onChange={e => {
              handelViewDataBy(e);
            }}
            placeholder="Select an option."
            value={selectedOption}
          />
        </div>
      )}
    </div>
  );
}
