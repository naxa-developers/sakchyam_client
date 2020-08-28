import React from 'react';
import Sunburst from './SunBurst';

export default function SunburstContainer(props) {
  return (
    <>
      <Sunburst
        domId={props.domId}
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
