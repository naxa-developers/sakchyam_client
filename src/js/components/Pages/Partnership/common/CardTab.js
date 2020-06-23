import React from 'react';
import DownloadIcon from '../../../../../img/get_app.png';
import ExpandIcon from '../../../../../img/open_in_full-black-18dp.png';

const CardTab = ({
  cardTitle,
  cardClass,
  cardChartId,
  handleModal,
  handleSelectedModal,
  renderChartComponent,
}) => {
  return (
    <div className={cardClass}>
      <div className="card">
        <div className="card-header">
          <h5>{cardTitle}</h5>
          <div className="header-icons">
            {/* <div className="card-switcher">
                      <small>OFF</small>
                      <label className="switch">
                        <input type="checkbox" />
                        <span className="slider" />
                      </label>
                      <small>ON</small>
                    </div> */}
            <span className="">
              <img src={DownloadIcon} alt="open" />
            </span>
            <span
              role="tab"
              tabIndex="0"
              onClick={() => {
                handleModal();
                handleSelectedModal(cardChartId);
              }}
              onKeyDown={() => {
                handleModal();
                handleSelectedModal(cardChartId);
              }}
              className="zoom"
              popup-link="graph-modal"
            >
              <img src={ExpandIcon} alt="open" />
            </span>
          </div>
        </div>
        <div className="card-body" id={cardChartId}>
          {renderChartComponent()}
        </div>
      </div>
    </div>
  );
};
export default CardTab;
