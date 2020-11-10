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
      <div className="acc-header">
        <h5>{data.partner_name}</h5>
      </div>
      <div className="acc-body">
        <ul>
          {data.achievementType.map(achievement => {
            return (
              <li>
                <a>{achievement.name}</a>
                <a>{numberWithCommas(achievement.count)}</a>
              </li>
            );
          })}
        </ul>
      </div>
      {/* <div className="acc-body">
        <ul>{partnerList}</ul>
      </div> */}
    </div>
  );
}
