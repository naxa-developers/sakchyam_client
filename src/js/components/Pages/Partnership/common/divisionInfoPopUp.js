/* eslint-disable prettier/prettier */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-this-in-sfc */
/* eslint-disable camelcase */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useRef } from 'react';
import { numberWithCommas } from '../../../common/utilFunctions';

// function clickHandler() {
//   
//   // e.target.classList.toggle('active');
// }
export default function divisionInfoPopUp(props) {
  const accheader = useRef(null);
  const {
    propsdata, partners, mapViewDataBy
  } = props.data;
  let partnerContent = null;
        // eslint-disable-next-line no-restricted-syntax
        const index=0
        partnerContent = partners && partners.map(data=>{
          const partnerList= data && data.partnerlist && data.partnerlist.map(partner=>{
            return (
              <li>
                <a>{partner}</a>
              </li>
            )
          });
          return (
            <div
              ref={accheader}
              className={`acc-list ${index === 0 ? 'active' : ''}`}
            >
              <div className={`acc-header is-between ${mapViewDataBy === 'investment_focus'?"":"no-pseudo"}`}>
                {mapViewDataBy === 'investment_focus'?
                (<h5>{data.partnerName}</h5>):
                (
                  <>
                    <label style={{ fontFamily: 'Avenir Book',fontSize: ".875rem"}}>{data.partnerName}</label>
                    <label>{numberWithCommas(Math.round(data.totalCount))}</label>
                  </>)}
              </div>
              <div className="acc-body">
                <ul>
                  {partnerList}
                </ul>
              </div>
            </div>
          )
        })
        const accList = document.querySelectorAll('.acc-list');
        if(accList){ 
        accList.forEach(data=>{
          data.addEventListener('click', function(e) {
            e.stopPropagation();
            this.classList.toggle('active');
          });
        })
      }
  // 
  const classValue =
  mapViewDataBy === 'allocated_budget'
  ? `${'fas fa-pound-sign'}` // eslint-disable-line prettier/prettier
      : 'material-icons';
  return propsdata && propsdata ? (
    <div className="mapbox-popup-content">
      <div
        className="map-popup-view"
        style={{ marginBottom: '0 !important',    height: "300px",
        overflowY: "scroll" }}
      >
        <div className="map-popup-view-header">
          <h5>{propsdata.federal_name}</h5>
          <div className="icons">
            <i className={classValue}>{
                      mapViewDataBy === 'allocated_beneficiary'
                        ? 'people'
                        : mapViewDataBy === 'allocated_budget'
                        ? ''
                        : 'payments'
                    }
            </i><b>{mapViewDataBy === 'investment_focus'?numberWithCommas(Math.round(props.data.totalUniquePartner.length)):numberWithCommas(Math.round(propsdata.point_count))}</b>
          </div>
        </div>
        <div className="acc is-after is-border">
          {
          partnerContent !== undefined
                      ? partnerContent
                      : ''
                  }
        </div>
                
        <div className="map-view-footer" />
      </div>
    </div>
    // <div className="mapbox-popup-content">
    //   <div
    //     className="map-popup-view"
    //     style={{ marginBottom: '0 !important' }}
    //   >
    //     <div className="map-popup-view-header">
    //       <h5>{fulldata && fulldata.props.federal_name}</h5>
    //       <div className="icons">
    //         <i className="material-icons">payments</i>
    //         <b>{fulldata && fulldata.props.count}</b>
    //       </div>
    //     </div>
    //     <div className="acc is-after is-border">
    //       {popupData &&
    //         popupData.map(data => {
    //           return (
    //             <div
    //               className="acc-list active"
    //               onClick={e => {
    //                 // clickHandler(e);
    //               }}
    //               onKeyDown={e => {
    //                 // clickHandler(e);
    //               }}
    //             >
    //               <div className="acc-header">
    //                 <h5>{data.partner_name}</h5>
    //               </div>
    //               <div className="acc-body">
    //                 <ul>
    //                   {data.achievementType.map(achievement => {
    //                     return (
    //                       <li>
    //                         <a>{achievement.name}</a>
    //                         <a>{achievement.count}</a>
    //                       </li>
    //                     );
    //                   })}
    //                 </ul>
    //               </div>
    //             </div>
    //           );
    //         })}
    //     </div>
    //     <div className="map-view-footer" />
    //   </div>
    // </div>
  ) : null;
}
