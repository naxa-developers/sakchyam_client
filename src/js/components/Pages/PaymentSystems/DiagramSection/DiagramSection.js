import React, { useState, useEffect, useRef } from 'react';
import LeftPortion from './LeftPortion';
import RightPortion from './RightPortion';
import SVGLines from './SVGLines';

const DiagramSection = () => {
  const [containerDimension, setContainerDimension] = useState({});
  const containerRef = useRef();
  const cardRefs = useRef({});

  useEffect(() => {
    const mainRect = containerRef.current;
    const mainBoundingRect = mainRect.getBoundingClientRect();

    const { height, width } = mainBoundingRect;

    setContainerDimension({ height, width });
  }, []);

  useEffect(() => {
    console.log(cardRefs, 'refs');
  }, []);

  return (
    <main className="payment-system" ref={containerRef}>
      <LeftPortion refs={cardRefs} />

      <SVGLines dimension={containerDimension} data={[]} />

      <RightPortion />
    </main>
  );
};

export default DiagramSection;
