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
  const pieTab = document.querySelector('#donut-tab-insurance');
  pieTab.style.display = 'none';

  const chartEl = document.querySelector(`#${chartid}`);
  const useWidth = chartEl.scrollWidth;
  setTimeout(() => {
    html2canvas(chartEl, {
      allowTaint: true,
      scale: 5,
      width: useWidth,
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
    pieTab.style.display = 'block';
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
    selectedTabBar,
    selectedTab,
    isBarChartClicked,
    notificationHandler,
  } = props;

  let modalTitle = '';
  const barTitle =
    selectedTabBar === 'insurance-premium' && !isBarChartClicked
      ? 'Partner wise distribution of Amount of Insurance Premium (NPR)'
      : selectedTabBar === 'insurance-premium' && isBarChartClicked
      ? 'Product wise distribution of Amount of Insurance Premium (NPR)'
      : selectedTabBar !== 'insurance-premium' && !isBarChartClicked
      ? 'Partner wise distribution of Amount of Sum Insured'
      : 'Product wise distribution of Amount of Sum Insured';

  const donutTitle =
    selectedTab === 'innovation'
      ? 'Innovation wise ratio of number of insurance policies sold'
      : selectedTab === 'product'
      ? 'Product wise ratio of number of insurance policies sold'
      : 'Partner wise ratio of number of insurance policies sold';

  const sankeyTitle = 'Number of insurance policies sold';

  switch (selectedModal) {
    case 'bar':
      modalTitle = barTitle;
      break;

    case 'donut':
      modalTitle = donutTitle;
      break;

    case 'sankey':
      modalTitle = sankeyTitle;
      break;

    default:
      modalTitle = '';
  }

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
              {/* {modalHeader} */}
              {modalTitle}
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
              onClick={() => {
                notificationHandler();
                downloadPng('popup-body', modalHeader);
              }}
              onKeyDown={() => {
                notificationHandler();
                downloadPng('popup-body', modalHeader);
              }}
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
