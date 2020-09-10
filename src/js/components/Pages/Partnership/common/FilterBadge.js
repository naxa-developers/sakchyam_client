import React from 'react';
import British from '../../../../../Icons/british.png';

const FilterBadge = ({
  viewDataBy,
  onclick,
  dataTitle,
  icon,
  title,
}) => {
  return (
    <li
      className={viewDataBy === dataTitle ? 'active' : ''}
      onClick={() => {
        onclick(dataTitle);
      }}
      onKeyDown={() => {
        onclick(dataTitle);
      }}
      role="tab"
      tabIndex="-1"
    >
      <a>
        <i
          className={
            icon === 'british'
              ? 'fas fa-pound-sign'
              : 'material-icons'
          }
        >
          {icon !== 'british' && icon}
        </i>
        {/* <i className="material-icons">
          <img src={British} alt="british-pound" />
        </i> */}
        <span>{title}</span>
      </a>
      {/* <a>{title}</a> */}
    </li>
  );
};

export default FilterBadge;
