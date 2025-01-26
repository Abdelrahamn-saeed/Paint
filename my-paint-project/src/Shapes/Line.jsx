import { Shape } from "./Shape";
export class Line extends Shape {
  static create(x, y, color) {
    const baseShape = super.create(x, y, color);
    return {
      type: "line",
      points: [x, y, x, y],
      stroke: color,
      strokeWidth: baseShape.strokeWidth,
    };
  }

  static update(currentShape, startPosition, currentPosition) {
    return {
      ...super.update(currentShape, startPosition, currentPosition),
      points: [startPosition.x, startPosition.y, currentPosition.x, currentPosition.y],
    };
  }
}
