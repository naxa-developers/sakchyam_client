/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import html2canvas from 'html2canvas';
import saveAs from 'file-saver';
import DownloadIcon from '../../../../img/get_app.png';

const downloadPng = (chartid, filename) => {
  setTimeout(() => {
    html2canvas(document.querySelector(`#${chartid}`), {}).then(
      canvas => {
        canvas.toBlob(function(blob) {
          saveAs(blob, `${filename}.png`);
        });
      },
    );
  }, 10);
};

const Modal = props => {
  const {
    handleModal,
    component,
    selectedModal,
    header,
    isBarChartToggled,
  } = props;
  const selectedChartId =
    selectedModal === 'bar'
      ? 'horizontal-chart'
      : selectedModal === 'donut'
      ? 'donut-chart'
      : selectedModal === 'tree'
      ? 'treemap-chart'
      : 'sankey-chart';

  const barHeader = isBarChartToggled
    ? 'Initiative-wise beneficiary breakdown'
    : 'Financial Literacy Beneficiaries by Partners';

  return (
    <div className="popup open" id="graph-modal">
      <div className="popup-container full-popup">
        <div className="popup-body" id="popup-body">
          <span className="close-icon">
            <i
              className="material-icons"
              role="button"
              tabIndex="0"
              onClick={handleModal}
              onKeyDown={handleModal}
            >
              close
            </i>
          </span>
          <div className="popup-header no-flex">
            <h3 style={{ color: '#C2002F' }}>
              {selectedModal === 'bar' ? barHeader : header}
            </h3>
            <span
              style={{
                position: 'absolute',
                right: '90px',
                top: '30px',
                padding: '5px 6px',
                border: '1px solid #F0F0F0',
                // borderColor: 'lightgrey',
                cursor: 'pointer',
              }}
              onClick={() => downloadPng('modal-content', header)}
            >
              <img src={DownloadIcon} alt="open" />
            </span>
          </div>
          <div className="popup-content" id="modal-content">
            {component()}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Modal;
