import React, {
  useState,
  useRef,
  useLayoutEffect,
  useEffect,
} from 'react';
import LeftPortion from './LeftPortion';
import RightPortion from './RightPortion';
import PlotLines from './CreateLines/PlotLines';
import generateMiddleLines from './CreateLines/generateMiddleLines';
import { lineData, allConnections } from './CreateLines/lines.data';
import generateLeftLines from './CreateLines/generateLeftLines';
import generateRightLines from './CreateLines/generateRightLines';
import { isArrayEmpty } from '../utils/utilities';
import generateIndirectLines from './CreateLines/generateIndirectLines';
import generateLeftToRightIndirectLines from './CreateLines/generateLeftToRightIndirectLines';
import generateLeftToRightLinesAll from './CreateLines/generateLeftToRightLinesAll';
import generateRightLinesAll from './CreateLines/generateRightLinesAll';

const width = 235;
const defaultColor = '#FF6D00';
const color = {
  leftRefs: [
    { ref: 0, color: '#FF6D00' },
    { ref: 1, color: '#FF6D00' },
    { ref: 2, color: '#FF6D00' },
  ],
  rightRefs: [
    { ref: 0, color: '#E11D3F' },
    { ref: 1, color: '#E11D3F' },
    { ref: 2, color: '#FF6D00' },
    { ref: 3, color: '#13A8BE' },
    { ref: 4, color: '#1EC853' },
  ],
};

