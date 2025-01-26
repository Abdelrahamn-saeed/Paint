import { Shape } from "./Shape";
export class Triangle extends Shape {
  static create(x, y, color, background) {
    return {
      type: "triangle",
      points: [x, y, x, y, x, y],
      stroke: color,
      fill: background,
      strokeWidth: 5,
    };
  }

  static update(currentShape, startPosition, currentPosition) {
    return {
      ...super.update(currentShape, startPosition, currentPosition),
      points: [
        startPosition.x, startPosition.y,
        currentPosition.x, startPosition.y,
        (startPosition.x + currentPosition.x) / 2, currentPosition.y,
      ],
    };
  }

  static handleTransformEnd(updatedShape, node) {
    updatedShape.type = 'triangle';
    const scaledPoints = [];
    for (let i = 0; i < updatedShape.points.length; i += 2) {
      const x = updatedShape.points[i] * node.scaleX();
      const y = updatedShape.points[i + 1] * node.scaleY();
      scaledPoints.push(x, y);
    }
    updatedShape.points = scaledPoints;
    updatedShape.scaleX = 1;
    updatedShape.scaleY = 1;
  }
}