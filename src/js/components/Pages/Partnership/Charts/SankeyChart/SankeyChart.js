import React, { Component } from 'react';
import { ResponsiveSankey } from '@nivo/sankey';
import sankeyData from './sankeyData';
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
class SankeyChart extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  //   // eslint-disable-next-line camelcase
  //   UNSAFE_componentWillReceiveProps({ someProp }) {
  //     const { activeOverview } = this.props;
  //     this.setState({ overView: activeOverview });
  //   }

  render() {
    const {
      state: { overView },
      props: { activeOverview, cardWidth },
    } = this;
    return (
      <div style={{ height: '800px' }}>
        <ResponsiveSankey
          data={sankeyData}
          margin={{ top: 40, right: 20, bottom: 40, left: 20 }}
          //   height={400}
          width={
            activeOverview && window.innerWidth < 1600
              ? 1000
              : activeOverview && window.innerWidth > 1600
              ? 1500
              : !activeOverview && window.innerWidth < 1600
              ? 800
              : !activeOverview && window.innerWidth > 1600
              ? 1200
              : 1000
          }
          align="justify"
          colors={{ scheme: 'category10' }}
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
          labelPosition="outside"
          labelOrientation="vertical"
          labelPadding={16}
          labelTextColor={{
            from: 'color',
            modifiers: [['darker', 1]],
          }}
          animate
          motionStiffness={140}
          motionDamping={13}
          legends={[
            {
              anchor: 'bottom-right',
              direction: 'column',
              translateX: 130,
              itemWidth: 100,
              itemHeight: 14,
              itemDirection: 'right-to-left',
              itemsSpacing: 2,
              itemTextColor: '#999',
              symbolSize: 14,
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemTextColor: '#000',
                  },
                },
              ],
            },
          ]}
        />
      </div>
    );
  }
}

export default SankeyChart;
