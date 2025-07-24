export class Shape {
    static create(x, y, color, background) {
      return {
        x,
        y,
        stroke: color,
        fill: background,
        strokeWidth: 5,
      };
    }
  
    static update(currentShape, startPosition, currentPosition) {
      return {
        ...currentShape,
      };
    }
  }