import { Circle, Line, Rect,Ellipse } from 'react-konva';
export const ShapeRender = ({ shape, index, onDragEnd,strokeWidth }) => {
  const handleDragEndWrapper = (e) => onDragEnd(e, index);

  switch (shape.type) {
    case "circle":
      return <Circle key={index} {...shape} draggable onDragEnd={handleDragEndWrapper} />;
    case "rectangle":
      return <Rect key={index} {...shape} draggable onDragEnd={handleDragEndWrapper} />;
      case "ellipse":
        return <Ellipse key={index} {...shape} draggable onDragEnd={handleDragEndWrapper}/>  
    case "square":
      return (
        <Rect
          key={index}
          x={shape.x}
          y={shape.y}
          width={shape.size}
          height={shape.size}
          fill={shape.fill}
          stroke={shape.stroke}
          strokeWidth={shape.strokeWidth}
          rotation={shape.rotation}
          draggable
          onDragEnd={handleDragEndWrapper}
        />
      );
    case "line":
      return <Line key={index} {...shape} draggable onDragEnd={handleDragEndWrapper} />;
    case "triangle":
      return (
        <Line
          key={index}
          points={shape.points}
          stroke={shape.stroke}
          x={shape.x}
          y={shape.y}
          strokeWidth={shape.strokeWidth}
          fill={shape.fill}
          rotation={shape.rotation}
          draggable
          closed
          onDragEnd={handleDragEndWrapper}
        />
      );
    case "free-drawing":
      return (
        <Line
          key={index}
          points={shape.points}
          stroke={shape.stroke}
          strokeWidth={shape.strokeWidth}
          x={shape.x}
          y={shape.y}
          rotation={shape.rotation}
          draggable
          onDragEnd={handleDragEndWrapper}
        />
      );
    default:
      return null;
  }
};