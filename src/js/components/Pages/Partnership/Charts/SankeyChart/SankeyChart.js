import React, { Component } from 'react';
import { ResponsiveSankey } from '@nivo/sankey';
import { connect } from 'react-redux';
import sankeyData from './sankeyData';
import { getSankeyChartData } from '../../../../../actions/partnership.actions';

function numberWithCommas(x) {
  if (x !== null) {
    const parts = x.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
  }
  return x;
}

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
  componentDidMount() {
    // this.props.getSankeyChartData();
    setTimeout(() => {
      this.props.getSankeyChartData();
    }, 500);
  }

  render() {
    const {
      state: { overView },
      props: { activeOverview, cardWidth },
    } = this;
    const {
      partnershipReducer: { sankeyChartData },
    } = this.props;
    return (
      <div style={{ height: '800px' }}>
        {sankeyChartData.nodes && (
          <ResponsiveSankey
            data={sankeyChartData}
            margin={{ top: 40, right: 20, bottom: 40, left: 20 }}
            // width={
            //   this.props.activeModal
            //     ? 1600
            //     : showRightSidebar && window.innerWidth < 1600
            //     ? 780
            //     : showRightSidebar && window.innerWidth > 1600
            //     ? 1100
            //     : !showRightSidebar && window.innerWidth < 1600
            //     ? 1100
            //     : 1400
            // }
            // width={780}
            align="justify"
            colors={{ scheme: 'nivo' }}
            // colors={sankeyChartData}
            nodeOpacity={1}
            nodeThickness={18}
            nodeInnerPadding={3}
            nodeSpacing={24}
            nodeBorderWidth={0}
            nodeBorderColor={{
              from: 'color',
              modifiers: [['darker', 0.8]],
            }}
            linkOpacity={0.7}
            linkHoverOthersOpacity={0.1}
            enableLinkGradient
            labelPosition="inside"
            labelOrientation="horizontal"
            labelPadding={16}
            labelTextColor={{
              from: 'color',
              modifiers: [['darker', 1.5]],
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
          // <ResponsiveSankey
          //   data={sankeyChartData}
          //   enableLabels={false}
          //   margin={{ top: 40, right: 20, bottom: 40, left: 20 }}
          //   //   height={400}
          //   width={
          //     activeOverview && window.innerWidth < 1600
          //       ? 1000
          //       : activeOverview && window.innerWidth > 1600
          //       ? 1500
          //       : !activeOverview && window.innerWidth < 1600
          //       ? 800
          //       : !activeOverview && window.innerWidth > 1600
          //       ? 1200
          //       : 1000
          //   }
          //   align="justify"
          //   colors={{ scheme: 'category10' }}
          //   nodeOpacity={1}
          //   nodeThickness={18}
          //   nodeInnerPadding={3}
          //   nodeSpacing={24}
          //   nodeBorderWidth={0}
          //   nodeBorderColor={{
          //     from: 'color',
          //     modifiers: [['darker', 0.8]],
          //   }}
          //   linkOpacity={0.5}
          //   linkHoverOthersOpacity={0.1}
          //   enableLinkGradient
          //   labelPosition="outside"
          //   labelOrientation="vertical"
          //   labelPadding={16}
          //   labelTextColor={{
          //     from: 'color',
          //     modifiers: [['darker', 1]],
          //   }}
          //   animate
          //   motionStiffness={140}
          //   motionDamping={13}
          //   // legends={[
          //   //   {
          //   //     anchor: 'bottom-right',
          //   //     direction: 'column',
          //   //     translateX: 130,
          //   //     itemWidth: 100,
          //   //     itemHeight: 14,
          //   //     itemDirection: 'right-to-left',
          //   //     itemsSpacing: 2,
          //   //     itemTextColor: '#999',
          //   //     symbolSize: 14,
          //   //     effects: [
          //   //       {
          //   //         on: 'hover',
          //   //         style: {
          //   //           itemTextColor: '#000',
          //   //         },
          //   //       },
          //   //     ],
          //   //   },
          //   // ]}
          // />
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ partnershipReducer }) => ({
  partnershipReducer,
});
export default connect(mapStateToProps, { getSankeyChartData })(
  SankeyChart,
);
