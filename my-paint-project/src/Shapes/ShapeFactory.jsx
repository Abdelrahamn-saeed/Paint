import { Circle } from './Circle';
import { Rectangle } from "./Rectangle";
import { Square } from "./Square";
import { Line } from "./Line";
import { Triangle } from "./Triangle";
import { Ellipse } from "./Ellipse";

export class ShapeFactory {
  static #shapeMap = new Map([
    ['circle', Circle],
    ['rectangle', Rectangle],
    ['square', Square],
    ['line', Line],
    ['triangle', Triangle],
    ['ellipse', Ellipse]
  ]);

  static createShape(tool, x, y, color, background) {
    const ShapeClass = this.#shapeMap.get(tool);
    if (!ShapeClass) return null;
    
    return ShapeClass.create(x, y, color, background);
  }

  static updateShape(tool, currentShape, startPosition, currentPosition) {
    const ShapeClass = this.#shapeMap.get(tool);
    if (!ShapeClass) return currentShape;
    
    return ShapeClass.update(currentShape, startPosition, currentPosition);
  }
}