/* eslint-disable no-unused-expressions */
/* eslint-disable react/no-did-update-set-state */
import React, { Component } from 'react';
import { ResponsiveTreeMap } from '@nivo/treemap';
import { connect } from 'react-redux';
// import root from './treemap.data';

function getRandomColor() {
  let color = '#';
  let i;
  for (i = 0; i < 6; i += 1) {
    color += Math.floor(Math.random() * 16).toString(16);
  }
  return color;
}

const getColor = (function() {
  const colors = {};
  return function(id) {
    // eslint-disable-next-line no-return-assign
    return (colors[id] = colors[id] || getRandomColor());
  };
})();

function colorPicker2(i) {
  if (i === 3) return '#91664E';
  if (i === 4) return '#13A8BE';
  if (i === 7) return '#13A8BE'; // #FF6D00
  if (i === 9) return '#DE2693';
  if (i === 11) return '#B1B424';
  if (i === 12) return '#2196F3';
  if (i === 13) return '#900C3F'; // #4CE2A7
  if (i === 15) return '#1967A0';
  if (i === 16) return '#00C853';
  if (i === 17) return '#E11D3F'; // #651FFF
  if (i === 19) return '#FF6D00'; // #B71DE1
  if (i === 20) return '#7F8C8D'; // #FFCD00
  if (i === 21) return '#1F8AE4'; // #E11D3F
  if (i === 30) return '#FF1500';
  if (i === 32) return '#C5E11D';
  if (i === 34) return '#CDACF2';
  if (i === 37) return '#16A085';
  if (i === 38) return '#FF5576';
  if (i === 44) return '#BFEDF5';
  if (i === 45) return '#E0CBAB';
  if (i === 46) return '#8E44AD';
  // if (i === 21) return "#AF7AC5";
  // if (i === 22) return "#008080";
  // if (i === 23) return "#C70039";
  // if (i === 24) return "#16A085";
  // if (i === 25) return "#5D6D7E";
  // if (i === 26) return "#900C3F";
  // if (i === 27) return "#7F8C8D";
  // if (i === 28) return "#8E44AD";
  // if (i === 29) return "#AEB6BF";

  return '#FFD400';
}
function colorPicker1(i) {
  if (i % 29 === 0) return '#91664E';
  if (i % 29 === 1) return '#13A8BE';
  if (i % 29 === 2) return '#13A8BE'; // #FF6D00
  if (i % 29 === 3) return '#DE2693';
  if (i % 29 === 4) return '#B1B424';
  if (i % 29 === 5) return '#2196F3';
  if (i % 29 === 6) return '#B1B424'; // #4CE2A7
  if (i % 29 === 7) return '#1967A0';
  if (i % 29 === 8) return '#00C853';
  if (i % 29 === 9) return '#E11D3F'; // #651FFF
  if (i % 29 === 10) return '#FF6D00'; // #B71DE1
  if (i % 29 === 11) return '#DE2693'; // #FFCD00
  if (i % 29 === 12) return '#1F8AE4'; // #E11D3F
  if (i % 29 === 13) return '#FF1500';
  if (i % 29 === 14) return '#C5E11D';
  if (i % 29 === 15) return '#CDACF2';
  if (i % 29 === 16) return 'AFDE0E';
  if (i % 29 === 17) return '#FF5576';
  if (i % 29 === 18) return '#BFEDF5';
  if (i % 29 === 19) return '#E0CBAB';
  if (i % 29 === 25) return '#FF5E00';
  if (i % 29 === 21) return '#AF7AC5';
  if (i % 29 === 22) return '#008080';
  if (i % 29 === 23) return '#C70039';
  if (i % 29 === 24) return '#16A085';
  if (i % 29 === 25) return '#5D6D7E';
  if (i % 29 === 26) return '#900C3F';
  if (i % 29 === 27) return '#7F8C8D';
  if (i % 29 === 28) return '#8E44AD';
  if (i % 29 === 29) return '#AEB6BF';

  return '#FFD400';
}

function numberWithCommas(x) {
  if (x !== null) {
    const parts = x.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
  }
  return x;
}

const getInitials = title => {
  const initials = title
    .split(' ')
    .map(word => word[0])
    .join('');

  return initials;
};

