/* eslint-disable react/no-unused-state */
/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { connect } from 'react-redux';
import { ResponsiveBubble } from '@nivo/circle-packing';
// import data from './bubblechart.data';
import { getProductProcessList } from '../../../../../actions/productProcess.actions';
import BubbleLegend from './BubbleLegend';

class BubbleChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tooltipData: [],
    };
  }

  generateTooltipData(data) {
    const arr = [];
    data.forEach(item => {
      // const obj = arr.some(x => x.product === item.product_name);
      const obj = arr.some(
        x =>
          x.product === item.product_name &&
          x.partner_type === item.partner_type,
      );
      if (!obj)
        arr.push({
          product: item.product_name,
          partner: [item.partner_name],
          partner_type: item.partner_type,
        });
      else {
        const objIndex = arr.findIndex(
          i => i.product === item.product_name,
        );
        arr[objIndex].partner.push(item.partner_name);
      }
    });

    this.setState({ tooltipData: arr });
  }

  handletooltip = () => {
    return 'tooltip';
  };

  componentDidUpdate(prevProps, prevState) {
    const {
      productProcessReducer: { bubbleChartData, allData },
    } = this.props;

    if (prevProps.productProcessReducer.allData !== allData)
      this.generateTooltipData(allData);
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
      { label: 'Product', fill: '#de2693' },
    ];

    const getColor = color => colors[color.id];

    let height = 425;
    let width = 425;

    if (activeModal) {
      if (window.innerWidth > 1600) {
        height = 900;
        width = 1500;
      } else if (window.innerWidth < 1600) {
        height = 550;
        width = 1000;
      } else if (window.innerWidth < 1400) {
        height = 500;
        width = 900;
      }
    } else {
      height = 400;
    }

    return (
      <>
        <div
          style={{
            // height: !activeModal ? '400px' : '665px',
            height: !activeModal
              ? 400
              : activeModal && window.innerWidth < 1400
              ? 480
              : 700,
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
              // tooltip={props => {
              //   console.log(props);
              //   // console.log(id, 'id');
              //   // console.log(value, 'value');
              //   // console.log(color, 'color');
              //   // console.log(y, 'y');
              // }}
              tooltip={props => {
                console.log(props);
                const { id, value, color } = props;
                return (
                  <span style={{ display: 'flex', padding: '15px' }}>
                    {/* <strong> */}
                    {/* {id}: {value} */}
                    {color !== '#de2693' ? (
                      <>
                        <div
                          style={{
                            margin: '1px',
                            marginRight: '5px',
                            marginTop: '5px',
                            height: '15px',
                            width: '15px',
                            backgroundColor: color,
                          }}
                        />
                        <strong>
                          {id}: {value}
                        </strong>
                      </>
                    ) : (
                      this.state.tooltipData.map(item => {
                        // console.log(item, 'item Product Process');
                        if (
                          id === item.product &&
                          props.parent.id === item.partner_type
                        )
                          // return `${id} Partner: (${item.partner})`;
                          return (
                            <strong>
                              {/* `${id}${'\n'} Partner: ${item.partner}` */}
                              <span
                                style={{
                                  position: 'absolute',
                                  left: 0,
                                  right: 0,
                                  textAlign: 'center',
                                  color: 'red',
                                }}
                              >
                                Product Name
                              </span>
                              <br />
                              {id} <br />
                              <span
                                style={{
                                  color: 'red',
                                  display: 'flex',
                                  justifyContent: 'center',
                                }}
                              >
                                Partner:
                              </span>
                              <ul style={{ listStyle: 'disc' }}>
                                {item.partner.map(data => (
                                  <li>{data}</li>
                                ))}
                              </ul>
                            </strong>
                          );
                        return true;
                      })
                    )}
                    {/* {this.state.tooltipData.map(item => {
                      let a;
                      if (id !== item.product) {
                        a = true;
                        return a;
                      }
                      a = false;
                      return a;
                    })
                      ? `${id}: ${value}`
                      : 'hi'} */}
                    {/* </strong> */}
                  </span>
                );
              }}
              theme={{
                tooltip: {
                  container: {
                    background: '#fff',
                  },
                },
              }}
            />
          )}
        </div>
        <div
          className="pie-legend"
          style={{
            display: activeModal ? 'flex' : '',
            justifyContent: 'center',
          }}
        >
          {bubbleChartData &&
            bubbleChartData.children.length > 0 &&
            legendItems.map(legend => {
              return (
                <BubbleLegend
                  // key={}
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
