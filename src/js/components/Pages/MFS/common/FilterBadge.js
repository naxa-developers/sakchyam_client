import React from 'react';

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
        <i className="material-icons">{icon ? icon : 'store'}</i>
        <span>{title}</span>
      </a>
      {/* <a>{title}</a> */}
    </li>
  );
};

export default FilterBadge;