// const getInitials = name => {
//   let initials = name.match(/\b\w/g) || [];
//   initials = (
//     (initials.shift() || '') + (initials.pop() || '')
//   ).toUpperCase();
//   return initials;
// };
class TreeMapDiagram extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // financialData: [],
      // checkedPartnerItems: [],
      isTreeMapClicked: false,
    };
  }

  componentDidMount() {
    const { activeModal } = this.props;
    if (activeModal) {
      const {
        financialReducer: {
          treeMapData,
          financialData,
          checkedPartnerItems,
        },
      } = this.props;

      this.setState({
        treeMapData1: treeMapData,
        financialData,
        checkedPartnerItems,
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      treeMapData,
      financialData,
      checkedPartnerItems,
    } = this.props.financialReducer;
    if (
      prevProps.financialReducer.treeMapData !==
      this.props.financialReducer.treeMapData
    ) {
      // this.props.setTreeMapBackBtnFalse();
      this.setState({
        treeMapData1: treeMapData,
        isTreeMapClicked: false,
      });
    }
    if (
      prevProps.financialReducer.financialData !==
      this.props.financialReducer.financialData
    ) {
      this.setState({ financialData });
    }
    if (
      prevProps.financialReducer.checkedPartnerItems !==
      this.props.financialReducer.checkedPartnerItems
    ) {
      this.setState({ checkedPartnerItems });
    }

    return true;
  }

  generateTreeMapData = id => {
    const arr = [];

    this.state.financialData.map(item => {
      if (id === item.program_name) {
        if (this.props.checkedPartnerItems.length === 0) {
          arr.push({
            id: item.partner_id,
            name: item.partner_name,
            name1: getInitials(item.partner_name),
            loc: item.value,
          });
        } else {
          this.props.checkedPartnerItems.map(i => {
            if (item.partner_id === i) {
              arr.push({
                id: item.partner_id,
                name: item.partner_name,
                name1: getInitials(item.partner_name),
                loc: item.value,
              });
            }
            return true;
          });
        }
      }
      return true;
    });

    // CALCULATE PERCENTAGE
    let total = 0;

    arr.map(item => {
      total += item.loc;
      return true;
    });

    arr.map((item, index) => {
      arr[index].percent = `${((item.loc / total) * 100).toFixed(
        1,
      )}%`;
      return true;
    });

    return { name: 'program1', children: arr };
  };

  onProgramClick = e => {
    const updatedTreeMapData = this.generateTreeMapData(e.data.id);
    // this.props.handleTreeMapBackBtn();
    this.setState(prevState => ({
      treeMapData2: updatedTreeMapData,
      isTreeMapClicked: !prevState.isTreeMapClicked,
    }));
  };

  gradientFunction = i => {
    const { treeMapData1, treeMapData2 } = this.state;
    const arr = [];
    const data = i === 1 ? treeMapData1 : treeMapData2;

    data.children.map((item, index) => {
      arr.push({
        id: `color${index}`,
        type: 'linearGradient',
        colors: [
          {
            offset: 100,
            color:
              i === 1 ? colorPicker1(item.id) : getColor(item.id),
          },
        ],
      });
      return true;
    });
    return arr;
  };

  fillFunction = i => {
    const { treeMapData1, treeMapData2 } = this.state;
    const arr = [];
    const data = i === 1 ? treeMapData1 : treeMapData2;

    data.children.map((item, index) => {
      arr.push({ match: { id: item.name }, id: `color${index}` });
      return true;
    });
    return arr;
  };

  handleTreeMapBackBtn = () => {
    this.setState(prevState => ({
      isTreeMapClicked: !prevState.isTreeMapClicked,
    }));
  };

  render() {
    // const { treeMapData } = this.props.financialReducer;
    const {
      treeMapData1,
      treeMapData2,
      checkedPartnerItems,
      isTreeMapClicked,
    } = this.state;

    const {
      DownloadIcon,
      ExpandIcon,
      downloadPng,
      handleModal,
      handleSelectedModal,
      activeModal,
      isDownloading,
      // isTreeMapClicked,
    } = this.props;

    const screenSize = window.innerWidth;

    let treeHeight;

    if (screenSize < 1600) {
      if (activeModal) treeHeight = '490px';
      else treeHeight = '340px';
    } else if (screenSize >= 1600) {
      if (activeModal) treeHeight = '600px';
      else treeHeight = '340px';
    }

    return (
      <>
        <div
          className="card-header"
          style={
            activeModal
              ? {
                  // display: activeModal ? 'none' : 'flex',
                  border: 'none',
                  padding: '0',
                  backgroundColor: '#fff',
                }
              : {}
          }
        >
          {!activeModal && (
            <h5>Contribution of Financial Literacy Initiatives</h5>
          )}
          {!isDownloading && (
            <div className="header-icons">
              {isTreeMapClicked && (
                <button
                  type="button"
                  id="chart-reset"
                  onClick={this.handleTreeMapBackBtn}
                  className="is-border common-button chart-reset"
                  style={
                    activeModal && {
                      position: 'absolute',
                      top: '36px',
                      // right: '62px',
                      right: '150px',
                    }
                  }
                >
                  Reset
                </button>
              )}
              {!activeModal && (
                <>
                  <span
                    className=""
                    onClick={() => {
                      downloadPng(
                        'chart-treemap',
                        'Contribution of Financial Literacy Initiatives',
                      );
                    }}
                    onKeyDown={() => {
                      downloadPng(
                        'chart-treemap',
                        'Contribution of Financial Literacy Initiatives',
                      );
                    }}
                    role="tab"
                    tabIndex="0"
                  >
                    <img src={DownloadIcon} alt="open" />
                  </span>
                  <span
                    className=""
                    role="tab"
                    tabIndex="0"
                    onClick={() => {
                      // eslint-disable-next-line no-unused-expressions
                      !isTreeMapClicked && handleModal();
                      !isTreeMapClicked &&
                        handleSelectedModal(
                          'tree',
                          'Contribution of Financial Literacy Initiatives',
                        );
                    }}
                    onKeyDown={() => {
                      handleModal();
                      handleSelectedModal('tree');
                    }}
                  >
                    <img src={ExpandIcon} alt="open" />
                  </span>
                </>
              )}
            </div>
          )}
        </div>
        <div className="card-body">
          <div
            id="treemap-chart"
            style={{
              // height: activeModal ? '490px' : '340px',
              height: treeHeight,
              width: '100%',
            }}
          >
            {!isTreeMapClicked ? (
              treeMapData1 && (
                <ResponsiveTreeMap
                  root={treeMapData1}
                  // root={root.root}
                  identity="name"
                  value="loc"
                  innerPadding={3}
                  outerPadding={3}
                  margin={{
                    top: 10,
                    right: 10,
                    bottom: 10,
                    left: 10,
                  }}
                  label="name"
                  leavesOnly
                  // orientLabel={false}
                  // labelFormat=".0s"
                  // labelSkipSize={12}
                  // labelTextColor={{
                  //   from: 'color',
                  //   modifiers: [['darker', 1.2]],
                  // }}
                  labelTextColor="#fff"
                  // colors={{ scheme: 'nivo' }}
                  defs={this.gradientFunction(1)}
                  fill={this.fillFunction(1)}
                  borderColor="#fff"
                  animate
                  motionStiffness={90}
                  motionDamping={11}
                  onClick={this.onProgramClick}
                  tooltip={({ id, value, color, data }) => (
                    <div
                      style={{
                        // color: '#fff',
                        color: '#000',
                        textAlign: 'center',
                        margin: '0px 15px',
                      }}
                    >
                      <strong>
                        {id}
                        <br />
                        {`${numberWithCommas(value)} (${
                          data.percent
                        })`}
                      </strong>
                    </div>
                  )}
                  theme={{
                    tooltip: {
                      container: {
                        background: '#fff',
                      },
                    },
                    fontSize: '14px',
                    fontFamily: 'Avenir Book',
                    transition: 'opacity',
                  }}
                />
              )
            ) : (
              <ResponsiveTreeMap
                root={treeMapData2}
                // root={root.root}
                identity="name"
                value="loc"
                innerPadding={3}
                outerPadding={3}
                margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
                label="name1"
                leavesOnly
                // orientLabel={false}
                // labelFormat=".0s"
                // labelSkipSize={12}
                // labelTextColor={{
                //   from: 'color',
                //   modifiers: [['darker', 1.2]],
                // }}
                labelTextColor="#fff"
                // colors={{ scheme: 'nivo' }}
                defs={this.gradientFunction(2)}
                fill={this.fillFunction(2)}
                borderColor="#fff"
                animate
                motionStiffness={90}
                motionDamping={11}
                // onClick={this.onProgramClick}
                tooltip={({ id, value, color, data }) => (
                  <div
                    style={{
                      // color: '#fff',
                      color: 'black',
                      textAlign: 'center',
                      // margin: '0px 15px',
                    }}
                  >
                    <strong>
                      {id}
                      <br />
                      {`${numberWithCommas(value)} (${data.percent})`}
                    </strong>
                  </div>
                )}
                theme={{
                  tooltip: {
                    container: {
                      background: '#fff',
                    },
                  },
                  fontSize: '14px',
                  fontFamily: 'Avenir Book',
                }}
              />
            )}
          </div>
        </div>
      </>
    );
  }
}
const mapStateToProps = ({ financialReducer }) => ({
  financialReducer,
});
export default connect(mapStateToProps, {})(TreeMapDiagram);
