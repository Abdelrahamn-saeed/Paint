export const validateShape = (shape) => {
  switch (shape.type) {
    case "circle":
      return shape.radius > 0;
    case "rectangle":
      return shape.width > 0 && shape.height > 0;
    case "square":
      return shape.size > 0;
    case "line":
      return (
        shape.points[0] !== shape.points[2] ||
        shape.points[1] !== shape.points[3]
      );
    case "triangle":
      const [x1, y1, x2, y2, x3, y3] = shape.points;
      return (
        (x1 !== x2 || y1 !== y2) &&
        (x2 !== x3 || y2 !== y3) &&
        (x3 !== x1 || y3 !== y1)
      );
    case "ellipse":
      return shape.radiusX > 0 && shape.radiusY > 0;
    default:
      return false;
  }
};
