import React from 'react';

const Modal = props => {
  const { activeModal, handleModal, component, visible } = props;
  return (
    <div
      className={`popup ${
        activeModal && visible === true ? 'open' : ''
      }`}
      id="graph-modal"
    >
      <div className="popup-container lg-popup">
        <div className="popup-body">
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
          <div className="popup-content">{component()}</div>
          {/* <div className="popup-footer buttons is-end">
            <button type="button" className="common-button is-border">
              <span>cancel</span>
            </button>
            <button type="button" className="common-button is-bg">
              <span>save</span>
            </button>
          </div> */}
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
