import * as d3 from 'd3';

const generateLeftToRightIndirectLines = (
  svgRect,
  indirectLeftToRightRect,
) => {
  const scale = d3
    .scaleLinear()
    .domain([svgRect.top, svgRect.top + svgRect.height])
    .range([0, svgRect.height]);

  const y1 = scale(
    indirectLeftToRightRect[0].top +
      indirectLeftToRightRect[0].height * 0.5,
  );
  const y2 = scale(
    indirectLeftToRightRect[1].top +
      indirectLeftToRightRect[1].height * 0.7,
  );

  const indirectCoordinates = [{ y1, y2 }];

  return indirectCoordinates;
};

export default generateLeftToRightIndirectLines;

// function rough({
//   svgRect,
//   source,
//   target,
//   sourcePosition = 0.5,
//   targetPosition = 0.5,
// }) {

//   return y1, y2;
// }
