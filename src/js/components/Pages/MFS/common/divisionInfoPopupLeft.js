/* eslint-disable prettier/prettier */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-this-in-sfc */
/* eslint-disable camelcase */
/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { numberWithCommas } from '../../../common/utilFunctions';

// function clickHandler() {
//
//   // e.target.classList.toggle('active');
// }
export default function DivisionInfoPopUpLeft(props) {
  const {
    data: { name, id, code, count },
  } = props;
  
  //   let partnerContent = null;
  //         // eslint-disable-next-line no-restricted-syntax
  //         const index=0
  //         partnerContent = partners && partners.map(data=>{
  //           const partnerList= data && data.partnerlist && data.partnerlist.map(partner=>{
  //             return (
  //               <li>
  //                 <a>{partner}</a>
  //               </li>
  //             )
  //           });
  //           return (
  //             <div
  //               className={`acc-list ${index === 0 ? 'active' : ''}`}
  //               // onClick={(e)=>{}}
  //               // onKeyUp={(e)=>{e.classList.toggle('active')}}
  //               // onKeyDown={()=>{this.classList.toggle('active')}}
  //             >
  //               <div className="acc-header">
  //                 {mapViewDataBy === 'investment_focus'?
  //                 (<h5>{data.partnerName}</h5>):(
  //                   <div>
  //                     <label>{data.partnerName}</label>
  //                     <label>{Math.round(data.totalCount)}</label>
  //                   </div>)}
  //               </div>
  //               <div className="acc-body">
  //                 <ul>
  //                   {partnerList}
  //                 </ul>
  //               </div>
  //             </div>
  //           )
  //         })
  //         const accList = document.querySelector('.acc-list');
  //         if(accList){
  //         accList.addEventListener('click', function(e) {
  //           // e.stopPropagation();
  //           e.target.classList.toggle("active");
  //         });
  //       }
  //
  return name && name ? (
    <div className="mapbox-popup-content right-content center is-middle">
      <div
        className="map-popup-view"
        style={{
          marginBottom: '0 !important',
        }}
      >
        <div className="map-popup-view-header">
          <h5>{name}</h5>
          
          <h5>
            <i style={{verticalAlign: "middle",paddingRight: "2px"}} className="material-icons">poll</i>
            {numberWithCommas(count)}
          </h5>
        </div>
      </div>
    </div>
  ) : null;
}
