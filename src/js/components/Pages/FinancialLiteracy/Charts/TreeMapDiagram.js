/* eslint-disable react/no-did-update-set-state */
import React, { Component } from 'react';
import { ResponsiveTreeMap } from '@nivo/treemap';
import { connect } from 'react-redux';
import root from './treemap.data';

function colorPicker(i) {
  if (i % 20 === 0) return '#91664E';
  if (i % 20 === 1) return '#13A8BE';
  if (i % 20 === 2) return '#13A8BE'; // #FF6D00
  if (i % 20 === 3) return '#DE2693';
  if (i % 20 === 4) return '#B1B424';
  if (i % 20 === 5) return '#2196F3';
  if (i % 20 === 6) return '#B1B424'; // #4CE2A7
  if (i % 20 === 7) return '#1967A0';
  if (i % 20 === 8) return '#00C853';
  if (i % 20 === 9) return '#E11D3F'; // #651FFF
  if (i % 20 === 10) return '#FF6D00'; // #B71DE1
  if (i % 20 === 11) return '#DE2693'; // #FFCD00
  if (i % 20 === 12) return '#1F8AE4'; // #E11D3F
  if (i % 20 === 13) return '#FF1500';
  if (i % 20 === 14) return '#C5E11D';
  if (i % 20 === 15) return '#CDACF2';
  if (i % 20 === 16) return 'AFDE0E';
  if (i % 20 === 17) return '#FF5576';
  if (i % 20 === 18) return '#BFEDF5';
  if (i % 20 === 19) return '#E0CBAB';
  if (i % 20 === 20) return '#FF5E00';
  return '#FFD400';
}
class TreeMapDiagram extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // treeMapData: {},
      // financialData: [],
      // checkedPartnerItems: [],
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
    this.state.financialData.map(item => {
      if (id === item.program_name) {
        if (this.props.checkedPartnerItems.length === 0) {
          arr.push({
            id: item.partner_id,
            name: item.partner_name,
            loc: item.value,
          });
        } else {
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
      }
      return true;
    });
    return { name: 'program1', children: arr };
  };

  onProgramClick = e => {
    const updatedTreeMapData = this.generateTreeMapData(e.data.id);
    this.setState({
      treeMapData: updatedTreeMapData,
    });
  };

  gradientFunction = () => {
    const arr = [];
    this.state.treeMapData.children.map((item, index) => {
      arr.push({
        id: `color${index}`,
        type: 'linearGradient',
        colors: [{ color: colorPicker(item.id) }],
      });
      return true;
    });
    return arr;
    // return [
    //   {
    //     id: 'color1',
    //     type: 'linearGradient',
    //     colors: [{ color: '#651FFF' }],
    //   },
    //   {
    //     id: 'color2',
    //     type: 'linearGradient',
    //     colors: [{ color: '#91664E' }],
    //   },
    //   {
    //     id: 'color3',
    //     type: 'linearGradient',
    //     colors: [{ color: '#91664E' }],
    //   },
    // ];
  };

  fillFunction = () => {
    const arr = [];
    this.state.treeMapData.children.map((item, index) => {
      arr.push({ match: { id: item.name }, id: `color${index}` });
      return true;
    });
    // return [
    //   { match: { id: 9 }, id: 'color1' },
    //   { match: { id: 10 }, id: 'color2' },
    //   { match: { id: 2 }, id: 'color3' },
    // ];
    return arr;
  };

  render() {
    // const { treeMapData } = this.props.financialReducer;
    const { treeMapData, checkedPartnerItems } = this.state;

    console.log('treemapdata', treeMapData);

    return (
      <div
        id="treemap-chart"
        style={{ height: '340px', width: '100%' }}
      >
        {treeMapData && Object.entries(treeMapData).length !== 0 && (
          <ResponsiveTreeMap
            root={treeMapData}
            // root={root.root}
            identity="name"
            value="loc"
            innerPadding={3}
            outerPadding={3}
            margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
            label="name"
            // orientLabel={false}
            // labelFormat=".0s"
            labelSkipSize={12}
            // labelTextColor={{
            //   from: 'color',
            //   modifiers: [['darker', 1.2]],
            // }}
            labelTextColor="#fff"
            // colors={{ scheme: 'nivo' }}
            defs={this.gradientFunction()}
            fill={this.fillFunction()}
            borderColor="#fff"
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
