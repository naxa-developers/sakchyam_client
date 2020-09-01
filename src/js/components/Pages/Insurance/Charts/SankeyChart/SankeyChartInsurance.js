/* eslint-disable react/jsx-indent */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { ResponsiveSankey } from '@nivo/sankey';
import { isArrayEmpty } from '../../../../utils/utilities';
import BoxLoader from '../Loader/Loader';

function numberWithCommas(x) {
  if (x !== null) {
    const parts = x.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
  }
  return x;
}

function correctSankeyChartData(data) {
  const nodes = [];
  const links = [];

  data.nodes.forEach((item, index) => {
    nodes.push({
      id: index + 1,
      name: item.id,
    });
  });

  function getID(name) {
    let id;
    nodes.forEach(item => {
      if (item.name === name) id = item.id;
    });
    return id;
  }

  data.links.forEach(item => {
    links.push({
      source: getID(item.source),
      target: getID(item.target),
      value: item.value,
    });
  });

  return { nodes, links };
}

function generateSankeyData(data) {
  const nodes = [];
  const links = [];

  function getCount1(partner, innovation) {
    const filteredData = data.filter(
      item =>
        item.partner_name === partner &&
        item.innovation === innovation,
    );
    const count = filteredData.reduce(
      (sum, item) => sum + item.number_of_insurance_sold,
      0,
    );
    return count;
  }

  function getCount2(innovation, product) {
    const filteredData = data.filter(
      item =>
        item.product === product && item.innovation === innovation,
    );
    const count = filteredData.reduce(
      (sum, item) => sum + item.number_of_insurance_sold,
      0,
    );
    return count;
  }

  data.forEach(item => {
    const obj1 = nodes.find(obj => obj.id === item.partner_name);
    const obj2 = nodes.find(obj => obj.id === item.innovation);
    const obj3 = nodes.find(obj => obj.id === item.product);
    if (!obj1) {
      nodes.push({
        id: item.partner_name,
      });
    }
    if (!obj2) {
      nodes.push({
        id: item.innovation,
      });
    }
    if (!obj3) {
      nodes.push({
        id: item.product,
      });
    }
    const obj4 = links.find(
      obj =>
        obj.source === item.partner_name &&
        obj.target === item.innovation,
    );
    const obj5 = links.find(
      obj =>
        obj.source === item.innovation && obj.target === item.product,
    );
    if (!obj4)
      links.push({
        source: item.partner_name,
        target: item.innovation,
        value: getCount1(item.partner_name, item.innovation),
      });

    if (!obj5)
      links.push({
        source: item.innovation,
        target: item.product,
        value: getCount2(item.innovation, item.product),
      });
  });
  const newData = { nodes, links };

  const sankeyData = correctSankeyChartData(newData);

  return sankeyData;
}

class SankeyChartInsurance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sankeyData: {},
    };
  }

  componentDidMount() {
    const { activeModal, insuranceData } = this.props;
    if (activeModal) this.getSankeyData(insuranceData);
  }

  componentDidUpdate(prevProps, prevState) {
    const { insuranceData } = this.props;

    if (insuranceData !== prevProps.insuranceData) {
      this.getSankeyData();
    }
  }

  getSankeyData = () => {
    const { insuranceData } = this.props;

    const sankeyData = generateSankeyData(insuranceData);
    this.setState({ sankeyData });
  };

  render() {
    const { sankeyData } = this.state;
    const { activeModal, showRightSidebar, loading } = this.props;

    return (
      <div
        style={{
          // height: window.innerHeight < 1400 ? '600px' : '750px',
          height: !activeModal
            ? 600
            : activeModal && window.innerWidth < 1400
            ? 520
            : 800,
        }}
        id="insurance-sankey"
      >
        {loading ? (
          <BoxLoader height={450} />
        ) : Object.entries(sankeyData).length !== 0 &&
          sankeyData.nodes.length !== 0 ? (
          <ResponsiveSankey
            data={sankeyData}
            margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
            // height={
            //   !activeModal
            //     ? 400
            //     : activeModal && window.innerWidth < 1400
            //     ? 400
            //     : 700
            // }
            // width={600}
            // {
            //   activeModal && window.innerWidth < 1600
            //     ? 1200
            //     : activeModal && window.innerWidth > 1600
            //     ? 1800
            //     : showRightSidebar && window.innerWidth < 1600
            //     ? 850
            //     : showRightSidebar && window.innerWidth > 1600
            //     ? 1200
            //     : !showRightSidebar && window.innerWidth < 1600
            //     ? 1080
            //     : 1530
            // }
            label="name"
            align="end"
            colors={{ scheme: 'set2' }}
            sort="descending"
            nodeOpacity={1}
            nodeThickness={14}
            nodePaddingX={6}
            nodeWidth={24}
            nodeBorderWidth={0}
            nodeInnerPadding={2}
            nodeSpacing={18}
            nodeBorderColor={{
              from: 'color',
              modifiers: [['darker', 0.8]],
            }}
            linkOpacity={1}
            linkHoverOthersOpacity={0.1}
            enableLinkGradient
            colorBy={node => node.nodeColor}
            linkBlendMode="normal"
            labelPosition="inside"
            labelOrientation="horizontal"
            labelPadding={14}
            labelTextColor={{
              from: 'color',
              modifiers: [['darker', 2]],
            }}
            theme={{
              fontSize: '14px',
              fontFamily: 'Avenir Book',
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
                  {node.name}
                  <br />
                  {numberWithCommas(node.value)}
                </strong>
              </span>
            )}
          />
        ) : (
          <div id="no-data">
            <label>No data</label>
          </div>
        )}
      </div>
    );
  }
}

export default SankeyChartInsurance;
