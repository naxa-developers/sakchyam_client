/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { ResponsiveSankey } from '@nivo/sankey';
import sankeyData from '../../../FinancialLiteracy/Charts/sankey.data';

class SankeyChartInsurance extends Component {
  render() {
    return (
      <div style={{ height: '750px' }}>
        <ResponsiveSankey
          data={sankeyData}
          margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
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
        />
      </div>
    );
  }
}

export default SankeyChartInsurance;
