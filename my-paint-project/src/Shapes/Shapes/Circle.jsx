import { Shape } from "./Shape";
export class Circle extends Shape {
  static create(x, y, color, background) {
    return {
      ...super.create(x, y, color, background),
      type: "circle",
      radius: 0,
    };
  }

  static update(currentShape, startPosition, currentPosition) {
    const width = currentPosition.x - startPosition.x;
    const height = currentPosition.y - startPosition.y;
    return {
      ...super.update(currentShape, startPosition, currentPosition),
      radius: Math.max(Math.abs(width), Math.abs(height)),
    };
  }
}