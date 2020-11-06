import React, { useState } from 'react';
import { numberWithCommas } from '../../../common/utilFunctions';

export default function AccordionCard({
  index,
  mapViewDataBy,
  data,
  partnerList,
}) {
  const [active, setactive] = useState(true);
  return (
    <div
      onClick={() => {
        setactive(!active);
      }}
      onKeyDown={() => {
        setactive(!active);
      }}
      role="tab"
      tabIndex="-1"
      className={`acc-list ${active ? 'active' : ''}`}
    >
      <div
        className={`acc-header is-between ${
          mapViewDataBy === 'investment_focus' ? '' : 'no-pseudo'
        }`}
      >
        {mapViewDataBy === 'investment_focus' ? (
          <h5>{data.partnerName}</h5>
        ) : (
          <>
            <label
              style={{
                fontFamily: 'Avenir Book',
                fontSize: '.875rem',
              }}
            >
              {data.partnerName}
            </label>
            <label style={{ display: 'flex', alignItems: 'center' }}>
              {mapViewDataBy === 'allocated_budget' && (
                <i
                  style={{ paddingRight: '3px' }}
                  className="fas fa-pound-sign"
                />
              )}
              {numberWithCommas(Math.round(data.totalCount))}
            </label>
          </>
        )}
      </div>
      <div className="acc-body">
        <ul>{partnerList}</ul>
      </div>
    </div>
  );
}
