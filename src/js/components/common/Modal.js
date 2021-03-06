/* eslint-disable react/jsx-indent */
/* eslint-disable react/jsx-indent-props */
import React from 'react';
import html2canvas from 'html2canvas';
import saveAs from 'file-saver';
import DownloadIcon from '../../../img/get_app.png';
import FilterTab from '../Pages/Partnership/common/FilterTab';

const downloadPng = (chartid, imageTitle, selectedModal) => {
  // document.querySelector('.info-header-bottom').style.display =
  //   'none';
  // document
  //   .querySelector('.download-dropdown')
  //   .classList.remove('active');
  const popupEl = document.querySelector(
    selectedModal === 'logframe'
      ? `.info-content-wrap`
      : `#popup-body`,
  );
  const infoHeader = document.querySelector('.info-header-bottom');
  if (infoHeader) {
    infoHeader.style.display = 'none';
  }
  document.querySelectorAll('.download-icon-image').forEach(el => {
    // eslint-disable-next-line no-param-reassign
    el.style.display = 'none';
  });
  document.querySelectorAll('.graph-title').forEach(el => {
    // eslint-disable-next-line no-param-reassign
    el.style.display = 'block';
  });
  const downloadDropdown = document.querySelector(
    '.download-dropdown',
  );
  if (downloadDropdown) {
    downloadDropdown.classList.remove('active');
  }
  const milestoneBtn = document.querySelector('.multiple-bar');
  if (milestoneBtn) {
    milestoneBtn.style.display = 'none';
  }
  // const titleEl = document.createElement('h6');
  // popupEl.appendChild(titleEl).textContent = 'spaghetti';
  // titleEl.setAttribute('class', 'popup_title');
  const useWidth = popupEl.scrollWidth;

  setTimeout(() => {
    const options =
      chartid === 'test2'
        ? { allowTaint: true }
        : {
            // logging: true,
            // letterRendering: 1,
            scale: 5,
            allowTaint: true,
            // width: useWidth,
            // scale: window.devicePixelRatio,
            // windowWidth: window.innerWidth,
            // windowHeight: window.innerHeight + 120,
            // x: 20,
            // y: 70,
            // width: window.innerWidth + 40,
            // height: window.innerHeight + 40,
            // foreignObjectRendering: true,
            // useCORS: true,
          };
    // document
    //   .querySelector(`.${chartid}`)
    //   .append(<label>Varun</label>);
    html2canvas(popupEl, options).then(canvas => {
      canvas.toBlob(function(blob) {
        saveAs(blob, `${imageTitle}.png`);
      });
      if (infoHeader) {
        infoHeader.style.display = 'block';
      }
      // if (milestoneBtn) {
      //   milestoneBtn.style.display = 'block';
      // }
      document
        .querySelectorAll('.download-icon-image')
        .forEach(el => {
          // eslint-disable-next-line no-param-reassign
          el.style.display = 'block';
        });
      document.querySelectorAll('.graph-title').forEach(el => {
        // eslint-disable-next-line no-param-reassign
        el.style.display = 'none';
      });
    });
  }, 500);

  // this.setState({ downloadActive: false });
};
const Modal = props => {
  const {
    handleModal,
    handleShowBarOf,
    showBarof,
    component,
    selectedModal,
    header,
    activeModal,
    resetFilters,
    headerTitle,
    groupedStackData,
    showBarChartBy,
    handleShowBarOfInvestmentBudgetBenefBar,
    notificationHandler,
    showBarPartnerChartOf,
    downloadFn,
  } = props;
  const selectedChartId =
    selectedModal === 'groupedChart'
      ? 'stacked_chart'
      : selectedModal === 'leverageChart'
      ? 'leverage_chart'
      : selectedModal === 'sankey'
      ? 'sankey_chart'
      : selectedModal === 'sunburst'
      ? 'test2'
      : selectedModal === 'stackedWithInvestment'
      ? 'stackedWithInvestment'
      : selectedModal === 'logframe'
      ? 'logframe-chart'
      : selectedModal === 'stacked_chart'
      ? 'stacked_chart'
      : '';
  const modalHeader =
    selectedModal === 'sunburst'
      ? 'Sakchyam Investment Focus'
      : selectedModal === 'groupedChart'
      ? `Province/District/Municipality Wise Budget & Beneficiaries Count`
      : selectedModal === 'leverageChart'
      ? 'S-CF Fund & Leverage By Investment Focus'
      : selectedModal === 'radar'
      ? 'Key Services Introduced'
      : selectedModal === 'sankey'
      ? 'Beneficiaries Reached'
      : selectedModal === 'timeline'
      ? 'Beneficiaries Reached'
      : selectedModal === 'stackedWithInvestment'
      ? 'Investment Focus Wise Budget & Beneficiaries Count'
      : selectedModal === 'logframe'
      ? headerTitle
      : selectedModal === 'stacked_chart'
      ? `${
          showBarChartBy === 'Federal'
            ? 'Province/District'
            : 'Partner'
        } Wise Achievement Type`
      : '';
  return (
    <div
      // className="popup open"
      className={`popup ${activeModal === true ? 'open' : ''}`}
      id="graph-modal"
    >
      <div className="popup-container full-popup">
        <div className="popup-body" id="popup-body">
          <span data-html2canvas-ignore className="close-icon">
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
            <h3>{modalHeader}</h3>
            {selectedModal === 'groupedChart' && (
              <FilterTab
                groupedStackData={groupedStackData}
                isRight
              />
            )}
            {selectedModal === 'stacked_chart' &&
            showBarPartnerChartOf === 'Innovation' ? (
              <span
                data-html2canvas-ignore
                style={{
                  position: 'absolute',
                  right: '142px',
                  top: '30px',
                  padding: '5px 6px',
                  // border: '1px solid #F0F0F0',
                  // borderColor: 'lightgrey',
                  cursor: 'pointer',
                }}
                // onClick={
                //   () => downloadPng(selectedChartId, modalHeader)
                //   // eslint-disable-next-line react/jsx-curly-newline
                // }
                // onKeyDown={
                //   () => downloadPng(selectedChartId, modalHeader)
                //   // eslint-disable-next-line react/jsx-curly-newline
                // }
                role="button"
                tabIndex="-1"
              >
                <button
                  // id="chart-reset"
                  type="button"
                  onClick={() => {
                    resetFilters();
                    // props.resetRadialData();
                    // resetFunction();
                  }}
                  className="is-border common-button chart-reset "
                >
                  Reset
                </button>
              </span>
            ) : selectedModal === 'stacked_chart' &&
              showBarof === 'Districts' ? (
              <span
                data-html2canvas-ignore
                style={{
                  position: 'absolute',
                  right: '142px',
                  top: '30px',
                  padding: '5px 6px',
                  // border: '1px solid #F0F0F0',
                  // borderColor: 'lightgrey',
                  cursor: 'pointer',
                }}
                // onClick={
                //   () => downloadPng(selectedChartId, modalHeader)
                //   // eslint-disable-next-line react/jsx-curly-newline
                // }
                // onKeyDown={
                //   () => downloadPng(selectedChartId, modalHeader)
                //   // eslint-disable-next-line react/jsx-curly-newline
                // }
                role="button"
                tabIndex="-1"
              >
                <button
                  // id="chart-reset"
                  type="button"
                  onClick={() => {
                    resetFilters();
                    // props.resetRadialData();
                    // resetFunction();
                  }}
                  className="is-border common-button chart-reset "
                >
                  Reset
                </button>
              </span>
            ) : selectedModal === 'sunburst' ? (
              <span
                data-html2canvas-ignore
                style={{
                  position: 'absolute',
                  right: '142px',
                  top: '30px',
                  padding: '5px 6px',
                  // border: '1px solid #F0F0F0',
                  // borderColor: 'lightgrey',
                  cursor: 'pointer',
                }}
                // onClick={
                //   () => downloadPng(selectedChartId, modalHeader)
                //   // eslint-disable-next-line react/jsx-curly-newline
                // }
                // onKeyDown={
                //   () => downloadPng(selectedChartId, modalHeader)
                //   // eslint-disable-next-line react/jsx-curly-newline
                // }
                role="button"
                tabIndex="-1"
              >
                <button
                  // id="chart-reset"
                  type="button"
                  onClick={() => {
                    resetFilters();
                    // props.resetRadialData();
                    // resetFunction();
                  }}
                  className="is-border common-button chart-reset "
                >
                  Reset
                </button>
              </span>
            ) : // </span>
            selectedModal === 'groupedChart' ? (
              <span
                data-html2canvas-ignore
                style={{
                  position: 'absolute',
                  right: '142px',
                  top: '30px',
                  padding: '5px 6px',
                  // border: '1px solid #F0F0F0',
                  // borderColor: 'lightgrey',
                  cursor: 'pointer',
                }}
                // onClick={
                //   () => downloadPng(selectedChartId, modalHeader)
                //   // eslint-disable-next-line react/jsx-curly-newline
                // }
                // onKeyDown={
                //   () => downloadPng(selectedChartId, modalHeader)
                //   // eslint-disable-next-line react/jsx-curly-newline
                // }
                role="button"
                tabIndex="-1"
              >
                <button
                  // id="chart-reset"
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
              </span>
            ) : // </span>
            selectedModal === 'stackedWithInvestment' ? (
              <span
                data-html2canvas-ignore
                style={{
                  position: 'absolute',
                  right: '142px',
                  top: '30px',
                  padding: '5px 6px',
                  // border: '1px solid #F0F0F0',
                  // borderColor: 'lightgrey',
                  cursor: 'pointer',
                }}
                // onClick={
                //   () => downloadPng(selectedChartId, modalHeader)
                //   // eslint-disable-next-line react/jsx-curly-newline
                // }
                // onKeyDown={
                //   () => downloadPng(selectedChartId, modalHeader)
                //   // eslint-disable-next-line react/jsx-curly-newline
                // }
                role="button"
                tabIndex="-1"
              >
                <button
                  // id="chart-reset"
                  type="button"
                  onClick={() => {
                    resetFilters();
                    // handleShowBarOf('Provinces');
                    handleShowBarOfInvestmentBudgetBenefBar(
                      'investmentFocus',
                    );
                    // resetFunction();
                  }}
                  className="is-border common-button chart-reset"
                >
                  Reset
                </button>
              </span>
            ) : null}

            {/* <span
              style={{
                position: 'absolute',
                right: '90px',
                top: '30px',
                padding: '5px 6px',
                border: '1px solid #F0F0F0',
                // borderColor: 'lightgrey',
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
              <button
                // id="chart-reset "
                type="button"
                onClick={() => {
                  // resetFunction();
                }}
                className="is-border common-button"
              >
                Reset
              </button>
            </span> */}

            <span
              data-html2canvas-ignore
              style={{
                position: 'absolute',
                right: '90px',
                top: '30px',
                padding: '5px 6px',
                border: '1px solid #F0F0F0',
                // borderColor: 'lightgrey',
                cursor: 'pointer',
                zIndex: 9999,
              }}
              onClick={() => {
                notificationHandler();
                if (downloadFn) {
                  downloadFn();
                } else {
                  downloadPng(
                    selectedChartId,
                    modalHeader,
                    selectedModal,
                  );
                }
              }}
              onKeyDown={
                () => {
                  notificationHandler();
                  if (downloadFn) {
                    downloadFn();
                  } else {
                    downloadPng(
                      selectedChartId,
                      modalHeader,
                      selectedModal,
                    );
                  }
                }

                // eslint-disable-next-line react/jsx-curly-newline
              }
              role="button"
              tabIndex="-1"
            >
              <img src={DownloadIcon} alt="open" />
            </span>
          </div>
          <div className="popup-content" id="modal-content">
            {/* <label>Test</label> */}

            {component()}
          </div>
          {/* <div className="popup-footer buttons is-end"> */}
          {/* <button type="button" className="common-button is-border">
              <span>cancel</span>
            </button> */}
          {/* <button
              onClick={() => {
                downloadPng(selectedChartId);
              }}
              type="button"
              className="common-button is-bg"
            >
              <span>Download</span>
            </button> */}
          {/* </div> */}
        </div>
      </div>
    </div>
    // <div className="content content-mod">
    //   <div
    //     className={`modal fade modal-wrapper ${
    //       activeModal === true ? 'show' : ''
    //     }`}
    //     style={
    //       activeModal === true
    //         ? { display: 'block' }
    //         : { display: 'none' }
    //     }
    //     id="exampleModalCenter"
    //     tabIndex="-1"
    //     role="dialog"
    //     aria-labelledby="exampleModalCenterTitle"
    //     aria-modal="true"
    //   >
    //     <div
    //       className="modal-dialog modal-dialog-centered"
    //       role="document"
    //     >
    //       <div className="modal-content modal-container">
    //         <div className="popup-block" id="popup">
    //           <div className="popup-container">
    //             <div className="popup-content">
    //               <span
    //                 className="close"
    //                 label="close"
    //                 role="button"
    //                 tabIndex="0"
    //                 onClick={handleModal}
    //                 onKeyDown={handleModal}
    //                 data-toggle="modal"
    //                 data-target="#exampleModalCenter"
    //               />
    //               {component()}
    //               {/* <span className="important" /> */}
    //               {/* <p className="span_book_15">
    //                 {filteredDynamicData &&
    //                     filteredDynamicData[0] &&
    //                     filteredDynamicData[0].sub_category
    //                       .description}
    //               </p> */}
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};
export default Modal;
