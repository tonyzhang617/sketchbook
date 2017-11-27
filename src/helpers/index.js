import React from 'react';
import { RECTANGLE, LINE, ELLIPSE, POLYGON } from '../enums';
import { Rect, Ellipse, Line } from 'react-konva';

export const shapeToHTML = (shapeObj) => {
  if (shapeObj === null) {
    return null;
  }
  switch (shapeObj.type) {
    case RECTANGLE:
      let width = shapeObj.points[2] - shapeObj.points[0];
      let height = shapeObj.points[3] - shapeObj.points[1];
      if (shapeObj.regular) {
        let longer = (Math.abs(width) > Math.abs(height)) ? Math.abs(width) : Math.abs(height);
        width = (width > 0) ? longer : -longer;
        height = (height > 0) ? longer : -longer;
      }
      return (
        <Rect
          key={ shapeObj.key }
          x={ shapeObj.points[0] }
          y={ shapeObj.points[1] }
          width={ width }
          height={ height }
          fill={ shapeObj.color }
        />
      );
    case ELLIPSE:
      let w = shapeObj.points[2] - shapeObj.points[0];
      let h = shapeObj.points[3] - shapeObj.points[1];
      if (shapeObj.regular) {
        w = (Math.abs(w) > Math.abs(h)) ? w : h;
        h = w;
      }
      return (
        <Ellipse
          key={ shapeObj.key }
          x={ shapeObj.points[0] }
          y={ shapeObj.points[1] }
          radius={{
            x: Math.abs(w),
            y: Math.abs(h)
          }}
          fill={ shapeObj.color }
        />
      );
    case LINE:
      return (
        <Line
          key={ shapeObj.key }
          x={0}
          y={0}
          points={ shapeObj.points }
          stroke={ shapeObj.color }
          strokeWidth={3}
          tension={ shapeObj.curved ? 0.5 : 0 }
        />
      );
    case POLYGON:
      let polygon = (
        <Line
          key={ shapeObj.key }
          x={0}
          y={0}
          points={ shapeObj.points }
          fill={ shapeObj.color }
          strokeWidth={ 2 }
          stroke={ shapeObj.color }
          closed
          tension={ shapeObj.curved ? 0.5 : 0 }
        />
      );
      if (!shapeObj.new) {
        return polygon;
      } else {
        let dots = [];
        for (let i = 0; i < shapeObj.points.length; i += 2) {
          dots.push(
            <Rect
              key={ shapeObj.key + '_' + i }
              x={ shapeObj.points[i] - 2 }
              y={ shapeObj.points[i+1] - 2 }
              strokeWidth={ 1 }
              stroke='white'
              width={ 4 }
              height={ 4 }
              fill='red'
            />
          );
        }
        return ([
          polygon,
          ...dots
        ]);
      }
    default:
      return null;
  }
};
