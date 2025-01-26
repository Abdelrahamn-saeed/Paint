import React, { useState, useRef, useEffect } from 'react';
import { Stage, Layer, Line, Transformer } from 'react-konva';
import { ShapeFactory } from './ShapeFactory';
import { ShapeRender} from './ShapeRender';
import { HistoryManager } from '../UndoAndRedo/HistoryManager';
import { Copy } from '../Copy/Copy';
import { FreeHand } from './FreeHand';
import { Triangle } from './Triangle';
import { Square } from './Square';
import { Rectangle } from './Rectangle';
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
  setStrokeWidth,
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

  useEffect(() => {
    if (selected !== null && shapeRef.current && transformerRef.current) {
      transformerRef.current.nodes([shapeRef.current]);
      transformerRef.current.getLayer().batchDraw();
    } else if (selected === null && transformerRef.current) {
      transformerRef.current.nodes([]);
      transformerRef.current.getLayer().batchDraw();
    }
  }, [selected]);

  const handleMouseDown = (e) => {
    const pos = e.target.getStage().getPointerPosition();
    
    if (e.target instanceof window.Konva.Node && e.target !== e.target.getStage()) {
      setDraggingShape(e.target);
      setDragStartPosition(pos);
      setIsDrawing(false);
    } else if (tool) {
      if (tool === "pen") {
        FreeHand.handleMouseDown(setIsDrawingNow, setLines, lines, pos, color, strokeWidth);
      } else {
        setStartPosition(pos);
        setIsDrawing(true);
        const newShape = ShapeFactory.createShape(tool, pos.x, pos.y, color, background);
        setCurrentShape(newShape);
      }
    }
  };

  const handleMouseMove = (e) => {
    const pos = e.target.getStage().getPointerPosition();

    if (isDrawing && currentShape) {
      const updatedShape = ShapeFactory.updateShape(tool, currentShape, startPosition, pos);
      setCurrentShape(updatedShape);
    } else if (isDrawingNow) {
      const updatedLines = FreeHand.handleMouseMove(lines, pos, strokeWidth);
      setLines(updatedLines);
    } else if (draggingShape) {
      const dx = pos.x - dragStartPosition.x;
      const dy = pos.y - dragStartPosition.y;
      draggingShape.setX(draggingShape.x() + dx);
      draggingShape.setY(draggingShape.y() + dy);
      setDragStartPosition(pos);
    }
  };

  const handleMouseUp = () => {
    if (isDrawing && currentShape) {
      const isValidShape = validateShape(currentShape);
      if (isValidShape) {
        HistoryManager.saveState(shapes); 
        setShapes(prevShapes => [...prevShapes, currentShape]);
      }
      setIsDrawing(false);
      setCurrentShape(null);
    } else if (isDrawingNow) {
      FreeHand.handleMouseUp(setIsDrawingNow, lines, setLines, shapes, setShapes, strokeWidth);
    } else if (draggingShape) {
      setDraggingShape(null);
    }
  };

  const validateShape = (shape) => {
    switch (shape.type) {
      case 'circle':
        return shape.radius > 0;
      case 'rectangle':
        return shape.width > 0 && shape.height > 0;
      case 'square':
        return shape.size > 0;
      case 'line':
        return shape.points[0] !== shape.points[2] || shape.points[1] !== shape.points[3];
      case 'triangle':
        const [x1, y1, x2, y2, x3, y3] = shape.points;
        return (x1 !== x2 || y1 !== y2) && 
               (x2 !== x3 || y2 !== y3) && 
               (x3 !== x1 || y3 !== y1);
      case 'ellipse':
        return shape.radiusX > 0 && shape.radiusY > 0;
      default:
        return false;
   }
};

  const handleDragEnd = (e, index) => {
    const { x, y } = e.target.position();
    HistoryManager.saveState(shapes); 
    setShapes(prevShapes => {
      const updatedShapes = [...prevShapes];
      updatedShapes[index] = { ...updatedShapes[index], x, y };
      return updatedShapes;
    });
  };

  const handleTransformEnd = () => {
    if (selected) {
      HistoryManager.saveState(shapes);
      const node = selected;
      const updatedShape = {
        ...selected.attrs,
        scaleX: node.scaleX(),
        scaleY: node.scaleY(),
        rotation: node.rotation(),
      };

      if (selected.className === 'Rect') {

        if (selected.attrs.height === selected.attrs.width){
          Square.handleTransformEnd(updatedShape, node, selected);
        }else{
          Rectangle.handleTransformEnd(updatedShape, node, selected);
        }
      }
      if (selected.className === 'Line' && selected.attrs.points.length === 6) {
        Triangle.handleTransformEnd(updatedShape, node);
      }
      if (selected.className === 'Line' && selected.attrs.points.length > 6) {
        FreeHand.handleTransformEnd(updatedShape, node, selected);
      }

      setShapes(prevShapes =>
        prevShapes.map((shape, index) =>
          index === selected.index ? updatedShape : shape
        )
      );

      node.scaleX(1);
      node.scaleY(1);
    }
  };

  const handleClick = (e) => {
    
    if (e.target instanceof window.Konva.Node && e.target !== e.target.getStage()) {
      if (tool === "copy") {
        const newShape = Copy.copy(e, e.target.className, shapes);
        setShapes(prevShapes => [...prevShapes, newShape]);
      } else {
         
        set_select(e.target);
        shapeRef.current = e.target;
        setColor(e.target.attrs.stroke);
        if (e.target.className==="Rect"||e.target.className==="Circle"||(e.target.className==="Line"&&e.target.attrs.points.length==6) &&  e.target.attrs.fill !== null){
          setBackground(e.target.attrs.fill);
        }
      }
    } else {
      set_select(null);
      if (transformerRef.current) {
        transformerRef.current.nodes([]);
      }
    }
  };

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