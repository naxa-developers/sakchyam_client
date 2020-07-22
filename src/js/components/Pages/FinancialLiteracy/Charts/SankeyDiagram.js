import React, { Component } from 'react';
import { ResponsiveSankey } from '@nivo/sankey';
import { connect } from 'react-redux';
import data from './sankey.data';
import Modal from '../Modal';

function numberWithCommas(x) {
  if (x !== null) {
    const parts = x.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
  }
  return x;
}

const color1 = [
  '#91664E',
  '#13A8BE',
  '#13A8BE', // #FF6D00
  '#DE2693',
  '#B1B424',
  '#2196F3',
  '#B1B424', // #4CE2A7
  '#1967A0',
  '#00C853',
  '#E11D3F', // #651FFF
  '#FF6D00', // #B71DE1
  '#DE2693', // #FFCD00
  '#1F8AE4', // #E11D3F
  '#FF1500',
  '#C5E11D',
  '#CDACF2',
  'AFDE0E',
  '#FF5576',
  '#BFEDF5',
  '#E0CBAB',
  '#FF5E00',
];
class SankeyDiagram extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // sankeyData: {},
    };
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log(
    //   prevProps.financialReducer.sankeyData ===
    //     this.props.financialReducer.sankeyData,
    //   'prevSankeydata',
    // );
    // console.log(
    //   prevProps.financialReducer.sankeyData.nodes ===
    //     this.props.financialReducer.sankeyData.nodes,
    //   'nodes Compare',
    // );
  }

  render() {
    const {
      financialReducer: { sankeyData },
    } = this.props;

    const sankeyColor =
      Object.entries(sankeyData).length !== 0 &&
      sankeyData.nodes.map(node => node.color);
    const { showRightSidebar } = this.props;
    const width = window.innerWidth;
    return (
      <div id="sankey-chart" style={{ height: '750px' }}>
        {Object.entries(sankeyData).length !== 0 ? (
          sankeyData.nodes.length !== 0 ? (
            <ResponsiveSankey
              data={sankeyData}
              margin={{ top: 40, right: 20, bottom: 40, left: 20 }}
              width={
                this.props.activeModal
                  ? 1400
                  : showRightSidebar && window.innerWidth < 1600
                  ? 780
                  : showRightSidebar && window.innerWidth > 1600
                  ? 1100
                  : !showRightSidebar && window.innerWidth < 1600
                  ? 1100
                  : 1400
              }
              // width={780}
              align="justify"
              // colors={{ scheme: 'nivo' }}
              colors={sankeyColor}
              nodeOpacity={1}
              nodeThickness={18}
              nodeInnerPadding={3}
              nodeSpacing={15}
              nodeBorderWidth={0}
              nodeBorderColor={{
                from: 'color',
                modifiers: [['darker', 0.8]],
              }}
              sort="auto"
              linkOpacity={0.7}
              linkHoverOthersOpacity={0.1}
              enableLinkGradient
              // linkBlendMode="multiple"
              labelPosition="inside"
              labelOrientation="horizontal"
              labelPadding={16}
              labelTextColor={{
                from: 'color',
                modifiers: [['darker', 2]],
              }}
              // labelTextColor="black"
              theme={{
                fontSize: '14px',
                fontFamily: 'Avenir Book',
              }}
              animate
              motionStiffness={140}
              motionDamping={13}
              tooltipFormat={value => numberWithCommas(value)}
              nodeTooltip={node => (
                <span style={{ display: 'flex' }}>
                  <div
                    style={{
                      margin: '1px',
                      marginRight: '5px',
                      marginTop: '5px',
                      height: '15px',
                      width: '15px',
                      backgroundColor: node.color,
                    }}
                  />
                  <strong
                    style={{
                      // color: '#fff',
                      textAlign: 'center',
                      // margin: '0px 15px',
                    }}
                  >
                    {node.id}
                    <br />
                    {numberWithCommas(node.value)}
                  </strong>
                </span>
              )}
            />
          ) : (
            <label>No Data</label>
          )
        ) : (
          <label>Nodata</label>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ financialReducer }) => ({
  financialReducer,
});
export default connect(mapStateToProps, {})(SankeyDiagram);

const word = 'hello world';
