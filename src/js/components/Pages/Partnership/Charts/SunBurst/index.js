import React from 'react';
import Sunburst from './SunBurst';

export default function SunburstContainer(props) {
  return (
    <>
      <Sunburst
        data={props.data}
        height={props.height}
        width={props.width}
        count_member="size"
        onClick={props.onClick}
        activeModal={props.activeModal}
      />
    </>
  );
}
