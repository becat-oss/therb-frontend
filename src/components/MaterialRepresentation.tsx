import React from "react";

interface MaterialRepresentationProps {
  materialHeights: number[];
  length: number
}

export default function MaterialRepresentation({
  materialHeights, length
}: MaterialRepresentationProps) {
  let maxX = 0;
  let maxY = 0;
  const getPolygons = (heights: number[], width: number): string[] => {
    const polygons = [];
    let accumulatedHeight = 0;
    for (const height of heights) {
      const points = [
        [0, accumulatedHeight],
        [width, accumulatedHeight],
      ];
      accumulatedHeight += height;
      points.push([width, accumulatedHeight], [0, accumulatedHeight]);
      polygons.push(points);
    }
    const polygonStrings = polygons.map((polygon) => {
      let str = "";
      for (const point of polygon) {
        str += `${point[0]},${point[1]} `;
        maxX = Math.max(maxX, point[0]);
        maxY = Math.max(maxY, point[1]);
      }
      return str;
    });
    return polygonStrings;
  };

  const polygonStrs = getPolygons(materialHeights, length);
  const viewBox = `0 0 ${maxX} ${maxY}`;
  return (
    <svg viewBox={viewBox} xmlns="http://www.w3.org/2000/svg">
      <g>
        {polygonStrs.map((polygonStr, i) => (
          <polygon key={i} points={polygonStr} fill="none" stroke="black" />
        ))}
      </g>
      Sorry, your browser does not support inline SVG.
    </svg>
  );
}
