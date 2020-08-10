import React, { useState, useRef, useLayoutEffect } from 'react';
import * as d3 from 'd3';
import LeftPortion from './LeftPortion';
import RightPortion from './RightPortion';
import PlotLines from './CreateLines/PlotLines';
import generateMiddleLines from './CreateLines/generateMiddleLines';
import { middleLineData, lineData } from './CreateLines/lines.data';
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
  const [leftCoordinates, setLeftCoordinates] = useState([]);
  const [rightCoordinates, setRightCoordinates] = useState([]);

  const selectedCardRef = useState(0);

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

    setLeftCoordinates(newCoordinates);
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
    setRightCoordinates(newCoordinates);
  }, []);

  useLayoutEffect(() => {
    const data = lineData.filter(
      item => item.leftRef === selectedCardRef,
    );
    console.log(data, 'datax');
  }, []);

  return (
    <main className="payment-system" ref={containerRef}>
      <LeftPortion
        leftCardRefs={leftCardRefs}
        leftSideContainerRef={leftSideContainerRef}
        leftSVGContainerRef={leftSVGContainerRef}
        coordinates={leftCoordinates}
      />

      <PlotLines
        svgContainerRef={middleSVGContainerRef}
        dimension={containerDimension}
        coordinates={rightCoordinates}
      />

      <RightPortion rightCardRefs={rightCardRefs} />
    </main>
  );
};

export default DiagramSection;
