import { Shape } from "./Shape";
export class Rectangle extends Shape {
  static create(x, y, color, background) {
    return {
      ...super.create(x, y, color, background),
      type: "rectangle",
      width: 0,
      height: 0,
    };
  }

  static update(currentShape, startPosition, currentPosition) {
    const width = currentPosition.x - startPosition.x;
    const height = currentPosition.y - startPosition.y;
    return {
      ...super.update(currentShape, startPosition, currentPosition),
      x: width < 0 ? currentPosition.x : startPosition.x,
      y: height < 0 ? currentPosition.y : startPosition.y,
      width: Math.abs(width),
      height: Math.abs(height),
    };
  }

  static handleTransformEnd(updatedShape, node, selected) {
    updatedShape.type = 'rectangle';
    updatedShape.width = selected.attrs.width * node.scaleX();
    updatedShape.height = selected.attrs.height * node.scaleY();
    updatedShape.scaleX = 1;
    updatedShape.scaleY = 1;
  }
}