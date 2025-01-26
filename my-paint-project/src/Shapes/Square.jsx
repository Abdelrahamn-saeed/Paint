import { Shape } from "./Shape";
export class Square extends Shape {
  static create(x, y, color, background) {
    return {
      ...super.create(x, y, color, background),
      type: "square",
      size: 0,
    };
  }

  static update(currentShape, startPosition, currentPosition) {
    const width = currentPosition.x - startPosition.x;
    const height = currentPosition.y - startPosition.y;
    return {
      ...super.update(currentShape, startPosition, currentPosition),
      x: width < 0 ? currentPosition.x : startPosition.x,
      y: height < 0 ? currentPosition.y : startPosition.y,
      size: Math.max(Math.abs(width), Math.abs(height)),
    };
  }

  static handleTransformEnd(updatedShape, node, selected) {
    updatedShape.type = 'square';
    const newSize = Math.max(
      selected.attrs.width * node.scaleX(),
      selected.attrs.height * node.scaleY()
    );
    updatedShape.size = newSize;
    updatedShape.width = newSize;
    updatedShape.height = newSize;
    updatedShape.scaleX = 1;
    updatedShape.scaleY = 1;
  }
}