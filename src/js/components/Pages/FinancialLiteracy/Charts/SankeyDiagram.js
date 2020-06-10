import React, { Component } from 'react';
import { ResponsiveSankey } from '@nivo/sankey';
import { connect } from 'react-redux';
import data from './sankey.data';

class SankeyDiagram extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { sankeyData } = this.props.financialReducer;
    // console.log('sankeyData', sankeyData);
    return (
      <div
        id="sankey-chart"
        style={{ height: '800px', width: 'auto' }}
      >
        {Object.entries(sankeyData).length !== 0 && (
          <ResponsiveSankey
            data={sankeyData}
            margin={{ top: 40, right: 160, bottom: 40, left: 50 }}
            align="justify"
            colors={{ scheme: 'nivo' }}
            // colors={customColor2}
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
