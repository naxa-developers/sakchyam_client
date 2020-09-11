import React from 'react';

const OutreachTab = ({ title, iconTitle, number }) => {
  return (
    <li>
      <div className="widget-content">
        <h6>{title}</h6>
        <span>{number}</span>
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
