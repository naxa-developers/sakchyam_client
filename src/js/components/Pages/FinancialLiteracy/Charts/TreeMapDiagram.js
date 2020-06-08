/* eslint-disable react/no-did-update-set-state */
import React, { Component } from 'react';
import { ResponsiveTreeMap } from '@nivo/treemap';
import { connect } from 'react-redux';
import root from './treemap.data';

class TreeMapDiagram extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onProgramClick = e => {
    const updatedTreeMapData = this.generateTreeMapData(e.data.id);
    this.setState({
      treeMapData: updatedTreeMapData,
    });
  };

  generateTreeMapData = id => {
    const arr = [];
    this.state.financialData.map(item => {
      if (id === item.program_id) {
        arr.push({
          id: item.partner_id,
          name: item.partner_name,
          loc: item.value,
        });
        return true;
      }
      return true;
    });
    console.log(arr, 'arr');
    return { name: 'program1', children: arr };
  };

  componentDidUpdate(prevProps, prevState) {
    const {
      treeMapData,
      financialData,
    } = this.props.financialReducer;
    console.log(this.props.financialReducer, 'financialReducer');
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

    return true;
  }

  render() {
    // const { treeMapData } = this.props.financialReducer;
    const { treeMapData } = this.state;

    console.log('treeMapdiagram component', this.state.treeMapData);

    return (
      <div style={{ height: '500px', width: '500px' }}>
        {treeMapData && Object.entries(treeMapData).length !== 0 && (
          <ResponsiveTreeMap
            root={treeMapData}
            // root={root.root}
            identity="id"
            value="loc"
            innerPadding={3}
            outerPadding={3}
            margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
            label="id"
            labelFormat=".0s"
            labelSkipSize={12}
            labelTextColor={{
              from: 'color',
              modifiers: [['darker', 1.2]],
            }}
            colors={{ scheme: 'nivo' }}
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
