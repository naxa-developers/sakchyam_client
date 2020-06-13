import React, { Component } from 'react';
import { ResponsiveSankey } from '@nivo/sankey';
import { connect } from 'react-redux';
import data from './sankey.data';
import Modal from '../Modal';

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
    this.state = {};
  }

  componentDidUpdate(prevProps, prevsteat) {
    console.log(
      prevProps.financialReducer.sankeyData ===
        this.props.financialReducer.sankeyData,
      'prevSankeydata',
    );
    console.log(
      prevProps.financialReducer.sankeyData.nodes ===
        this.props.financialReducer.sankeyData.nodes,
      'nodes Compare',
    );
  }

  render() {
    const { sankeyData } = this.props.financialReducer;
    // console.log(sankeyData, 'sankeydata');
    // const customColor =
    //   Object.entries(sankeyData).length !== 0 &&
    //   sankeyData.nodes.map(node => node.color);
    // console.log('sankeyData11', JSON.stringify(sankeyData));
    console.log(sankeyData, 'sankeyData ');
    return (
      <div id="sankey-chart" style={{ height: '800px' }}>
        {Object.entries(sankeyData).length !== 0 ? (
          sankeyData.nodes.length !== 0 ? (
            <ResponsiveSankey
              data={sankeyData}
              margin={{ top: 40, right: 20, bottom: 40, left: 20 }}
              align="justify"
              // colors={{ scheme: 'nivo' }}
              colors={color1}
              nodeOpacity={1}
              nodeThickness={18}
              nodeInnerPadding={3}
              nodeSpacing={24}
              nodeBorderWidth={0}
              nodeBorderColor={{
                from: 'color',
                modifiers: [['darker', 0.8]],
              }}
              linkOpacity={0.5}
              linkHoverOthersOpacity={0.1}
              enableLinkGradient
              labelPosition="inside"
              labelOrientation="horizontal"
              labelPadding={16}
              labelTextColor={{
                from: 'color',
                modifiers: [['darker', 1]],
              }}
              animate
              motionStiffness={140}
              motionDamping={13}
              nodeTooltip={node => (
                <strong
                  style={{
                    // color: '#fff',
                    textAlign: 'center',
                    // margin: '0px 15px',
                  }}
                >
                  {node.id}
                  <br />
                  {node.value}
                </strong>
              )}
            />
          ) : (
            <label>2nd Condition</label>
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
