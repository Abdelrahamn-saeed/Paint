import { Shape } from "./Shape";
export class Ellipse extends Shape {
  static create(x, y, color, background) {
    return {
      ...super.create(x, y, color, background),
      type: "ellipse",
      radiusX: 0,
      radiusY: 0,
    };
  }

  static update(currentShape, startPosition, currentPosition) {
    const width = Math.abs(currentPosition.x - startPosition.x);
    const height = Math.abs(currentPosition.y - startPosition.y);
    return {
      ...super.update(currentShape, startPosition, currentPosition),
      x: startPosition.x,
      y: startPosition.y,
      radiusX: width / 2,
      radiusY: height / 2,
    };
  }
}