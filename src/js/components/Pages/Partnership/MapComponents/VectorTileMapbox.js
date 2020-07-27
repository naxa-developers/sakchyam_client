// /* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapboxgl from 'mapbox-gl';
import * as d3 from 'd3';
import powerplants from '../../../../../data/testcircledata.json';
import province from '../../../../../data/province.json';
import district from '../../../../../data/district.json';
import municipality from '../../../../../data/municipality.json';
import {
  calculateRange,
  choroplethColorArray,
} from '../../../common/Functions';
import TimelineChart from './TimelineChart';
import { getCenterBboxProvince } from '../common/ProvinceFunction';
import { getCenterBboxDistrict } from '../common/DistrictFunction';
import { getCenterBboxMunicipality } from '../common/MunicipalityFunction';

import MarkerPieChart from '../Charts/MarkerPieChart/MarkerPieChart';
import { extendBounds } from '../../Automation/MapRelatedComponents/extendBbox';

global.markerList = [];
function removeMarker() {
  if (global.markerList !== null) {
    for (let i = global.markerList.length - 1; i >= 0; i -= 1) {
      // const removed = global.markerList.splice(0);
      global.markerList[i].remove();
    }
    document
      .querySelectorAll('.mapboxgl-marker')
      .forEach(function(a) {
        a.remove();
      });
    global.markerList = [];
    // console.log(global.markerList, 'globalMarkerlist VectorTile');
  }
}
const popup = new mapboxgl.Popup();

// var colors = ['#fed976', '#feb24c', '#fd8d3c', '#fc4e2a', '#e31a1c'];
// const colors = [
//   '#8dd3c7',
//   '#ffffb3',
//   '#bebada',
//   '#fb8072',
//   '#80b1d3',
//   '#fdb462',
//   '#b3de69',
//   '#fccde5',
//   '#d9d9d9',
//   '#bc80bd',
//   '#ccebc5',
// ];
// const colors = [
//   '#E11D3F',
//   '#FF6D00',
//   '#13A8BE',
//   '#651FFF',
//   '#B1B424',
//   '#2196F3',
//   '#4CE2A7',
//   '#1967A0',
//   '#FFCD00',
//   '#DE2693',
// ];
const colors = [
  '#e45642',
  '#f7c349',
  '#4dd291',
  '#225687',
  '#651FFF',
  '#70356f',
  '#8f1c52',
  '#cc4967',
  '#E11D3F',
];
const colorScale = d3
  .scaleOrdinal()
  .domain([
    'Automation of MFIs',
    'Channel Innovations',
    'Digital Financial Services',
    'Downscaling and Value Chain Financing By Banks',
    'Increased uptake of microinsurance',
    'Outreach Expansion',
    'Product Innovations',
    'SME Financing',
  ])
  .range(colors);
function CaculateCount(date, finalData, api) {
  const startDate = date[0];
  const endDate = date[1];
  //
  //
  //
  finalData.map((prov, i) => {
    //
    api.map(data => {
      if (prov.id === data.municipality_id) {
        //
        //
        //
        //
        //
        //
        if (
          data.start_date >= startDate &&
          data.start_date <= endDate
        ) {
          //
          //
          // eslint-disable-next-line no-param-reassign
          finalData[i].count += 1;
        }
      }
      return true;
    });
    return true;
  });
}
const defaultData = [
  { id: '1', count: 0 },
  { id: '2', count: 0 },
  { id: '3', count: 0 },
  { id: '4', count: 0 },
  { id: '5', count: 0 },
  { id: '6', count: 0 },
  { id: '7', count: 0 },
];
// gid": 77,
//     "districtid": 52,
//     "provinceid": 5,
//     "name": "RUKUM_E",
//     "centroid_x": 82.81076586,
//     "centroid_y": 28.67396361,
//     "bbox": "82.48569639000004,28.475450787000057,83.15244268300006,28.86920142400004"
const fullGeojsonProvince = {
  type: 'FeatureCollection',
  features: [],
};
province.map(data => {
  return fullGeojsonProvince.features.push({
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [data.centroid_x, data.centroid_y],
    },
    properties: {
      name: data.prov_name,
      id: data.FIRST_PROV,
      code: data.FIRST_PROV,
    },
  });
});
const fullGeojsonDistrict = {
  type: 'FeatureCollection',
  features: [],
};
district.map(data => {
  return fullGeojsonDistrict.features.push({
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [data.centroid_x, data.centroid_y],
    },
    properties: {
      name: data.name,
      id: data.gid,
      code: data.districtid,
    },
  });
});
const fullGeojsonMunicipality = {
  type: 'FeatureCollection',
  features: [],
};
municipality.map(data => {
  return fullGeojsonMunicipality.features.push({
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [data.centroid_x, data.centroid_y],
    },
    properties: {
      name: data.lu_name,
      id: data.gid,
      code: data.munid,
      allocated_beneficiary: 0,
      allocated_budget: 0,
    },
  });
});
let timelineKey = 1;
//
//
//

