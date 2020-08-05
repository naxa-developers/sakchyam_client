import React from 'react';

function numberWithCommas(x) {
  if (x !== null) {
    const parts = x.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
  }
  return x;
}

const OutreachTab = ({ title, iconTitle, number }) => {
  return (
    <li>
      <div className="widget-content">
        <h6>{title}</h6>
        <span>{numberWithCommas(number)}</span>
      </div>
      <div className="widget-icon">
        <span>
          <i className="material-icons">{iconTitle}</i>
        </span>
      </div>
    </li>
  );
};
export default OutreachTab;
