import React from 'react';
import html2canvas from 'html2canvas';
import saveAs from 'file-saver';

const downloadPng = chartid => {
  // document.querySelector('.info-header-bottom').style.display =
  //   'none';
  // document
  //   .querySelector('.download-dropdown')
  //   .classList.remove('active');
  setTimeout(() => {
    html2canvas(document.querySelector(`#${chartid}`), {
      // logging: true,
      // letterRendering: 1,
      allowTaint: true,
      // scale: window.devicePixelRatio,
      // windowWidth: window.innerWidth,
      // windowHeight: window.innerHeight + 120,
      // x: 20,
      // y: 70,
      // width: window.innerWidth + 40,
      // height: window.innerHeight + 40,
      // foreignObjectRendering: true,
      // useCORS: true,
    }).then(canvas => {
      canvas.toBlob(function(blob) {
        saveAs(blob, 'Dashboard.png');
      });
    });
  }, 500);

  // this.setState({ downloadActive: false });
};
const Modal = props => {
  const { handleModal, component, selectedModal } = props;
  // console.log(selectedModal, 'selectedModal');
  const selectedChartId =
    selectedModal === 'bar'
      ? 'horizontal-chart'
      : selectedModal === 'donut'
      ? 'donut-chart'
      : selectedModal === 'tree'
      ? 'treemap-chart'
      : 'sankey-chart';
  return (
    <div
      className="popup open"
      // className={`popup ${
      //   activeModal && visible === true ? 'open' : ''
      // }`}
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
            <h3>modal header</h3>
          </div>
          <div className="popup-content" id="modal-content">
            {component()}
          </div>
          <div className="popup-footer buttons is-end">
            {/* <button type="button" className="common-button is-border">
              <span>cancel</span>
            </button> */}
            <button
              onClick={() => {
                downloadPng(selectedChartId);
              }}
              type="button"
              className="common-button is-bg"
            >
              <span>Download</span>
            </button>
          </div>
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
