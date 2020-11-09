import React from 'react';
import ReactApexChart from 'react-apexcharts';

export default function Achart(props) {
  return props.series.length === 0 ? null : (
    <ReactApexChart
      // key={Partnerseries}
      options={props.options}
      series={props.series}
      type={props.type}
      height={props.height}
    />
  );
}
