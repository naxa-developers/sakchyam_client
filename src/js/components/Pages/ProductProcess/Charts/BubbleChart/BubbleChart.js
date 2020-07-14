import React from 'react';
import { connect } from 'react-redux';
import { ResponsiveBubble } from '@nivo/circle-packing';
// import data from './bubblechart.data';
import { getProductProcessList } from '../../../../../actions/productProcess.actions';
import BubbleLegend from './BubbleLegend';

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

    const { activeModal } = this.props;

    const colors = {
      // '#B1B424',#e11d3f  #13a8be #de2693 #ff6d00 #de2693 #b1b424
      // '#2196F3',
      bubble: '#f7e5f3',
      innovation_area: '#e6294a', // '#e11d3f',
      product_category: '#f2cb3f', // '#f4a535',
      partner_type: '#19b5bd', //  '#13a8be',
      partner_name: '#de2693',
    };

    const legendItems = [
      { label: 'Innovation Area', fill: '#e6294a' },
      { label: 'Product Category', fill: '#f2cb3f' },
      { label: 'Partner Type', fill: '#19b5bd' },
      { label: 'Partners', fill: '#de2693' },
    ];

    const getColor = color => colors[color.id];

    return (
      <>
        <div
          style={{
            height: !activeModal ? '400px' : '665px',
            width: 'auto',
          }}
        >
          {bubbleChartData && bubbleChartData.children.length !== 0 && (
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
              borderWidth={1.2}
              borderColor={{
                from: 'color',
                // modifiers: [['darker', 0.8]],
                modifiers: [['darker', 0.6]],
              }}
              defs={[
                {
                  id: '0',
                  type: 'linearGradient',
                  colors: [
                    {
                      color: 'inherit',
                      opacity: 0.5,
                    },
                  ],
                },
                {
                  id: '1',
                  type: 'linearGradient',
                  colors: [
                    {
                      color: 'inherit',
                      opacity: 1.8,
                    },
                  ],
                },
                {
                  id: '2',
                  type: 'linearGradient',
                  colors: [
                    {
                      color: 'inherit',
                      opacity: 0.9,
                    },
                  ],
                },
                {
                  id: '3',
                  type: 'linearGradient',
                  colors: [
                    {
                      color: 'inherit',
                      opacity: 0.7,
                    },
                  ],
                },
              ]}
              fill={[
                { match: { depth: 0 }, id: '0' },
                { match: { depth: 1 }, id: '1' },
                { match: { depth: 2 }, id: '2' },
                { match: { depth: 3 }, id: '3' },
              ]}
              animate
              motionStiffness={90}
              motionDamping={12}
            />
          )}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {legendItems.map(legend => {
            return (
              <BubbleLegend
                radius={6}
                fill={legend.fill}
                label={legend.label}
              />
            );
          })}
        </div>
      </>
    );
  }
}

const mapStateToProps = ({ productProcessReducer }) => ({
  productProcessReducer,
});

export default connect(mapStateToProps, { getProductProcessList })(
  BubbleChart,
);
