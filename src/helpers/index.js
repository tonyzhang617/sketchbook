import React from 'react';
import { RECTANGLE, LINE, ELLIPSE } from '../enums';
import { Rect, Ellipse, Line } from 'react-konva';

export const shapeToHTML = (shapeObj) => {
  if (shapeObj === null) {
    return null;
  }
  switch (shapeObj.type) {
    case RECTANGLE:
      return (
        <Rect
          key={ shapeObj.key }
          x={ shapeObj.points[0] }
          y={ shapeObj.points[1] }
          width={ shapeObj.points[2] - shapeObj.points[0] }
          height={ shapeObj.points[3] - shapeObj.points[1] }
          fill={ shapeObj.color }
        />
      );
    case ELLIPSE:
      return (
        <Ellipse
          key={ shapeObj.key }
          x={ shapeObj.points[0] }
          y={ shapeObj.points[1] }
          radius={{
            x: Math.abs( shapeObj.points[2] - shapeObj.points[0]),
            y: Math.abs( shapeObj.points[3] - shapeObj.points[1])
          }}
          fill={ shapeObj.color }
        />
      );
    case LINE:
      return (
        <Line
          key={ shapeObj.key }
          x={ shapeObj.points[0] }
          y={ shapeObj.points[1] }
          points={[0, 0, shapeObj.points[2] - shapeObj.points[0], shapeObj.points[3] - shapeObj.points[1]]}
          stroke={ shapeObj.color }
          strokeWidth={3}
        />
      );
    default:
      return null;
  }
};
