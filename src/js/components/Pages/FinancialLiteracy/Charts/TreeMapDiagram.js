import React, { Component } from 'react';
import { ResponsiveTreeMap } from '@nivo/treemap';
import { connect } from 'react-redux';
import root from './treemap.data';

class TreeMapDiagram extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { treeMapData } = this.props.financialReducer;

    console.log('treeMapdiagram component', treeMapData);

    return (
      <div style={{ height: '500px', width: '500px' }}>
        {Object.entries(treeMapData).length !== 0 && (
          <ResponsiveTreeMap
            root={treeMapData}
            // root={root.root}
            identity="name"
            value="loc"
            innerPadding={3}
            outerPadding={3}
            margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
            label="loc"
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