class Choropleth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grade: [],
      legendColors: [],
      finalStyle: null,
      minValue: '2015-01-01',
      maxValue: '2020-01-01',
      key: 1,
      playClick: false,
      circleMarkerRadius: null,
    };
  }

  getLegendColor(value) {
    const { colorArray } = this.props;
    const { legendColors, grade } = this.state;
    const legendColor =
      colorArray != null && colorArray.length > 0
        ? colorArray
        : legendColors;
    let color = 'rgba(255,255,255,0)';
    //
    // eslint-disable-next-line array-callback-return
    grade.map((gradeitem, j) => {
      if (value > gradeitem) {
        color = legendColor[j];
      }
    });
    return color;
  }

  changeGrades() {
    let range = [];
    const data = [];
    //
    const colorArrayLength =
      this.props.colorArray && this.props.colorArray.length;
    const gradeCount =
      this.props.legendDivisions != null &&
      typeof this.props.legendDivisions === 'number' &&
      this.props.legendDivisions <= 20 &&
      this.props.legendDivisions >= colorArrayLength
        ? this.props.legendDivisions
        : 5; // set default gradecount

    const fullRange =
      this.props.divisions && this.props.divisions.length > 0
        ? this.props.divisions
        : [];
    const fullData =
      this.props.choroplethData != null &&
      this.props.choroplethData.length > 0
        ? this.props.choroplethData
        : defaultData;
    //
    if (
      this.props.choroplethData != null &&
      this.props.choroplethData.length > 0
    ) {
      this.props.choroplethData.forEach(data1 => {
        data.push(data1.count);
      });
    } else {
      defaultData.forEach(data1 => {
        data.push(data1.count); // if no dat passed take from default data
      });
    }

    //
    const max = Math.max.apply(null, Object.values(data));
    const min = 0; // Math.min(...data);
    //
    //
    range =
      (max - min) / (gradeCount - 1) < 1
        ? [0, 2, 4, 6, 8, 10, 12]
        : calculateRange(min, max, (max - min) / (gradeCount - 1));

    this.setState({
      grade: fullRange.length > 0 ? fullRange : range,
    }); // add grade provided from props if available

    setTimeout(() => {
      this.ChangeLegendColors();
      this.setChoroplethStyle(fullData);
    }, 200);
  }

  ChangeLegendColors() {
    const choroplethColor = this.props.color;
    const color =
      choroplethColor !== undefined && choroplethColor.length > 0
        ? choroplethColor
        : '#ff0000';
    const data = this.state.grade;
    const choroplethColors = choroplethColorArray(data.length, color);
    //
    this.setState({ legendColors: choroplethColors });
  }

  setChoroplethStyle(values) {
    //
    const expression = ['match', ['get', 'code']];
    values.forEach(value => {
      const color = this.getLegendColor(value.count);
      expression.push(value.id.toString(), color);
    });

    // const data = this.props.choroplethData;
    // const maxValue = this.props.maxValue;
    // // Calculate color for each state based on the unemployment rate
    // data.forEach(function(row) {
    //
    //     var red = "";
    //     var green = "";
    //     var blue = "";
    //     green = (row['count'] / maxValue) * 255;
    //     var color = 'rgba(' + green + ', ' + 0 + ', ' + 0 + ', 1)';
    //     expression.push(row['code'], color);
    // });

    // Last value is the default, used where there is no data
    expression.push('rgba(0,0,0,0)');

    this.setState({ finalStyle: expression });
    //
  }

  filterPieCharts(viewBy) {
    const that = this;
    const { mapViewBy, circleMarkerData, map } = that.props;
    const FederalData =
      mapViewBy === 'municipality'
        ? fullGeojsonMunicipality
        : mapViewBy === 'district'
        ? fullGeojsonDistrict
        : fullGeojsonProvince;
    removeMarker();
    const FinalGeojson = { ...FederalData };

    FinalGeojson.features.forEach((item, index) => {
      circleMarkerData.forEach(p => {
        if (p.code === item.properties.code) {
          FinalGeojson.features[index].properties = {
            ...item.properties,
            ...p,
          };
        }
      });
    });
    const myArrayFiltered = FinalGeojson.features.filter(el => {
      return circleMarkerData.some(f => {
        return f.code === el.properties.code;
      });
    });
    FinalGeojson.features = myArrayFiltered;

    // console.log(r, 'r');
    let singleData = {};
    let singleData2nd = {};
    const total = [];
    const total2nd = [];
    FinalGeojson.features.forEach(data => {
      //
      singleData2nd = {
        point_count: 0,
      };
      if (data.properties.pie) {
        data.properties.pie.forEach(piedata => {
          //
          singleData2nd[`${piedata.investment_primary}`] =
            piedata[`${viewBy}`];
          singleData2nd.point_count += piedata[`${viewBy}`];
        });
      }
      total2nd.push(singleData2nd.point_count);
      const allCount = [];
      Object.values(singleData2nd).forEach(singledata => {
        //
        allCount.push(singledata);
      });
      const sum = allCount.reduce(
        (partialSum, a) => partialSum + a,
        0,
      );
      // const min = Math.min.apply(null, allCount);
      // const max = Math.max.apply(null, allCount);
      // eslint-disable-next-line no-param-reassign
      // data.min = min;
      // eslint-disable-next-line no-param-reassign
      // data.max = max;
      // eslint-disable-next-line no-param-reassign
      data.total_sum = sum;
    });
    const totalSumList = [];
    FinalGeojson.features.forEach(fed => {
      totalSumList.push(fed.total_sum);
    });
    const min = Math.min.apply(null, totalSumList);
    const max = Math.max.apply(null, totalSumList);
    FinalGeojson.features.forEach(data => {
      //
      singleData = {
        point_count: 0,
      };
      if (data.properties.pie) {
        data.properties.pie.forEach(piedata => {
          //
          singleData[`${piedata.investment_primary}`] =
            piedata[`${viewBy}`];
          singleData.point_count += piedata[`${viewBy}`];
        });
      }
      total.push(singleData.point_count);
      const radiusRange =
        // eslint-disable-next-line prettier/prettier
      (data.total_sum - min) / (max - min) *(30 - 10) + 10;
      const testElMain = document.createElement('div');
      testElMain.className = 'marker';

      // console.log(singleData, 'singleDataProv');
      // const props = data.properties;
      // eslint-disable-next-line no-use-before-define
      const testEl = this.createDonutChart(
        singleData,
        total2nd,
        radiusRange,
      );
      const marker = new mapboxgl.Marker({ element: testEl })
        .setLngLat(data.geometry.coordinates)
        .addTo(map);
      global.markerList.push(marker);
    });
  }
  // setCircleMarkerRadius(values, viewdataBy) {
  //
  //   // const expression = ['match', ['get', 'code']];
  //   values.forEach(value => {
  //     //
  //     // console.log(
  //     //   value.properties.allocated_beneficiary,
  //     //   'all benef',
  //     // );
  //     //
  //     const color = this.getLegendColor(
  //       value.properties.allocated_beneficiary,
  //     );
  //     // expression.push(value.properties.id.toString(), color);
  //   });
  //   // eslint-disable-next-line prefer-spread
  //   const maxValue = Math.max.apply(
  //     Math,
  //     // eslint-disable-next-line array-callback-return
  //     values.map(feature => {
  //       feature.properties.pie.map(o => {
  //         return viewdataBy === 'allocated_beneficiary'
  //           ? o.total_beneficiary
  //           : o.allocated_budget;
  //       });
  //     }),
  //   );
  //   // eslint-disable-next-line prefer-spread
  //   const minValue = Math.min.apply(
  //     Math,
  //     // eslint-disable-next-line array-callback-return
  //     values.map(feature => {
  //       feature.properties.pie.map(o => {
  //         return viewdataBy === 'allocated_beneficiary'
  //           ? o.total_beneficiary
  //           : o.allocated_budget;
  //       });
  //     }),
  //   );
  //   //
  //   //
  //   // New Value=(( Old Value - Old minimum value) / (old maximum value - old minimum value))*(New maximum value- New minimum Value) + New minimum value
  //   const a = values.map(data => {
  //     const b = data.properties.map(x => {
  //       return {
  //         ...data,
  //         properties: {
  //           ...data.properties,
  //           pie: {
  //             ...data.properties.pie,
  //             radiusRange:
  //               ((viewdataBy === 'allocated_beneficiary'
  //                 ? data.properties.pie.total_beneficiary
  //                 : data.properties.pie.total_beneficiary -
  //                   minValue) /
  //                 (maxValue - minValue)) *
  //                 (30 - 10) +
  //               10,
  //           },
  //         },
  //       };
  //     });
  //     return b;
  //   });
  //
  //   return a;
  //   //
  //   // const data = this.props.choroplethData;
  //   // const maxValue = this.props.maxValue;
  //   // // Calculate color for each state based on the unemployment rate
  //   // data.forEach(function(row) {
  //   //
  //   //     var red = "";
  //   //     var green = "";
  //   //     var blue = "";
  //   //     green = (row['count'] / maxValue) * 255;
  //   //     var color = 'rgba(' + green + ', ' + 0 + ', ' + 0 + ', 1)';
  //   //     expression.push(row['code'], color);
  //   // });

  //   // Last value is the default, used where there is no data
  //   // expression.push('rgba(0,0,0,0)');
  //   //
  //   // this.setState({ circleMarkerRadius: expression });
  //   //
  // }

  createPieLegend = () => {
    const that = this;
    const datas = [
      {
        type: 'Automation of MFIs',
        // count: props['Automation of MFIs'],
      },
      {
        type: 'Channel Innovations',
        // count: props['Channel Innovations'],
      },
      {
        type: 'Digital Financial Services',
        // count: props['Digital Financial Services'],
      },
      {
        type: 'Downscaling and Value Chain Financing By Banks',
        // count:
        // props['Downscaling and Value Chain Financing By Banks'],
      },
      {
        type: 'Increased uptake of microinsurance',
        // count: props['Increased uptake of microinsurance'],
      },
      {
        type: 'Outreach Expansion',
        // count: props['Outreach Expansion'],
      },
      {
        type: 'Product Innovations',
        // count: props['Product Innovations'],
      },
      {
        type: 'SME Financing',
        // count: props['SME Financing'],
      },
    ];
    // select the svg area
    const SVG = d3.select(that.props.pieSquareLegend.current);
    // const firstLegend = d3.select(SVG);
    // const legendCon = d3.select(firstLegend.node().parentNode);
    // const legendY = parseInt(
    //   firstLegend.select('text').attr('y'),
    //   10,
    // );
    SVG.append('text')
      .text('Investment Focus Quantify')
      .attr('x', 65)
      .attr('y', 20)
      .style('font-size', '15px');
    // By Partner/Benef/Budget
    // translate(109px, -19px)
    // create a list of keys
    // const keys = [
    //   'Mister A',
    //   'Brigitte',
    //   'Eleonore',
    //   'Another friend',
    //   'Batman',
    // ];

    // Usually you have a color scale in your chart already
    // const color = d3
    //   .scaleOrdinal()
    //   .domain(datas)
    //   .range(d3.schemeSet1);

    // Add one dot in the legend for each name.
    const size = 20;
    SVG.selectAll('mydots')
      .data(datas)
      .enter()
      .append('rect')
      .attr('x', 10)
      .attr('y', function(d, i) {
        return 10 + i * (size + 5);
      }) // 100 is where the first dot appears. 25 is the distance between dots
      .attr('width', size)
      .attr('height', size)
      .style('transform', `translate(0px, ${size + 5}px)`)
      .style('fill', function(d) {
        return colorScale(d.type);
      });

    // Add one dot in the legend for each name.
    SVG.selectAll('mylabels')
      .data(datas)
      .enter()
      // .append('h5')
      // .text('Investment Focus Quantify By Partner/Benef/Budget')
      .append('text')
      .attr('x', 10 + size * 1.2)
      .attr('y', function(d, i) {
        return 10 + i * (size + 5) + size / 2;
      }) // 100 is where the first dot appears. 25 is the distance between dots
      .style('transform', `translate(0px, ${size + 5}px)`)
      .style('fill', function(d) {
        return '#000';
        // return color(d.type);
      })
      .text(function(d) {
        return d.type;
      })
      .attr('text-anchor', 'left')
      .style('alignment-baseline', 'middle');
  };

  // createCircleLegend = datas => {
  //   const pieCountArray = [];
  //   datas.forEach(feature => {
  //     feature.properties.pie.forEach(singlePie => {
  //       return pieCountArray.push(singlePie.partner_count);
  //     });
  //   });
  //
  //   const min = Math.min.apply(null, pieCountArray);
  //   const max = Math.max.apply(null, pieCountArray);
  //

  //   // append the svg object to the body of the page
  //   const height = 300;
  //   const width = 300;
  //   const svg = d3
  //     .select(this.props.circleLegendRef.current)
  //     .append('svg')
  //     .attr('width', width)
  //     .attr('height', height);
  //   // .style('transform', 'translate(-44px, -73px)');
  //   // .attr('transform', 'translate (-42px,-34px)');

  //   // The scale you use for bubble size
  //   const size = d3
  //     .scaleSqrt()
  //     .domain([1, 50]) // What's in the data, let's say it is percentage
  //     .range([1, 50]); // Size in pixel

  //   // Add legend: circles
  //   // const valuesToShow = [10, 50, 100];
  //   const valuesToShow = calculateRange(
  //     min,
  //     max,
  //     (max - min) / (3 - 1),
  //   );
  //   const xCircle = 60;
  //   const xLabel = 210;
  //   const yCircle = 160;
  //   svg
  //     .selectAll('legend')
  //     .data(valuesToShow)
  //     .enter()
  //     .append('circle')
  //     .attr('cx', xCircle)
  //     .attr('cy', function(d) {
  //       return yCircle - size(d);
  //     })
  //     .attr('r', function(d) {
  //       return size(d);
  //     })
  //     .style('fill', 'none')
  //     .attr('stroke', 'black');

  //   // Add legend: segments
  //   svg
  //     .selectAll('legend')
  //     .data(valuesToShow)
  //     .enter()
  //     .append('line')
  //     .attr('x1', function(d) {
  //       return xCircle + size(d);
  //     })
  //     .attr('x2', xLabel - 60)
  //     .attr('y1', function(d) {
  //       return yCircle - size(d);
  //     })
  //     .attr('y2', function(d) {
  //       return yCircle - size(d);
  //     })
  //     .attr('stroke', 'black')
  //     .style('stroke-dasharray', '2,2');

  //   // Add legend: labels
  //   svg
  //     .selectAll('legend')
  //     .data(valuesToShow)
  //     .enter()
  //     .append('text')
  //     .attr('x', xLabel - 60)
  //     .attr('y', function(d) {
  //       return yCircle - size(d);
  //     })
  //     .text(function(d) {
  //       return d;
  //     })
  //     .style('font-size', 10)
  //     .attr('alignment-baseline', 'middle');
  // };

  createDonutChart = (props, totals, radiusValue) => {
    const div = document.createElement('div');

    const allCount = [];
    Object.values(props).forEach(data => {
      //
      allCount.push(data);
    });
    // const maxValue=
    //     const getRadius = data.properties.pie.total_beneficiary -
    //     minValue) /
    //   (maxValue - minValue)) *
    //   (30 - 10) +
    // 10,
    const data = [
      {
        type: 'Automation of MFIs',
        count: props['Automation of MFIs'],
      },
      {
        type: 'Channel Innovations',
        count: props['Channel Innovations'],
      },
      {
        type: 'Digital Financial Services',
        count: props['Digital Financial Services'],
      },
      {
        type: 'Downscaling and Value Chain Financing By Banks',
        count:
          props['Downscaling and Value Chain Financing By Banks'],
      },
      {
        type: 'Increased uptake of microinsurance',
        count: props['Increased uptake of microinsurance'],
      },
      {
        type: 'Outreach Expansion',
        count: props['Outreach Expansion'],
      },
      {
        type: 'Product Innovations',
        count: props['Product Innovations'],
      },
      {
        type: 'SME Financing',
        count: props['SME Financing'],
      },
    ];

    const thickness = 10;
    const scale = d3
      .scaleLinear()
      .domain([d3.min(totals), d3.max(totals)])
      .range([d3.min(totals), d3.max(totals)]);

    // const radius = scale(props.point_count);
    const radius = radiusValue ? radiusValue : 30;

    // const radius = scale(props.point_count - 10);
    // const circleRadius = radius - thickness;
    const circleRadius = radiusValue;
    const svg = d3
      .select(div)
      .append('svg')
      .attr('class', 'pie')
      .attr('width', radius * 2)
      .attr('height', radius * 2);
    //
    // center
    const g = svg
      .append('g')
      .attr('transform', `translate(${radius}, ${radius})`);

    // <div
    //       className="leaflet-popup  leaflet-zoom-animated"
    //       style="opacity: 1; transform: translate3d(116px, 282px, 0px); bottom: -7px; left: -141px;"
    //     >
    //       <div className="leaflet-popup-content-wrapper">
    //     <div className="leaflet-popup-content" style="width: 281px;">
    //           <ul>
    //         <li>
    //               <div className="organization-icon">
    //             <span>CH</span>
    //           </div>
    //               <div className="organization-content">
    //             <h5>Kisan Microfinance</h5>
    //           </div>
    //             </li>
    //       </ul>
    //         </div>
    //   </div>
    //       <div className="leaflet-popup-tip-container">
    //     <div className="leaflet-popup-tip" />
    //   </div>
    //       <a className="leaflet-popup-close-button" href="#close">
    //     ×
    //   </a>
    //     </div>;
    const tooltip = d3
      .select(div)
      .append('div')
      .attr('class', 'pie-mapbox-popup')
      .style('opacity', 0);

    tooltip.append('div').attr('class', 'popup-div');

    // tooltip
    //   .select('.popup-div')
    //   .append('ul')
    //   .attr('class', 'mapbox-popup-content');
    // .style('width', '281px');

    // tooltip
    //   .select('.leaflet-popup-content')
    //   .append('div')
    //   .attr('class', 'organization-content');

    const arc = d3
      .arc()
      .innerRadius(radius - thickness)
      .outerRadius(radius);

    const pie = d3
      .pie()
      .value(d => d.count)
      .sort(null);

    const path = g
      .selectAll('path')
      .data(pie(data.sort((x, y) => d3.ascending(y.count, x.count))))
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', d => colorScale(d.data.type))
      .on('mouseover', function(d, i) {
        // console.log(props, 'props');
        // if (document.querySelector('.federal-popup')) {
        //   document.querySelector('.federal-popup').style.display =
        //     'none';
        // }
        // popup.remove();
        /* <div className="icons">
        <i className="material-icons">tablet_mac</i>
        <b>4</b></div> */
        // <div className="icon-list">
        //             </div>
        let partnerList = null;
        partnerList =
          props[`${d.data.type}_partnerList`] &&
          props[`${d.data.type}_partnerList`]
            .map(partner => {
              return `<li>
                <div className="organization-icon">
                  <span />
                </div>
                <div className="organization-content">
                  <div className="org-header">
                    <h5>
                      ${partner}
                    </h5>
                  </div>
                </div>
              </li>`;
            })
            .join('');
        tooltip.select('.popup-div').html(
          `<div class="leaflet-popup-content" style="width: 100px;">
            <div class="map-popup-view">
              <div class="map-popup-view-header">
                  <h5>${d.data.type}</h5>
                  <div class="icons">
                    <i class="material-icons">tablet_mac</i><b>${
                      d.data.count
                    }</b>
                  </div>
                  <h6>${props.federal_name}</h6>
              </div>
                <ul>
                  ${partnerList !== undefined ? partnerList : ''}
                </ul>
              <div class="map-view-footer">
              </div>
            </div>
          </div>` /* eslint-disable-line */
        );
        // .style('color', 'black');
        // .style('background-color', 'white');
        // tooltip.select('.count').html('Test');
        // tooltip.select('.percent').html(`${34}%`);

        tooltip.style('display', 'block');
        tooltip.style('opacity', 2);
        d3.select(this)
          .transition()
          .duration('50')
          .attr('opacity', '.65')
          .attr(
            'd',
            d3
              .arc()
              .innerRadius(radius - thickness)
              .outerRadius(radius * 1.04),
          );
      })
      .on('mousemove', function(d, i) {
        tooltip
          .style('top', `${d3.event.offsetY + 20}px`)
          .style('left', `${d3.event.offsetX + 20}px`);
      })
      .on('mouseout', function(d, i) {
        tooltip.style('display', 'none');
        tooltip.style('opacity', 0);

        d3.select(this)
          .transition()
          // .duration('200')
          // .ease(d3.easeBounceIn)
          .attr('opacity', '1')
          .attr(
            'd',
            d3
              .arc()
              .innerRadius(radius - thickness)
              .outerRadius(radius),
          );
      });

    // const circle = g
    //   .append('circle')
    //   .attr('r', circleRadius)
    //   .attr('fill', 'rgba(0, 0, 0, 0)')
    //   .attr('class', 'center-circle');

    // const text = g
    //   .append('text')
    //   .attr('class', 'total')
    //   .text(props.point_count)
    //   .attr('text-anchor', 'middle')
    //   .attr('dy', 5)
    //   .attr('fill', 'white');

    // const infoEl = createTable(props);

    // svg.on('click', () => {
    //   d3.selectAll('.center-circle').attr(
    //     'fill',
    //     'rgba(0, 0, 0, 0.7)',
    //   );
    //   circle.attr('fill', 'rgb(71, 79, 102)');
    //   document.getElementById('key').innerHTML = '';
    //   document.getElementById('key').append(infoEl);
    // });
    return div;
  };

  plotVectorTile = () => {
    const { map } = this.props;
    const that = this;
    //
    let hoveredStateId = null;
    map.on('load', function() {
      const combinedBbox = [];
      // console.log(selectedProvince, 'selectedProvine');
      const getBboxValue = getCenterBboxProvince([
        1,
        2,
        3,
        4,
        5,
        6,
        7,
      ]);
      getBboxValue.map(data => {
        combinedBbox.push(data.bbox);
        return true;
      });
      // console.log(combinedBbox, 'combineBbox');
      const extendedValue = extendBounds(combinedBbox);
      that.props.map.fitBounds(extendedValue);
      // Add Mapillary sequence layer.
      // https://www.mapillary.com/developer/tiles-documentation/#sequence-layer
      map.addSource('municipality', {
        type: 'vector',
        // 'interactive':true,
        tiles: [
          that.props.vectorTileUrl
            ? that.props.vectorTileUrl
            : 'https://vectortile.naxa.com.np/federal/province.mvt/?tile={z}/{x}/{y}',
        ], // "https://apps.naxa.com.np/geoserver/gwc/service/wmts?REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0&LAYER=Naxa:educationpoint&STYLE=&TILEMATRIX=EPSG:900913:{z}&TILEMATRIXSET=EPSG:900913&FORMAT=application/vnd.mapbox-vector-tile&TILECOL={x}&TILEROW={y}"],
        minzoom: 0,
        maxzoom: 20,
        promoteId: { default: 'code' },
      });

      map.addLayer({
        id: 'vector-tile-fill',
        type: 'fill',
        source: 'municipality',
        'source-layer': 'default',
        activeChoropleth: false,
        paint: {
          'fill-color': that.state.finalStyle,
          'fill-opacity': 0.6,
        },
      });

      map.addLayer({
        id: 'vector-tile-outline',
        type: 'line',
        source: 'municipality',
        'source-layer': 'default',
        paint: {
          'line-color': 'rgba(0,0,0, 0.6)',
          'line-width': [
            'case',
            ['boolean', ['feature-state', 'hover'], false],
            2,
            1,
          ],
        },
      });
      global.mapGlobal = map;
      // filters for classifying earthquakes into five categories based on magnitude

      //
      //
      // PieChart in Marker Start

      // PieChart in Marker End

      // fullGeojsonProvince.features.forEach((item, index) => {
      //   this.props.choroplethData.forEach(p => {
      //     if (p.code === item.properties.code) {
      //       fullGeojsonProvince.features[index].properties = {
      //         ...item.properties,
      //         ...p,
      //       };
      //     }
      //   });
      // });
      // map.addSource('fullGeojsonProvince', {
      //   type: 'geojson',
      //   data: fullGeojsonProvince,
      // });
      // map.addLayer({
      //   id: 'circles1',
      //   source: 'fullGeojsonProvince',
      //   type: 'circle',
      //   // 'source-layer': 'default',
      //   paint: {
      //     'circle-radius': ['get', 'count'],
      //     'circle-color': '#007cbf',
      //     'circle-opacity': 0.5,
      //     'circle-stroke-width': 0,
      //   },
      //   // filter: ['==', 'modelId', 1],
      // });
      // map.addLayer({
      //   id: 'singles-count',
      //   type: 'symbol',
      //   source: 'fullGeojsonProvince',
      //   // filter: ["has", "singles_count"],
      //   layout: {
      //     'text-field': ['get', 'count'],
      //     'text-allow-overlap': true,
      //     'text-font': [
      //       'DIN Offc Pro Medium',
      //       'Arial Unicode MS Bold',
      //     ],
      //     'text-size': 12,
      //     'text-ignore-placement': true,
      //   },
      //   paint: {
      //     'text-color': '#000000',
      //     'text-halo-color': 'rgba(255,255,255,0.95)',
      //     'text-halo-width': 1.5,
      //     'text-halo-blur': 1,
      //   },
      // });
      if (that.props.label) {
        // map.addLayer({
        //   id: 'vector-tile-outline',
        //   type: 'line',
        //   source: 'municipality',
        //   'source-layer': 'default',
        //   paint: {
        //     'line-color': 'rgba(255, 0, 0, 1)',
        //     'line-width': [
        //       'case',
        //       ['boolean', ['feature-state', 'hover'], false],
        //       5,
        //       1,
        //     ],
        //   },
        // });
        // if (that.props.label) {
        //   map.addLayer({
        //     id: 'vector-tile-label',
        //     type: 'symbol',
        //     source: 'municipality',
        //     'source-layer': 'default',
        //     layout: {
        //       'text-field': ['get', 'name'],
        //       'icon-image': ['concat', ['get', 'icon'], '-15'],
        //       'text-anchor': 'center',
        //       'text-offset': [0, 0],
        //       'symbol-placement': 'point',
        //       'text-justify': 'center',
        //       'text-size': 10,
        //     },
        //     paint: {
        //       'text-color': '#666',
        //       'text-halo-color': 'rgba(255,255,255,0.95)',
        //       'text-halo-width': 1.5,
        //       'text-halo-blur': 1,
        //     },
        //   });
        // }
      }
      // var bounds = coordinates.reduce(function(bounds, coord) {
      //   return bounds.extend(coord);
      //   }, new mapboxgl.LngLatBounds(coordinates[0], coordinates[0]));
      // map.fitBounds()
      map.on('zoom', function() {
        // const that = this;
        // upto 6 province view after 6 and upto 9  district and after 9 municipality
        //
        // if (map.getZoom() <= 6) {
        //
        //   that.props.setMapViewBy('province');
        // } else if (map.getZoom() <= 9) {
        //
        //   that.props.setMapViewBy('district');
        // } else if (map.getZoom() > 9) {
        //
        //   that.props.setMapViewBy('municipality');
        // }
        // if (map.getZoom() >= 4) {
        //   stateLegendEl.style.display = 'none';
        //   countyLegendEl.style.display = 'block';
        // } else if (map.getZoom() >= 8) {
        //   stateLegendEl.style.display = 'block';
        //   countyLegendEl.style.display = 'none';
        // }
      });
      map.on('click', 'vector-tile-fill', function(e) {
        console.log(e, 'e Vector');
        //
        //
        // console.log(
        //   getCenterBboxProvince(e.features[0].properties.code),
        // );
        // console.log(that.props);
        // console.log(e.features[0]);
        if (that.props.mapViewBy === 'province') {
          console.log(e.features[0]);
          const getBbox = getCenterBboxProvince(
            e.features[0].properties.code,
          );
          map.fitBounds(getBbox.bbox);
          console.log(map.getZoom(), 'zoom');
          that.props.handleProvinceClick(
            parseInt(e.features[0].properties.code, 10),
          );
          map.setFilter('vector-tile-fill', [
            'in',
            ['get', 'code'],
            ['literal', [e.features[0].properties.code.toString()]],
          ]);
          // that.props.handleFederalClickOnMap(
          //   'district',
          //   e.features[0].properties.code,
          // );
          // that.props.setMapViewBy('district');
        } else if (that.props.mapViewBy === 'district') {
          const getBbox = getCenterBboxDistrict(
            parseInt(e.features[0].properties.code, 10),
          );
          that.props.handleProvinceClick(
            parseInt(e.features[0].properties.code, 10),
          );
          // console.log(getBbox.bbox, 'bbox');
          map.fitBounds(getBbox.bbox);
          // that.props.handleProvinceClick(
          //   e.features[0].properties.code,
          // );
          map.setFilter('vector-tile-fill', [
            'in',
            ['get', 'code'],
            ['literal', [e.features[0].properties.code.toString()]],
          ]);

          // that.props.handleFederalClickOnMap(
          //   'municipality',
          //   e.features[0].properties.code,
          // );
          // that.props.setMapViewBy('municipality');
        } else if (that.props.mapViewBy === 'municipality') {
          const getBbox = getCenterBboxMunicipality(
            parseInt(e.features[0].properties.code, 10),
          );
          that.props.handleProvinceClick(
            parseInt(e.features[0].properties.code, 10),
          );
          map.fitBounds(getBbox.bbox);
          map.setFilter('vector-tile-fill', [
            'in',
            ['get', 'code'],
            ['literal', [e.features[0].properties.code.toString()]],
          ]);
          // that.props.handleProvinceClick(
          //   e.features[0].properties.code,
          // );
        }
      });
      map.on('mousemove', 'vector-tile-fill', function(e) {
        console.log(e.features[0]);
        const filteredCodeData = that.props.choroplethData.filter(
          data => {
            return (
              parseInt(data.code, 10) ===
              parseInt(e.features[0].properties.code, 10)
            );
          },
        );
        popup
          .setLngLat(e.lngLat)
          .setHTML(
            `<div class="leaflet-popup-content federal-popup" style="width: 100px;">
              <div class="map-popup-view">
                  <div class="map-popup-view-header">
                      <h5>${e.features[0].properties.name}</h5>
                      <h5>Code:${e.features[0].properties.code}</h5>
                      <h5>ID:${e.features[0].properties.id}</h5>
                      <div class="icons">
                      <i class="material-icons">tablet_mac</i><b>${filteredCodeData[0].count}</b>
                      </div>
                  </div>
                  <div class="map-view-footer">
                  </div>
                      </div>
                  </div>`,
          )
          .addTo(map);
      });
      map.on('mousemove', 'vector-tile-fill', function(e) {
        if (e.features.length > 0) {
          if (hoveredStateId) {
            map.setFeatureState(
              {
                source: 'municipality',
                sourceLayer: 'default',
                id: hoveredStateId,
              },
              { hover: false },
            );
          }
          hoveredStateId = e.features[0].id;
          map.setFeatureState(
            {
              source: 'municipality',
              sourceLayer: 'default',
              id: hoveredStateId,
            },
            { hover: true },
          );
        }
      });

      // When the mouse leaves the state-fill layer, update the feature state of the
      // previously hovered feature.
      map.on('mouseleave', 'vector-tile-fill', function() {
        if (hoveredStateId) {
          map.setFeatureState(
            {
              source: 'municipality',
              sourceLayer: 'default',
              id: hoveredStateId,
            },
            { hover: false },
          );
        }
        hoveredStateId = null;
      });
      map.on('mouseleave', 'vector-tile-fill', function() {
        // if (hoveredStateId) {
        // map.setFeatureState(
        // { source: 'municipality', sourceLayer: 'default', id: hoveredStateId },
        // { hover: false }
        // );
        // }
        // hoveredStateId = null;
        popup.remove();
      });

      // fullGeojsonProvince.features.forEach((item, index) => {
      //   that.props.choroplethData.forEach(p => {
      //     if (p.code === item.properties.code) {
      //       fullGeojsonProvince.features[index].properties = {
      //         ...item.properties,
      //         ...p,
      //       };
      //     }
      //   });
      // });
      //
      // // const testEl = createDonutChart(a,b);
      // let singleData = {};
      // let singleData2nd = {};
      // const total = [];
      // const total2nd = [];

      // // const getPointCount = features => {
      // //   features.forEach(f => {
      // //     if (f.properties.cluster) {
      // //       total.push(f.properties.point_count);
      // //     }
      // //   });

      // //   return total;
      // // };
      // fullGeojsonProvince.features.forEach(data => {
      //   //
      //   singleData2nd = {
      //     point_count: 0,
      //   };
      //   data.properties.pie.forEach(piedata => {
      //     //
      //     singleData2nd[`${piedata.investment_primary}`] =
      //       piedata.partner_count;
      //     singleData2nd.point_count += piedata.partner_count;
      //   });
      //   total2nd.push(singleData2nd.point_count);
      // });
      // //
      // fullGeojsonProvince.features.forEach(data => {
      //   //
      //   singleData = {
      //     point_count: 0,
      //   };
      //   data.properties.pie.forEach(piedata => {
      //     //
      //     singleData[`${piedata.investment_primary}`] =
      //       piedata.partner_count;
      //     singleData.point_count += piedata.partner_count;
      //   });
      //   total.push(singleData.point_count);
      //   //
      //   //
      //   const testElMain = document.createElement('div');
      //   testElMain.className = 'marker';
      //   const props = data.properties;
      //   // eslint-disable-next-line no-use-before-define
      //   const testEl = that.createDonutChart(singleData, total2nd);

      //   const marker = new mapboxgl.Marker({ element: testEl })
      //     .setLngLat(data.geometry.coordinates)
      //     .addTo(map);
      //   global.markerList.push(marker);
      // });
      // // global.marker.remove();
      // const withRadius = that.setCircleMarkerRadius(
      //   fullGeojsonProvince.features,
      //   that.props.mapViewDataBy,
      // );
      // that.createCircleLegend(fullGeojsonProvince.features);
      // that.createPieLegend();
      // fullGeojsonProvince.features = withRadius;
      //
      // const test = createDonutChart(a,b);
      //
      //

      // if (map.getSource('fullGeojsonProvince')) {
      //   map
      //     .getSource('fullGeojsonProvince')
      //     .setData(fullGeojsonProvince);
      // } else {
      //   map.addSource('fullGeojsonProvince', {
      //     type: 'geojson',
      //     data: fullGeojsonProvince,
      //   });
      //   map.addLayer({
      //     id: 'circles1',
      //     source: 'fullGeojsonProvince',
      //     type: 'circle',
      //     // 'source-layer': 'default',
      //     paint: {
      //       'circle-radius': ['get', 'radiusRange'],
      //       // 'circle-radius': 20,
      //       'circle-color': '#FFE300',
      //       'circle-opacity': 0.5,
      //       'circle-stroke-width': 0,
      //     },
      //     // filter: ['==', 'modelId', 1],
      //   });

      // map.addLayer({
      //   id: 'singles-count',
      //   type: 'symbol',
      //   source: 'fullGeojsonProvince',
      //   // filter: ["has", "singles_count"],
      //   layout: {
      //     'text-field': ['get', 'allocated_beneficiary'],
      //     'text-allow-overlap': true,
      //     'text-font': [
      //       'DIN Offc Pro Medium',
      //       'Arial Unicode MS Bold',
      //     ],
      //     'text-size': 12,
      //     'text-ignore-placement': true,
      //   },
      //   paint: {
      //     'text-color': '#000000',
      //     'text-halo-color': 'rgba(255,255,255,0.95)',
      //     'text-halo-width': 1.5,
      //     'text-halo-blur': 1,
      //   },
      // });
      // }
    });
  };

  componentDidMount() {
    this.changeGrades();
    this.plotVectorTile();
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      map,
      vectorTileUrl,
      circleMarkerData,
      mapViewBy,
      mapViewDataBy,
    } = this.props;

    if (prevProps.circleMarkerData !== circleMarkerData) {
      //
      removeMarker();
      if (this.props.pieSquareLegend.current.childNodes.length <= 0) {
        this.createPieLegend();
      }
      const viewBy =
        mapViewDataBy === 'allocated_beneficiary'
          ? 'total_beneficiary'
          : mapViewDataBy === 'allocated_budget'
          ? 'allocated_budget'
          : 'partner_count';
      if (mapViewBy === 'municipality') {
        if (mapViewDataBy !== '') {
          this.filterPieCharts(viewBy);
          // removeMarker();
          // alert('province Circlemarker');
          // fullGeojsonMunicipality.features.forEach((item, index) => {
          //   circleMarkerData.forEach(p => {
          //     if (p.code === item.properties.code) {
          //       fullGeojsonMunicipality.features[index].properties = {
          //         ...item.properties,
          //         ...p,
          //       };
          //     }
          //   });
          // });

          // let singleData = {};
          // let singleData2nd = {};
          // const total = [];
          // const total2nd = [];

          // fullGeojsonMunicipality.features.forEach(data => {
          //   //
          //   singleData2nd = {
          //     point_count: 0,
          //   };
          //   if (data.properties.pie) {
          //     data.properties.pie.forEach(piedata => {
          //       //
          //       singleData2nd[`${piedata.investment_primary}`] =
          //         piedata[`${viewBy}`];
          //       singleData2nd.point_count += piedata[`${viewBy}`];
          //     });
          //   }
          //   total2nd.push(singleData2nd.point_count);
          //   const allCount = [];
          //   Object.values(singleData2nd).forEach(singledata => {
          //     //
          //     allCount.push(singledata);
          //   });
          //   const sum = allCount.reduce(
          //     (partialSum, a) => partialSum + a,
          //     0,
          //   );
          //   // const min = Math.min.apply(null, allCount);
          //   // const max = Math.max.apply(null, allCount);
          //   // eslint-disable-next-line no-param-reassign
          //   // data.min = min;
          //   // eslint-disable-next-line no-param-reassign
          //   // data.max = max;
          //   // eslint-disable-next-line no-param-reassign
          //   data.total_sum = sum;
          // });

          // const totalSumList = [];
          // fullGeojsonMunicipality.features.forEach(fed => {
          //   totalSumList.push(fed.total_sum);
          // });
          // const min = Math.min.apply(null, totalSumList);
          // const max = Math.max.apply(null, totalSumList);

          // fullGeojsonMunicipality.features.forEach(data => {
          //   //
          //   singleData = {
          //     point_count: 0,
          //   };
          //   if (data.properties.pie) {
          //     data.properties.pie.forEach(piedata => {
          //       //
          //       singleData[`${piedata.investment_primary}`] =
          //         piedata[`${viewBy}`];
          //       singleData.point_count += piedata[`${viewBy}`];
          //     });
          //   }
          //   total.push(singleData.point_count);

          //   const radiusRange =
          //     // eslint-disable-next-line prettier/prettier
          //   (data.total_sum - min) / (max - min) *(30 - 10) + 10;
          //   const testElMain = document.createElement('div');
          //   testElMain.className = 'marker';
          //   // const props = data.properties;
          //   // eslint-disable-next-line no-use-before-define
          //   const testEl = this.createDonutChart(
          //     singleData,
          //     total2nd,
          //     radiusRange,
          //   );

          //   const marker = new mapboxgl.Marker({ element: testEl })
          //     .setLngLat(data.geometry.coordinates)
          //     .addTo(map);
          //   global.markerList.push(marker);
          // });
        }
      } else if (mapViewBy === 'district') {
        if (mapViewDataBy !== '') {
          this.filterPieCharts(viewBy);
          // removeMarker();
          // // alert('province Circlemarker');
          // fullGeojsonDistrict.features.forEach((item, index) => {
          //   circleMarkerData.forEach(p => {
          //     if (p.code === item.properties.code) {
          //       fullGeojsonDistrict.features[index].properties = {
          //         ...item.properties,
          //         ...p,
          //       };
          //     }
          //   });
          // });

          // let singleData = {};
          // let singleData2nd = {};
          // const total = [];
          // const total2nd = [];

          // fullGeojsonDistrict.features.forEach(data => {
          //   //
          //   singleData2nd = {
          //     point_count: 0,
          //   };
          //   if (data.properties.pie) {
          //     data.properties.pie.forEach(piedata => {
          //       //
          //       singleData2nd[`${piedata.investment_primary}`] =
          //         piedata[`${viewBy}`];
          //       singleData2nd.point_count += piedata[`${viewBy}`];
          //     });
          //   }
          //   total2nd.push(singleData2nd.point_count);
          //   const allCount = [];
          //   Object.values(singleData2nd).forEach(singledata => {
          //     //
          //     allCount.push(singledata);
          //   });
          //   const sum = allCount.reduce(
          //     (partialSum, a) => partialSum + a,
          //     0,
          //   );
          //   // const min = Math.min.apply(null, allCount);
          //   // const max = Math.max.apply(null, allCount);
          //   // eslint-disable-next-line no-param-reassign
          //   // data.min = min;
          //   // eslint-disable-next-line no-param-reassign
          //   // data.max = max;
          //   // eslint-disable-next-line no-param-reassign
          //   data.total_sum = sum;
          // });

          // const totalSumList = [];
          // fullGeojsonDistrict.features.forEach(fed => {
          //   totalSumList.push(fed.total_sum);
          // });
          // const min = Math.min.apply(null, totalSumList);
          // const max = Math.max.apply(null, totalSumList);

          // fullGeojsonDistrict.features.forEach(data => {
          //   //
          //   singleData = {
          //     point_count: 0,
          //   };
          //   if (data.properties.pie) {
          //     data.properties.pie.forEach(piedata => {
          //       //
          //       singleData[`${piedata.investment_primary}`] =
          //         piedata[`${viewBy}`];
          //       singleData.point_count += piedata[`${viewBy}`];
          //     });
          //   }
          //   total.push(singleData.point_count);

          //   const radiusRange =
          //     // eslint-disable-next-line prettier/prettier
          //   (data.total_sum - min) / (max - min) *(30 - 10) + 10;
          //   const testElMain = document.createElement('div');
          //   testElMain.className = 'marker';
          //   // const props = data.properties;
          //   // eslint-disable-next-line no-use-before-define
          //   const testEl = this.createDonutChart(
          //     singleData,
          //     total2nd,
          //     radiusRange,
          //   );

          //   const marker = new mapboxgl.Marker({ element: testEl })
          //     .setLngLat(data.geometry.coordinates)
          //     .addTo(map);
          //   global.markerList.push(marker);
          // });
        }
      } else if (mapViewBy === 'province') {
        // eslint-disable-next-line no-inner-declarations
        this.filterPieCharts(viewBy);

        // removeMarker();
        // const FinalGeojson = { ...fullGeojsonProvince };
        // // console.log(circleMarkerData, 'circleMarkerData Province');
        // // alert('province Circlemarker');
        // // console.log(fullGeojsonProvince, 'fullGeojsonProv');
        // // console.log(circleMarkerData, 'circleMarkerData');
        // FinalGeojson.features.forEach((item, index) => {
        //   circleMarkerData.forEach(p => {
        //     if (p.code === item.properties.code) {
        //       FinalGeojson.features[index].properties = {
        //         ...item.properties,
        //         ...p,
        //       };
        //     }
        //   });
        // });
        // const myArrayFiltered = FinalGeojson.features.filter(el => {
        //   return circleMarkerData.some(f => {
        //     return f.code === el.properties.code;
        //   });
        // });
        // FinalGeojson.features = myArrayFiltered;

        // // console.log(r, 'r');
        // let singleData = {};
        // let singleData2nd = {};
        // const total = [];
        // const total2nd = [];
        // FinalGeojson.features.forEach(data => {
        //   //
        //   singleData2nd = {
        //     point_count: 0,
        //   };
        //   if (data.properties.pie) {
        //     data.properties.pie.forEach(piedata => {
        //       //
        //       singleData2nd[`${piedata.investment_primary}`] =
        //         piedata[`${viewBy}`];
        //       singleData2nd.point_count += piedata[`${viewBy}`];
        //     });
        //   }
        //   total2nd.push(singleData2nd.point_count);
        //   const allCount = [];
        //   Object.values(singleData2nd).forEach(singledata => {
        //     //
        //     allCount.push(singledata);
        //   });
        //   const sum = allCount.reduce(
        //     (partialSum, a) => partialSum + a,
        //     0,
        //   );
        //   // const min = Math.min.apply(null, allCount);
        //   // const max = Math.max.apply(null, allCount);
        //   // eslint-disable-next-line no-param-reassign
        //   // data.min = min;
        //   // eslint-disable-next-line no-param-reassign
        //   // data.max = max;
        //   // eslint-disable-next-line no-param-reassign
        //   data.total_sum = sum;
        // });
        // const totalSumList = [];
        // FinalGeojson.features.forEach(fed => {
        //   totalSumList.push(fed.total_sum);
        // });
        // const min = Math.min.apply(null, totalSumList);
        // const max = Math.max.apply(null, totalSumList);
        // FinalGeojson.features.forEach(data => {
        //   //
        //   singleData = {
        //     point_count: 0,
        //   };
        //   if (data.properties.pie) {
        //     data.properties.pie.forEach(piedata => {
        //       //
        //       singleData[`${piedata.investment_primary}`] =
        //         piedata[`${viewBy}`];
        //       singleData.point_count += piedata[`${viewBy}`];
        //     });
        //   }
        //   total.push(singleData.point_count);
        //   const radiusRange =
        //     // eslint-disable-next-line prettier/prettier
        //     (data.total_sum - min) / (max - min) *(30 - 10) + 10;
        //   const testElMain = document.createElement('div');
        //   testElMain.className = 'marker';

        //   console.log(singleData, 'singleDataProv');
        //   // const props = data.properties;
        //   // eslint-disable-next-line no-use-before-define
        //   const testEl = this.createDonutChart(
        //     singleData,
        //     total2nd,
        //     radiusRange,
        //   );
        //   const marker = new mapboxgl.Marker({ element: testEl })
        //     .setLngLat(data.geometry.coordinates)
        //     .addTo(map);
        //   global.markerList.push(marker);
        // });
      }

      const FederalData =
        mapViewBy === 'municipality'
          ? fullGeojsonMunicipality
          : mapViewBy === 'district'
          ? fullGeojsonDistrict
          : fullGeojsonProvince;

      if (mapViewDataBy === 'investment_focus') {
        this.filterPieCharts(viewBy);
      } else if (mapViewDataBy === 'allocated_beneficiary') {
        this.filterPieCharts(viewBy);
      } else if (mapViewDataBy === 'allocated_budget') {
        this.filterPieCharts(viewBy);
      }
      // const test = this.createDonutChart(a, b);
    }
    if (prevProps.choroplethData !== this.props.choroplethData) {
      // map.addLayer({
      //   id: 'circle-tile-label',
      //   type: 'symbol',
      //   source: 'fullGeojsonProvince',
      //   'source-layer': 'default',
      //   layout: {
      //     'text-field': 'v',
      //     'icon-image': ['concat', ['get', 'icon'], '-15'],
      //     'text-anchor': 'center',
      //     'text-offset': [0, 0],
      //     'symbol-placement': 'point',
      //     'text-justify': 'center',
      //     'text-size': 10,
      //   },
      //   paint: {
      //     'text-color': '#666',
      //     'text-halo-color': 'rgba(255,255,255,0.95)',
      //     'text-halo-width': 1.5,
      //     'text-halo-blur': 1,
      //   },
      // });

      this.changeGrades();
      setTimeout(() => {
        //
        //
        map.setPaintProperty(
          'vector-tile-fill',
          'fill-color',
          this.state.finalStyle,
        );
      }, 2000);
    }
    if (prevProps.vectorTileUrl !== this.props.vectorTileUrl) {
      //
      // this.changeGrades();

      const newStyle = map.getStyle();
      newStyle.sources.municipality.tiles = [
        this.props.vectorTileUrl,
      ];
      map.setStyle(newStyle);
      // district.forEach(function(marker) {
      //   // create a DOM element for the marker
      //   const el = document.createElement('div');
      //   el.className = 'marker circle';
      //   // el.style.backgroundImage = `url(https://placekitten.com/g/${marker.districtid})`;
      //   el.style.width = `24px`;
      //   el.style.height = `24px`;
      //   // el.innerHTML = '23';
      //   el.addEventListener('click', function() {
      //     window.alert(marker.districtid);
      //   });

      //   // add marker to map
      //   new mapboxgl.Marker(el)
      //     .setLngLat([marker.centroid_x, marker.centroid_y])
      //     .addTo(map);
      // });
      // map.removeSource('municipality');

      // setTimeout(() => {
      //   map.addSource('municipality', {'type': 'vector',
      // // 'interactive':true,
      // 'tiles': [this.props.vectorTileUrl?this.props.vectorTileUrl:"https://vectortile.naxa.com.np/federal/province.mvt/?tile={z}/{x}/{y}"],//"https://apps.naxa.com.np/geoserver/gwc/service/wmts?REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0&LAYER=Naxa:educationpoint&STYLE=&TILEMATRIX=EPSG:900913:{z}&TILEMATRIXSET=EPSG:900913&FORMAT=application/vnd.mapbox-vector-tile&TILECOL={x}&TILEROW={y}"],
      // 'minzoom': 0,
      // 'maxzoom': 20,
      // "promoteId": {"default": "code"}});
      // }, 200);
      // this.plotVectorTile();
    }
    if (prevProps.vectorTileUrl !== vectorTileUrl) {
      // this.changeGrades();
      this.plotVectorTile();
    }
    // if (prevState.finalStyle !== this.state.finalStyle) {
    // }
  }

  getYear = minDate => {
    const d = new Date(minDate);

    const day = d.getDate();
    const month = d.getMonth() + 1; // Since getMonth() returns month from 0-11 not 1-12
    const year = d.getFullYear();

    const dateStr = `${month}/${day}/${year}`;
    // time = dateStr;
    //
    // this.setState({ time: dateStr });
    return dateStr;
  };

  playBtn = (min, max) => {
    setTimeout(() => {
      this.setState({
        minValue: this.getYear(min),
        maxValue: this.getYear(max),
        key: timelineKey,
        playClick: true,
      });
      timelineKey += 1;
    }, 10000);
    // global.timerId = null;
  };

  getShortNumbers = (n, d) => {
    let x = `${n}`.length;
    // eslint-disable-next-line no-restricted-properties
    const p = Math.pow;
    // eslint-disable-next-line no-param-reassign
    d = p(10, d);
    x -= x % 3;
    return Math.round((n * d) / p(10, x)) / d + ' kMGTPE'[x / 3];
  };

  render() {
    const { mapViewBy } = this.props;
    const {
      choroplethLegend,
      legendColors,
      minValue,
      maxValue,
      key,
      playClick,
      circleMarkerRadius,
    } = this.state;
    return (
      <>
        <div className="map-legend newmap-legend">
          <div className="color-list">
            <h6>Number of Projects</h6>
            <ul id="state-legend" className="color-legend">
              {this.state.grade &&
                this.state.grade.map((grade, i) => {
                  let hideLastdiv = false;
                  hideLastdiv =
                    i === this.state.grade.length - 1 ? true : false;
                  const grade1 =
                    grade < 1000
                      ? grade.toString()
                      : this.getShortNumbers(grade, 1);
                  // uncomment this to add vertical legend
                  // return <div><div style={{width:"12px", height:"12px", backgroundColor: this.getLegendColor(this.state.grade[i] + 1), border:"solid 1px #e2e2e2", display:"inline-block"}}></div> <span>{this.state.grade[i]} {this.state.grade[i + 1]?"-"+this.state.grade[i + 1]: "+"}</span></div>
                  // uncomment this to add horizontal legend
                  // return <div style={{display:"inline-block"}}><div style={{width:"12px", height:"12px", backgroundColor: this.getLegendColor(this.state.grade[i] + 1), border:"solid 1px #e2e2e2", display:"inline-block", marginLeft:"5px"}}></div> <span >{this.state.grade[i]} {this.state.grade[i + 1]?"-"+this.state.grade[i + 1]: "+"}</span></div>
                  // uncomment this to add nice horizontal legend
                  return (
                    <li>
                      <div
                        style={{
                          backgroundColor: hideLastdiv
                            ? 'transparent'
                            : this.getLegendColor(grade + 1),
                        }}
                        className="color color1"
                      />
                      <span
                        style={{
                          marginLeft:
                            grade1.trim().length === 1
                              ? -2
                              : grade1.trim().length === 2
                              ? -8
                              : -12,
                        }}
                      >
                        {grade1}
                      </span>
                    </li>
                  );
                })}
              {/* <li>
                <div style={{ 'background-color': '#723122' }} className="color" />
                <span>25,000,000</span>
              </li>
              <li>
                <div style={{ 'background-color': '#8B4225' }} className="color" />
                <span>10,000,000</span>
              </li>
              <li>
                <div style={{ 'background-color': '#A25626' }} className="color" />
                <span>7,300,000</span>
              </li>
              <li>
                <div style={{ 'background-color': '#B86B25' }} className="color" />
                <span>5,000,000</span>
              </li>
              <li>
                <div style={{ 'background-color': '#CA8323' }} className="color" />
                <span>2,500,000</span>
              </li>
              <li>
                <div className="color" style={{ 'background-color': '#DA9C20' }} />
                <span>1,000,000</span>
              </li>
              <li>
                <div style={{ 'background-color': '#E6B71E' }} className="color" />
                <span>750,000</span>
              </li>
              <li>
                <div style={{ 'background-color': '#EED322' }} className="color" />
                <span>500,000</span>
              </li>
              <li>
                <div style={{ 'background-color': '#F2F12D' }} className="color" />
                <span> 0</span>
              </li> */}
            </ul>
          </div>
          {/* <div className="overlay-data">
            <h6>overlay data</h6>
            <div className="widget-tag">
              <a href="#">
                <i className="material-icons">store</i>
                <span>Branch</span>
              </a>
              <a href="#">
                <i className="material-icons">store</i>
                <span>BLB</span>
              </a>
              <a href="#">
                <i className="material-icons">store</i>
                <span>Extention Counter</span>
              </a>
              <a href="#">
                <i className="material-icons">tablet</i>
                <span>Tablet</span>
              </a>
              <a href="#">
                <i className="material-icons">store</i>
                <span>Other major product</span>
              </a>
            </div>
          </div> */}
        </div>
        <TimelineChart
          minValue={minValue}
          maxValue={maxValue}
          playBtn={this.playBtn}
          mapViewBy={mapViewBy}
        />
      </>
    );
  }
}
const mapStateToProps = ({ partnershipReducer }) => ({
  partnershipReducer,
});

export default connect(mapStateToProps, {})(Choropleth);
