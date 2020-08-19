import React from 'react';
import html2canvas from 'html2canvas';
import saveAs from 'file-saver';
import DownloadIcon from '../../../../../img/get_app.png';

const downloadPng = (chartid, imageTitle) => {
  const closeIcon = document.querySelector('.close-icon');
  closeIcon.style.display = 'none';
  const downloadIcon = document.querySelector('#download-icon-popup');
  downloadIcon.style.display = 'none';

  const barTab = document.querySelector('#bar-tab-insurance');
  barTab.style.display = 'none';

  setTimeout(() => {
    html2canvas(document.querySelector(`#${chartid}`), {
      allowTaint: true,
    }).then(canvas => {
      canvas.toBlob(function(blob) {
        saveAs(blob, `${imageTitle}.png`);
      });
    });
  }, 500);

  setTimeout(() => {
    closeIcon.style.display = 'block';
    downloadIcon.style.display = 'block';
    barTab.style.display = 'block';
  }, 600);
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
            <h3 style={{ color: '#C2002F', textTransform: 'none' }}>
              {modalHeader}
            </h3>
            {selectedModal === 'sunburst' ? (
              <button
                id="chart-reset"
                type="button"
                onClick={() => {
                  resetFilters();
                  // resetFunction();
                }}
                className="is-border common-button chart-reset"
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
                className="is-border common-button chart-reset"
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
                // () => downloadPng(selectedChartId, modalHeader)
                // () => downloadPng('modal-content', modalHeader)
                () => downloadPng('popup-body', modalHeader)
                // eslint-disable-next-line react/jsx-curly-newline
              }
              onKeyDown={
                // () => downloadPng('modal-content', modalHeader)
                () => downloadPng('popup-body', modalHeader)
                // eslint-disable-next-line react/jsx-curly-newline
              }
              id="download-icon-popup"
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
