import React, { useState, useRef, useLayoutEffect } from 'react';
import * as d3 from 'd3';
import LeftPortion from './LeftPortion';
import RightPortion from './RightPortion';
import PlotLines from './CreateLines/PlotLines';
import generateMiddleLines from './CreateLines/generateMiddleLines';
import { middleLineData } from './CreateLines/lines.data';
import PlotLeftLines from './CreateLines/PlotLeftLines';
import generateLeftLines from './CreateLines/generateLeftLines';

const DiagramSection = () => {
  const [containerDimension, setContainerDimension] = useState({});
  const containerRef = useRef();
  const leftCardRefs = useRef({});
  const rightCardRefs = useRef({});
  const middleSVGContainerRef = useRef(null);
  const leftSVGContainerRef = useRef(null);
  const leftSideContainerRef = useRef(null);
  const [coordinates, setCoordinates] = useState([]);

  // middle section lines
  // useLayoutEffect(() => {
  //   const svgRect = svgContainerRef.current.getBoundingClientRect();
  //   const leftSideContainerRect = leftSideContainerRef.current.getBoundingClientRect();
  //   const rtgsRect = rtgsRef.current.getBoundingClientRect();
  //   const bfisRect = BFISRef.current.getBoundingClientRect();
  //   const cspRect = CSPRef.current.getBoundingClientRect();
  //   // console.log(svgRect.top, 'rtgs');

  //   const leftSideDifference =
  //     leftSideContainerRect.top - svgRect.top;
  //   // const rightSideDifference =
  //   //   leftSideContainerRect.top - svgRect.top;

  // const scale = d3
  //   .scaleLinear()
  //   .domain([svgRect.top, svgRect.top + svgRect.height])
  //   .range([0, svgRect.height]);

  //   const newCoordinates = {};
  //   // newCoordinates.rtgsX = rtgsRect.right + 15;
  //   newCoordinates.rtgsY = scale(
  //     // leftSideDifference +
  //     // rtgsRect.top -
  //     // leftSideContainerRect.top +
  //     rtgsRect.top + rtgsRect.height / 2,
  //   );
  //   // newCoordinates.bfisX = bfisRect.left - 30;
  //   newCoordinates.bfisy = scale(bfisRect.top + bfisRect.height / 2);
  //   // newCoordinates.cspX = cspRect.left - 30;
  //   newCoordinates.cspY = scale(cspRect.top + cspRect.height / 2);

  //   // const width = cspRect.left - rtgsRect.right;
  //   const width = 180;

  //   setContainerDimension({ width, height: '100' });
  //   console.log(newCoordinates, 'newx');
  //   // setCoordinates(newCoordinates);
  // }, []);

  // left portion svg lines
  useLayoutEffect(() => {
    const leftSVGRect = leftSVGContainerRef.current.getBoundingClientRect();
    const rect1 = leftCardRefs.current[2].getBoundingClientRect();
    const rect2 = leftCardRefs.current[0].getBoundingClientRect();

    const newCoordinates = generateLeftLines(
      leftSVGRect,
      rect1,
      rect2,
    );

    setCoordinates(newCoordinates);
  }, []);

  useLayoutEffect(() => {
    const svgRect = middleSVGContainerRef.current.getBoundingClientRect();
    const leftRects = [];
    const rightRects = [];

    middleLineData.forEach(item => {
      leftRects.push(
        leftCardRefs.current[item.leftIndex].getBoundingClientRect(),
      );
      rightRects.push(
        rightCardRefs.current[
          item.rightIndex
        ].getBoundingClientRect(),
      );
    });

    const newCoordinates = generateMiddleLines(
      svgRect,
      leftRects,
      rightRects,
    );

    setContainerDimension({ width: 180, height: 100 });
    // setCoordinates(newCoordinates);
  }, []);

  return (
    <main className="payment-system" ref={containerRef}>
      <LeftPortion
        leftCardRefs={leftCardRefs}
        leftSideContainerRef={leftSideContainerRef}
        leftSVGContainerRef={leftSVGContainerRef}
        coordinates={coordinates}
      />

      <PlotLines
        svgContainerRef={middleSVGContainerRef}
        dimension={containerDimension}
        coordinates={coordinates}
      />

      <RightPortion rightCardRefs={rightCardRefs} />
    </main>
  );
};

export default DiagramSection;