const DiagramSection = () => {
  const containerRef = useRef();
  const leftCardRefs = useRef({});
  const rightCardRefs = useRef({});
  const middleSVGContainerRef = useRef(null);
  const leftSVGContainerRef = useRef(null);
  const leftSideContainerRef = useRef(null);
  const [leftCoordinates, setLeftCoordinates] = useState([]);
  const [
    leftToRightCoordinates,
    setLeftToRightCoordinates,
  ] = useState([]);
  const [
    leftToRightIndirectCoordinates,
    setLeftToRigthIndirectCoordinates,
  ] = useState([]);
  const [rightCoordinates, setRightCoordinates] = useState([]);
  const [indirectCoordinates, setIndirectCoordinates] = useState([]);

  const [isLeftCardSelected, setIsLeftCardSelected] = useState(true);
  const [selectedCardRef, setSelectedCardRef] = useState(null);
  const [lineColor, setLineColor] = useState(defaultColor);
  const [showAllLines, setShowAllLines] = useState(false);

  const getMiddleLines = ({
    leftRefLinks,
    rightRefLinks,
    indirectLinkLeftToRight,
  }) => {
    const middleSVGRect = middleSVGContainerRef.current.getBoundingClientRect();
    const leftRects = [];
    const rightRects = [];
    let indirectLeftToRightRect = [];

    leftRefLinks.forEach(item => {
      leftRects.push(
        leftCardRefs.current[item].getBoundingClientRect(),
      );
    });

    rightRefLinks.forEach(item => {
      rightRects.push(
        rightCardRefs.current[item].getBoundingClientRect(),
      );
    });

    if (!isArrayEmpty(indirectLinkLeftToRight)) {
      const rect1 = leftCardRefs.current[
        indirectLinkLeftToRight[0]
      ].getBoundingClientRect();
      const rect2 = rightCardRefs.current[
        indirectLinkLeftToRight[1]
      ].getBoundingClientRect();
      indirectLeftToRightRect = [rect1, rect2];
      const newIndirectCoordinates = generateLeftToRightIndirectLines(
        middleSVGRect,
        indirectLeftToRightRect,
      );
      setLeftToRigthIndirectCoordinates(newIndirectCoordinates);
    } else {
      setLeftToRigthIndirectCoordinates([]);
    }

    const containerWidth = width;

    const newCoordinates = generateMiddleLines(
      middleSVGRect,
      leftRects,
      rightRects,
      containerWidth,
    );

    setLeftToRightCoordinates(newCoordinates);
  };

  const getLeftLines = ({ leftToLeftLink }) => {
    if (!isArrayEmpty(leftToLeftLink)) {
      const leftSVGRect = leftSVGContainerRef.current.getBoundingClientRect();
      const rects = [];
      leftToLeftLink.forEach(item => {
        const rect1 = leftCardRefs.current[
          item[0]
        ].getBoundingClientRect();
        const rect2 = leftCardRefs.current[
          item[1]
        ].getBoundingClientRect();
        rects.push({ rect1, rect2 });
      });

      const newCoordinates = generateLeftLines(leftSVGRect, rects);

      setLeftCoordinates(newCoordinates);
    } else {
      setLeftCoordinates([]);
    }
  };

  const getRightLines = ({ rightToRightLink }) => {
    if (!isArrayEmpty(rightToRightLink)) {
      const middleSVGRect = middleSVGContainerRef.current.getBoundingClientRect();
      const rects = [];
      rightToRightLink.forEach(item => {
        const rect1 = rightCardRefs.current[
          item[0]
        ].getBoundingClientRect();
        const rect2 = rightCardRefs.current[
          item[1]
        ].getBoundingClientRect();
        rects.push({ rect1, rect2 });
      });
      const containerWidth = width;
      const newCoordinates = generateRightLines(
        middleSVGRect,
        rects,
        containerWidth,
      );

      setRightCoordinates(newCoordinates);
    }
  };
  const getIndirectLines = ({ indirectLink }) => {
    if (!isArrayEmpty(indirectLink)) {
      const middleSVGRect = middleSVGContainerRef.current.getBoundingClientRect();
      const rects = [];
      // indirectLink.forEach(item => {
      const rect1 = rightCardRefs.current[
        indirectLink[0]
      ].getBoundingClientRect();
      const rect2 = rightCardRefs.current[
        indirectLink[1]
      ].getBoundingClientRect();
      rects.push({ rect1, rect2 });
      // });
      const containerWidth = width;
      const newCoordinates = generateIndirectLines(
        middleSVGRect,
        rects,
        containerWidth,
      );

      setIndirectCoordinates(newCoordinates);
    } else {
      setIndirectCoordinates([]);
    }
  };

  const getLeftToRightLinesAll = ({ leftToRightLink }) => {
    const middleSVGRect = middleSVGContainerRef.current.getBoundingClientRect();
    const refs = [];
    leftToRightLink.forEach(item => {
      const leftRef = leftCardRefs.current[
        item.from
      ].getBoundingClientRect();
      const rightRef = item.to.map(x =>
        rightCardRefs.current[x].getBoundingClientRect(),
      );

      refs.push({ leftRef, rightRef });
    });

    const newCoordinates = generateLeftToRightLinesAll(
      middleSVGRect,
      refs,
    );

    setLeftToRightCoordinates(newCoordinates);
  };

  const getRightLinesAll = ({ rightToRightLink }) => {
    const middleSVGRect = middleSVGContainerRef.current.getBoundingClientRect();
    const refs = [];
    rightToRightLink.forEach(item => {
      const tempRef = [];
      item.forEach(x => {
        const rect1 = rightCardRefs.current[
          x[0]
        ].getBoundingClientRect();
        const rect2 = rightCardRefs.current[
          x[1]
        ].getBoundingClientRect();
        tempRef.push({ rect1, rect2 });
      });
      refs.push(tempRef);
    });

    const containerWidth = width;

    const newCoordinates = generateRightLinesAll(
      middleSVGRect,
      refs,
      containerWidth,
    );

    setRightCoordinates(newCoordinates);
  };

  const clearAllLines = () => {
    setLeftCoordinates([]);
    setLeftToRightCoordinates([]);
    setLeftToRigthIndirectCoordinates([]);
    setRightCoordinates([]);
    setIndirectCoordinates([]);
  };

  useLayoutEffect(() => {
    setTimeout(() => {
      getLeftToRightLinesAll(allConnections);
      getLeftLines(allConnections);
      getRightLinesAll(allConnections);
    }, 400);
  }, []);

  useLayoutEffect(() => {
    if (showAllLines) {
      getLeftToRightLinesAll(allConnections);
      getLeftLines(allConnections);
      getRightLinesAll(allConnections);
    }
  }, [showAllLines]);

  useLayoutEffect(() => {
    const data = lineData.filter(item =>
      isLeftCardSelected
        ? item.leftRef === selectedCardRef
        : item.rightRef === selectedCardRef,
    );
    if (!isArrayEmpty(data)) {
      getMiddleLines(data[0]);
      getLeftLines(data[0]);
      getRightLines(data[0]);
      getIndirectLines(data[0]);
    }
  }, [selectedCardRef, isLeftCardSelected]);

  const onLeftCardClick = ref => {
    clearAllLines();

    if (isLeftCardSelected && ref === selectedCardRef) {
      setLineColor(defaultColor);
      // setShowAllLines(prev => !prev);
      setShowAllLines(true);
      setSelectedCardRef(null);
    } else {
      const newColor = color.leftRefs
        .filter(item => item.ref === ref)
        .map(item => item.color)[0];

      setShowAllLines(false);
      setLineColor(newColor);
      setIsLeftCardSelected(true);
      setSelectedCardRef(ref);
    }
  };

  const onRightCardClick = ref => {
    clearAllLines();

    if (!isLeftCardSelected && ref === selectedCardRef) {
      setLineColor(defaultColor);
      // setShowAllLines(prev => !prev);
      setShowAllLines(true);
      setSelectedCardRef(null);
    } else {
      const newColor = color.rightRefs
        .filter(item => item.ref === ref)
        .map(item => item.color)[0];

      setShowAllLines(false);
      setLineColor(newColor);
      setIsLeftCardSelected(false);
      setSelectedCardRef(ref);
    }
  };

  return (
    <main
      id="payment-diagram"
      className="payment-system"
      ref={containerRef}
      style={{ zIndex: 0 }}
    >
      <LeftPortion
        leftCardRefs={leftCardRefs}
        leftSideContainerRef={leftSideContainerRef}
        leftSVGContainerRef={leftSVGContainerRef}
        coordinates={leftCoordinates}
        onLeftCardClick={onLeftCardClick}
        lineColor={lineColor}
        selectedCardRef={selectedCardRef}
        isLeftCardSelected={isLeftCardSelected}
      />
      <div
        style={{
          width: '235px',
          height: '675px',
          alignSelf: 'flex-start',
          zIndex: 1,
        }}
        ref={middleSVGContainerRef}
      >
        <PlotLines
          lineColor={lineColor}
          coordinates={leftToRightCoordinates}
          rightCoordinates={rightCoordinates}
          indirectCoordinates={indirectCoordinates}
          leftToRightIndirectCoordinates={
            leftToRightIndirectCoordinates
          }
          width={width}
        />
      </div>
      <RightPortion
        rightCardRefs={rightCardRefs}
        onRightCardClick={onRightCardClick}
        selectedCardRef={selectedCardRef}
        isLeftCardSelected={isLeftCardSelected}
      />
    </main>
  );
};

export default DiagramSection;
