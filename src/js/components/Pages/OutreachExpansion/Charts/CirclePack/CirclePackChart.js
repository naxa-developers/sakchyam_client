import React, { Component } from 'react';
import { ResponsiveBubble } from '@nivo/circle-packing';
import circlePackData from './circlepackData';
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
class CirclePackChart extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div style={{ height: '365px' }}>
        <ResponsiveBubble
          root={circlePackData}
          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
          identity="name"
          value="loc"
          colors={{ scheme: 'nivo' }}
          padding={6}
          labelTextColor={{
            from: 'color',
            modifiers: [['darker', 0.8]],
          }}
          borderWidth={2}
          borderColor={{ from: 'color' }}
          defs={[
            {
              id: 'lines',
              type: 'patternLines',
              background: 'none',
              color: 'inherit',
              rotation: -45,
              lineWidth: 5,
              spacing: 8,
            },
          ]}
          fill={[{ match: { depth: 1 }, id: 'lines' }]}
          animate
          motionStiffness={90}
          motionDamping={12}
        />
      </div>
    );
  }
}

export default CirclePackChart;
