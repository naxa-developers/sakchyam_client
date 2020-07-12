import React from 'react';
import { connect } from 'react-redux';
import { ResponsiveBubble } from '@nivo/circle-packing';
import data from './bubblechart.data';
import { getProductProcessList } from '../../../../../actions/productProcess.actions';

const commonProperties = {
  width: 900,
  height: 500,
  identity: 'name',
  value: 'loc',
  label: 'name',
  labelSkipRadius: 16,
};

class BubbleChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      productProcessReducer: { bubbleChartData },
    } = this.props;
  }

  render() {
    const {
      productProcessReducer: { bubbleChartData },
    } = this.props;

    const colors = {
      // '#B1B424',#e11d3f  #13a8be #de2693 #ff6d00 #de2693 #b1b424
      // '#2196F3',
      bubble: '#f7e5f3',
      innovation_area: '#e11d3f',
      product_category: '#f4a535',
      partner_type: '#13a8be',
      partner_name: '#de2693',
    };
    const getColor = color => colors[color.id];

    return (
      <div style={{ height: '400px', width: 'auto' }}>
        {bubbleChartData && (
          <ResponsiveBubble
            // root={data}
            root={bubbleChartData}
            margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
            identity="name"
            value="value"
            // colors={{ scheme: 'nivo' }}
            colors={getColor}
            padding={9}
            label="name"
            // labelSkipRadius="0"
            labelTextColor={{
              from: 'color',
              modifiers: [['darker', 0.8]],
            }}
            // borderWidth={2}
            borderColor={{ from: 'color' }}
            // defs={[
            //   {
            //     id: 'lines',
            //     type: 'patternLines',
            //     background: 'none',
            //     color: 'inherit',
            //     rotation: -45,
            //     lineWidth: 5,
            //     spacing: 8,
            //   },
            // ]}
            // fill={[{ match: { depth: 1 }, id: 'lines' }]}
            animate
            motionStiffness={90}
            motionDamping={12}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ productProcessReducer }) => ({
  productProcessReducer,
});

export default connect(mapStateToProps, { getProductProcessList })(
  BubbleChart,
);
