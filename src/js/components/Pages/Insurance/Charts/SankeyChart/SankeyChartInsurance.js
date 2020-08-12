/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { ResponsiveSankey } from '@nivo/sankey';
// import sankeyData from '../../../FinancialLiteracy/Charts/sankey.data';

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

  data.forEach((item, index) => {
    const obj1 = nodes.find(obj => obj.id === item.partner_name);
    const obj2 = nodes.find(obj => obj.id === item.innovation);
    const obj3 = nodes.find(obj => obj.id === item.product);
    if (!obj1) {
      nodes.push({
        id: index,
        name: item.partner_name,
      });
    }
    if (!obj2) {
      nodes.push({
        id: index,
        name: item.innovation,
      });
    }
    if (!obj3) {
      nodes.push({
        id: index,
        name: item.product,
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

  return { nodes, links };
}

class SankeyChartInsurance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sankeyData: {},
    };
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

    return (
      <div style={{ height: '750px' }}>
        {Object.entries(sankeyData).length !== 0 && (
          <ResponsiveSankey
            data={sankeyData}
            margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
            align="justify"
            colors={{ scheme: 'category10' }}
            nodeOpacity={1}
            nodeThickness={18}
            nodeInnerPadding={3}
            nodeSpacing={14}
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
        )}
      </div>
    );
  }
}

export default SankeyChartInsurance;
