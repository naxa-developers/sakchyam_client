/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import html2canvas from 'html2canvas';
import ReactApexChart from 'react-apexcharts';
import saveAs from 'file-saver';
import DownloadIcon from '../../../../img/get_app.png';
import { numberWithCommas } from '../../common/utilFunctions';

const downloadPng = (chartid, filename) => {
  console.log('called');
  setTimeout(() => {
    html2canvas(document.querySelector(`#${chartid}`), {}).then(
      canvas => {
        canvas.toBlob(function(blob) {
          saveAs(blob, `${filename}.png`);
        });
      },
    );
  }, 10);
};

function getClassName(i) {
  if (i % 12 === 0) return 'is-color1';
  if (i % 12 === 1) return 'is-color2';
  if (i % 12 === 2) return 'is-color3';
  if (i % 12 === 3) return 'is-color4';
  if (i % 12 === 4) return 'is-color5';
  if (i % 12 === 5) return 'is-color6';
  if (i % 12 === 6) return 'is-color7';
  if (i % 12 === 7) return 'is-color8';
  if (i % 12 === 8) return 'is-color9';
  if (i % 12 === 9) return 'is-color10';
  if (i % 12 === 10) return 'is-color11';
  if (i % 12 === 11) return 'is-color12';
  if (i % 12 === 12) return 'is-color13';
  if (i % 12 === 13) return 'is-color14';
  return 'is-green';
}

const Modal = props => {
  const { handleModal, tabletsDeployed, allPartners } = props;

  console.log('chart data', allPartners);

  const a =
    allPartners &&
    allPartners.map(data => {
      return data.branch;
    });

  const totalBranches = allPartners.reduce(
    (total, i) => total + i.branch,
    0,
  );

  const totalBeneficieries = allPartners.reduce(
    (total, i) => total + i.beneficiary,
    0,
  );
  const totalPartners = allPartners.length;

  const maxBranchValue = a && Math.max(...a);
  return (
    <div className="popup open" id="graph-modal">
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
            <span
              style={{
                position: 'absolute',
                right: '90px',
                top: '30px',
                padding: '5px 6px',
                border: '1px solid #F0F0F0',
                // borderColor: 'lightgrey',
                cursor: 'pointer',
              }}
              onClick={() => downloadPng('pie-content', 'chart')}
            >
              <img src={DownloadIcon} alt="open" />
            </span>
          </div>
          <div
            className="popup-content"
            id="pie-content"
            style={{
              marginTop: '7vh',
              display: 'flex',
              marginBottom: '2vh',
            }}
          >
            <div
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                fontWeight: 'bold',
                fontSize: '15px',
              }}
            >
              <div style={{ flex: 8 }}>
                {tabletsDeployed.total_branch === 0 ? (
                  0
                ) : (
                  <ReactApexChart
                    options={tabletsDeployed}
                    series={tabletsDeployed.series}
                    type="donut"
                    height="350"
                  />
                )}
              </div>
              <div style={{ flex: 1 }}>
                {`Partner Institutions: ${totalPartners}`}
              </div>
              <div style={{ flex: 1 }}>
                {`Total Branch Count: ${totalBranches}`}
              </div>
              <div style={{ flex: 1 }}>
                {`Beneficiaries: ${numberWithCommas(
                  totalBeneficieries,
                )}`}
              </div>
            </div>

            <div style={{ flex: 1, marginBottom: '2vh' }}>
              <div
                className="branch-list"
                style={{ marginTop: '5vh' }}
              >
                {allPartners.map((data, i) => {
                  // const singlebranchValue = data.branch;
                  // const BranchpercentCalculate =
                  //   (singlebranchValue / maxBranchValue) * 100;
                  // const branchPercent = Math.round(
                  //   BranchpercentCalculate,
                  // );
                  let initials =
                    data.partner_name.match(/\b\w/g) || [];
                  initials = (
                    (initials.shift() || '') + (initials.pop() || '')
                  ).toUpperCase();
                  return (
                    <div
                      key={data.id}
                      className="branch"
                      style={{ height: '4vh' }}
                    >
                      <div
                        className={`branch-icon ${getClassName(
                          data.id,
                        )}`}
                      >
                        <span>{initials}</span>
                      </div>
                      <div
                        style={{
                          fontWeight: 'bold',
                          fontSize: '15px',
                        }}
                      >
                        {`${data.partner_name}   Branch Count:${data.branch}   Tablets Deployed:${data.tablets_deployed}`}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Modal;
