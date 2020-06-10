import React, { Component } from 'react';
import { ResponsiveSankey } from '@nivo/sankey';
import { connect } from 'react-redux';
import data from './sankey.data';

const color1 = [
  '#91664E',
  '#13A8BE',
  '#FF6D00',
  '#DE2693',
  '#B1B424',
  '#2196F3',
  '#4CE2A7',
  '#1967A0',
  '#00C853',
  '#651FFF',
  '#B71DE1',
  '#FFCD00',
  '#E11D3F',
  '#FF1500',
  '#C5E11D',
  '#CDACF2',
  'AFDE0E',
  'sFF5576',
  '#BFEDF5',
  '#E0CBAB',
  '#FF5E00',
];
class SankeyDiagram extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { sankeyData } = this.props.financialReducer;
    // console.log('sankeyData11', JSON.stringify(sankeyData));
    return (
      <div style={{ height: '800px' }}>
        {Object.entries(sankeyData).length !== 0 && (
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
            // legends={[
            //   {
            //     anchor: 'bottom-right',
            //     direction: 'column',
            //     translateX: 130,
            //     itemWidth: 100,
            //     itemHeight: 14,
            //     itemDirection: 'right-to-left',
            //     itemsSpacing: 2,
            //     itemTextColor: '#999',
            //     symbolSize: 14,
            //     effects: [
            //       {
            //         on: 'hover',
            //         style: {
            //           itemTextColor: '#000',
            //         },
            //       },
            //     ],
            //   },
            // ]}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ financialReducer }) => ({
  financialReducer,
});
export default connect(mapStateToProps, {})(SankeyDiagram);
