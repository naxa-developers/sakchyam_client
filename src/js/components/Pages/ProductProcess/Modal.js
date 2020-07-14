import React from 'react';
import html2canvas from 'html2canvas';
import saveAs from 'file-saver';
import DownloadIcon from '../../../../img/get_app.png';

const downloadPng = (chartid, imageTitle) => {
  setTimeout(() => {
    html2canvas(document.querySelector(`#${chartid}`), {
      allowTaint: true,
    }).then(canvas => {
      canvas.toBlob(function(blob) {
        saveAs(blob, `${imageTitle}.png`);
      });
    });
  }, 500);
};

const Modal = props => {
  const {
    handleModal,
    handleShowBarOf,
    component,
    selectedModal,
    modalHeader,
    activeModal,
    resetFilters,
  } = props;

  const selectedChartId =
    selectedModal === 'bubble'
      ? 'bubble-chart'
      : selectedModal === 'radar'
      ? 'radar-chart'
      : selectedModal === 'bar'
      ? 'bar-chart'
      : 'heatmap-chart';

  return (
    <div
      className={`popup ${activeModal === true ? 'open' : ''}`}
      id="graph-modal"
    >
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
            <h3 style={{ color: '#C2002F' }}>{modalHeader}</h3>
            {selectedModal === 'sunburst' ? (
              <button
                id="chart-reset"
                type="button"
                onClick={() => {
                  resetFilters();
                  // resetFunction();
                }}
                className="is-border common-button"
              >
                Reset
              </button>
            ) : selectedModal === 'groupedChart' ? (
              <button
                id="chart-reset"
                type="button"
                onClick={() => {
                  resetFilters();
                  handleShowBarOf('Provinces');
                  // resetFunction();
                }}
                className="is-border common-button"
              >
                Reset
              </button>
            ) : null}
            <span
              style={{
                position: 'absolute',
                right: '90px',
                top: '30px',
                padding: '5px 6px',
                border: '1px solid #F0F0F0',
                cursor: 'pointer',
              }}
              onClick={
                () => downloadPng(selectedChartId, modalHeader)
                // eslint-disable-next-line react/jsx-curly-newline
              }
              onKeyDown={
                () => downloadPng(selectedChartId, modalHeader)
                // eslint-disable-next-line react/jsx-curly-newline
              }
              role="button"
              tabIndex="-1"
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
