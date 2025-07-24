// Draw.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Stage, Layer, Line, Transformer } from 'react-konva';
import { ShapeRender} from '../Shapes/ShapeRender';
import MouseHandlers from './MouseHandlers';
import ShapeTransform from './ShapeTransform';
import { validateShape } from './ValidateShape';

const Draw = ({ 
  tool, 
  color, 
  background, 
  shapes, 
  setShapes, 
  lines, 
  setLines, 
  set_select, 
  selected,
  strokeWidth,
  setColor,
  setBackground,
}) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [isDrawingNow, setIsDrawingNow] = useState(false);
  const [startPosition, setStartPosition] = useState(null);
  const [currentShape, setCurrentShape] = useState(null);
  const [draggingShape, setDraggingShape] = useState(null);
  const [dragStartPosition, setDragStartPosition] = useState(null);

  const transformerRef = useRef(null);
  const shapeRef = useRef(null);

  const { handleMouseDown, handleMouseMove, handleMouseUp } = MouseHandlers({
    tool,
    color,
    background,
    strokeWidth,
    shapes,
    setShapes,
    lines,
    setLines,
    isDrawing,
    setIsDrawing,
    isDrawingNow,
    setIsDrawingNow,
    currentShape,
    setCurrentShape,
    draggingShape,
    setDraggingShape,
    startPosition,
    setStartPosition,
    dragStartPosition,
    setDragStartPosition,
    validateShape
  });

  const { handleDragEnd, handleTransformEnd, handleClick } = ShapeTransform({
    shapes,
    setShapes,
    selected,
    tool,
    set_select,
    shapeRef,
    transformerRef,
    setColor,
    setBackground
  });

  useEffect(() => {
    if (selected !== null && shapeRef.current && transformerRef.current) {
      transformerRef.current.nodes([shapeRef.current]);
      transformerRef.current.getLayer().batchDraw();
    } else if (selected === null && transformerRef.current) {
      transformerRef.current.nodes([]);
      transformerRef.current.getLayer().batchDraw();
    }
  }, [selected]);

  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onClick={handleClick}
    >
      <Layer>
        {shapes.map((shape, index) => (
          <ShapeRender
            key={index} 
            shape={shape} 
            index={index} 
            onDragEnd={handleDragEnd}
          />
        ))}
        {currentShape && <ShapeRender shape={currentShape} index="current" />}
        {isDrawingNow && (
          <Line
            points={lines[lines.length - 1]?.points || []}
            stroke={color}
            strokeWidth={strokeWidth}
          />
        )}
        <Transformer 
          ref={transformerRef} 
          onTransformEnd={handleTransformEnd}
        />
      </Layer>
    </Stage>
  );
};

export default Draw;