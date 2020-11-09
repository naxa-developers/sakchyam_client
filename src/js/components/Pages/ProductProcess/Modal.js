import React from 'react';
import html2canvas from 'html2canvas';
import saveAs from 'file-saver';
import DownloadIcon from '../../../../img/get_app.png';

const downloadPng = (chartid, imageTitle) => {
  const closeIcon = document.querySelector('.close-icon');
  closeIcon.style.display = 'none';
  const downloadIcon = document.querySelector('#download-icon-popup');
  downloadIcon.style.display = 'none';

  const chartEl = document.querySelector(`#${chartid}`);
  const useWidth = chartEl.scrollWidth;
  // const useWidth = document.querySelector(`#${chartid}`).scrollWidth;
  // const useHeight = document.querySelector(`#${chartid}`)
  //   .scrollHeight;
  // alert(useWidth, 'useWidht');
  // console.log(useWidth, 'useWidht');
  setTimeout(() => {
    // const useWidth = $('#wrapper').prop('scrollWidth'); // document.getElementById("primary").style.width;
    // const useHeight = $('#wrapper').prop('scrollHeight'); // document.getElementById("primary").style.height;

    // html2canvas(document.querySelector(`#${chartid}`), {
    //   width: useWidth,
    //   // height: useHeight,
    //   screen: 5,
    // }).then(function(canvas) {
    //   // document.body.appendChild(canvas);

    //   const image = canvas
    //     .toDataURL('image/png')
    //     .replace('image/png', 'image/octet-stream'); // here is the most important part because if you dont replace you will get a DOM 18 exception.
    //   // var image = canvas.toDataURL("image/png");  // here is the most important part because if you dont replace you will get a DOM 18 exception.
    //   window.location.href = image; // it will save locally
    // });
    html2canvas(chartEl, {
      allowTaint: true,
      scale: 5,
      width: useWidth,
      // height: useHeight,
      // height: document.querySelector(`#${chartid}`).clientHeight,
      // windowHeight: document.querySelector(`#${chartid}`)
      //   .clientHeight,
    }).then(canvas => {
      canvas.toBlob(function(blob) {
        saveAs(blob, `${imageTitle}.png`);
      });
    });
  }, 500);

  setTimeout(() => {
    closeIcon.style.display = 'block';
    downloadIcon.style.display = 'block';
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
    notificationHandler,
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
                () => {
                  notificationHandler();
                  downloadPng('popup-body', modalHeader);
                }
                // eslint-disable-next-line react/jsx-curly-newline
              }
              onKeyDown={
                () => {
                  notificationHandler();
                  downloadPng('popup-body', modalHeader);
                }
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
