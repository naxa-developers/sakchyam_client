import React from 'react';

const Modal = props => {
  const { activeModal, handleModal, component } = props;
  console.log(component, 'component');
  return (
    <div className="content content-mod">
      <div
        className={`modal fade modal-wrapper ${
          activeModal === true ? 'show' : ''
        }`}
        style={
          activeModal === true
            ? { display: 'block' }
            : { display: 'none' }
        }
        id="exampleModalCenter"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-modal="true"
      >
        <div
          className="modal-dialog modal-dialog-centered"
          role="document"
        >
          <div className="modal-content modal-container">
            <div className="popup-block" id="popup">
              <div className="popup-container">
                <div className="popup-content">
                  <span
                    className="close"
                    label="close"
                    role="button"
                    tabIndex="0"
                    onClick={handleModal}
                    onKeyDown={handleModal}
                    data-toggle="modal"
                    data-target="#exampleModalCenter"
                  />
                  {component()}
                  {/* <span className="important" /> */}
                  {/* <p className="span_book_15">
                    {filteredDynamicData &&
                        filteredDynamicData[0] &&
                        filteredDynamicData[0].sub_category
                          .description}
                  </p> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Modal;
