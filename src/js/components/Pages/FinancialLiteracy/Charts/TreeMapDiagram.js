/* eslint-disable react/no-did-update-set-state */
import React, { Component } from 'react';
import { ResponsiveTreeMap } from '@nivo/treemap';
import { connect } from 'react-redux';
import root from './treemap.data';

class TreeMapDiagram extends Component {
  constructor(props) {
    super(props);
    this.state = {
      treeMapData: {},
      financialData: [],
      checkedPartnerItems: [],
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      treeMapData,
      financialData,
      checkedPartnerItems,
    } = this.props.financialReducer;
    if (
      prevProps.financialReducer.treeMapData !==
      this.props.financialReducer.treeMapData
    ) {
      this.setState({ treeMapData });
    }
    if (
      prevProps.financialReducer.financialData !==
      this.props.financialReducer.financialData
    ) {
      this.setState({ financialData });
    }
    if (
      prevProps.financialReducer.checkedPartnerItems !==
      this.props.financialReducer.checkedPartnerItems
    ) {
      this.setState({ checkedPartnerItems });
    }

    return true;
  }

  generateTreeMapData = id => {
    const arr = [];
    console.log(this.state.financialData, 'financialData1');
    this.state.financialData.map(item => {
      if (id === item.program_id) {
        if (this.props.checkedPartnerItems.length === 0) {
          arr.push({
            id: item.partner_id,
            name: item.partner_name,
            loc: item.value,
          });
          return true;
        }
        this.props.checkedPartnerItems.map(i => {
          if (item.partner_id === i) {
            arr.push({
              id: item.partner_id,
              name: item.partner_name,
              loc: item.value,
            });
          }
          return true;
        });
      }
      return true;
    });
    console.log(arr, 'myarr');
    return { name: 'program1', children: arr };
  };

  onProgramClick = e => {
    const updatedTreeMapData = this.generateTreeMapData(e.data.id);
    this.setState({
      treeMapData: updatedTreeMapData,
    });
  };

  render() {
    // const { treeMapData } = this.props.financialReducer;
    const { treeMapData, checkedPartnerItems } = this.state;

    console.log('treeMapdiagram component', this.state.treeMapData);

    return (
      <div
        id="treemap-chart"
        style={{ height: '340px', width: '100%' }}
      >
        {treeMapData && Object.entries(treeMapData).length !== 0 && (
          <ResponsiveTreeMap
            root={treeMapData}
            // root={root.root}
            identity="id"
            value="loc"
            innerPadding={3}
            outerPadding={3}
            margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
            label="name"
            // labelFormat=".0s"
            labelSkipSize={12}
            labelTextColor={{
              from: 'color',
              modifiers: [['darker', 1.2]],
            }}
            colors={{ scheme: 'nivo' }}
            // colors={{ scheme: 'nivo' }}
            borderColor={{
              from: 'color',
              modifiers: [['darker', 0.3]],
            }}
            animate
            motionStiffness={90}
            motionDamping={11}
            onClick={this.onProgramClick}
          />
        )}
      </div>
    );
  }
}
const mapStateToProps = ({ financialReducer }) => ({
  financialReducer,
});
export default connect(mapStateToProps, {})(TreeMapDiagram);
