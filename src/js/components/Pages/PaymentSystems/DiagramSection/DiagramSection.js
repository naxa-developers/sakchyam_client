import React, {
  useState,
  useEffect,
  useRef,
  useLayoutEffect,
} from 'react';
import LeftPortion from './LeftPortion';
import RightPortion from './RightPortion';
import PlotLines from './CreateLines/PlotLines';
import generateMiddleLines from './CreateLines/generateMiddleLines';

const DiagramSection = () => {
  const [containerDimension, setContainerDimension] = useState({});
  const containerRef = useRef();
  const leftCardRefs = useRef({});
  const rightCardRefs = useRef({});
  const svgContainerRef = useRef(null);

  const leftSideContainerRef = useRef(null);
  const rtgsRef = useRef(null);
  const CSPRef = useRef(null);
  const BFISRef = useRef(null);

  const [coordinates, setCoordinates] = useState({});

  // container refs for svg height and width
  useEffect(() => {
    const mainRect = containerRef.current;
    const mainBoundingRect = mainRect.getBoundingClientRect();

    const { height, width } = mainBoundingRect;

    // setContainerDimension({ height, width });
  }, []);

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

  //   const scale = d3
  //     .scaleLinear()
  //     .domain([svgRect.top, svgRect.top + svgRect.height])
  //     .range([0, svgRect.height]);

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

  useLayoutEffect(() => {
    const svgRect = svgContainerRef.current.getBoundingClientRect();
    const leftRect = leftCardRefs.current[0].getBoundingClientRect();
    const rightRect = rightCardRefs.current[2].getBoundingClientRect();

    const obj = {
      svgRect,
      leftRects: [leftRect],
      rightRects: [rightRect],
    };

    const newCoordinates = generateMiddleLines(
      svgRect,
      leftRect,
      rightRect,
    );

    setContainerDimension({ width: 180, height: 100 });

    setCoordinates(newCoordinates);
  }, []);

  // useEffect(() => {
  // const rect1 = leftCardRefs.current[0];
  // const rect2 = rightCardRefs.current[0];
  // const rect3 = rightCardRefs.current[1];
  // const rect3 = divRef3.current;
  // const boundingRect1 = rect1.getBoundingClientRect();
  // const boundingRect2 = rect2.getBoundingClientRect();
  // const boundingRect3 = rect3.getBoundingClientRect();

  // const data1 = generateLines([
  //   { boundingRect1, boundingRect2 },
  //   // { boundingRect1, boundingRect2: boundingRect3 },
  // ]);

  // setData(data1);
  // }, []);

  return (
    <main className="payment-system" ref={containerRef}>
      <LeftPortion
        leftCardRefs={leftCardRefs}
        leftSideContainerRef={leftSideContainerRef}
        rtgsRef={rtgsRef}
      />

      {/* <SVGLines dimension={containerDimension} data={data} /> */}

      <PlotLines
        svgContainerRef={svgContainerRef}
        dimension={containerDimension}
        data={coordinates}
      />

      <RightPortion
        rightCardRefs={rightCardRefs}
        CSPRef={CSPRef}
        BFISRef={BFISRef}
      />
    </main>
  );
};

export default DiagramSection;
