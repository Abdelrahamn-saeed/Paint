import { ShapeFactory } from "../Shapes/ShapeFactory";
import { FreeHand } from "../Shapes/FreeHand";
import { HistoryManager } from "../../UndoAndRedo/HistoryManager";

const MouseHandlers = (props) => {
  const handleMouseDown = (e) => {
    const pos = e.target.getStage().getPointerPosition();

    if (
      e.target instanceof window.Konva.Node &&
      e.target !== e.target.getStage()
    ) {
      props.setDraggingShape(e.target);
      props.setDragStartPosition(pos);
      props.setIsDrawing(false);
    } else if (props.tool) {
      if (props.tool === "pen") {
        FreeHand.handleMouseDown(
          props.setIsDrawingNow,
          props.setLines,
          props.lines,
          pos,
          props.color,
          props.strokeWidth
        );
      } else {
        props.setStartPosition(pos);
        props.setIsDrawing(true);
        const newShape = ShapeFactory.createShape(
          props.tool,
          pos.x,
          pos.y,
          props.color,
          props.background
        );
        props.setCurrentShape(newShape);
      }
    }
  };

  const handleMouseMove = (e) => {
    const pos = e.target.getStage().getPointerPosition();

    if (props.isDrawing && props.currentShape) {
      const updatedShape = ShapeFactory.updateShape(
        props.tool,
        props.currentShape,
        props.startPosition,
        pos
      );
      props.setCurrentShape(updatedShape);
    } else if (props.isDrawingNow) {
      const updatedLines = FreeHand.handleMouseMove(
        props.lines,
        pos,
        props.strokeWidth
      );
      props.setLines(updatedLines);
    } else if (props.draggingShape) {
      const dx = pos.x - props.dragStartPosition.x;
      const dy = pos.y - props.dragStartPosition.y;
      props.draggingShape.setX(props.draggingShape.x() + dx);
      props.draggingShape.setY(props.draggingShape.y() + dy);
      props.setDragStartPosition(pos);
    }
  };

  const handleMouseUp = () => {
    if (props.isDrawing && props.currentShape) {
      const isValidShape = props.validateShape(props.currentShape);
      if (isValidShape) {
        HistoryManager.saveState(props.shapes);
        props.setShapes((prevShapes) => [...prevShapes, props.currentShape]);
      }
      props.setIsDrawing(false);
      props.setCurrentShape(null);
    } else if (props.isDrawingNow) {
      FreeHand.handleMouseUp(
        props.setIsDrawingNow,
        props.lines,
        props.setLines,
        props.shapes,
        props.setShapes,
        props.strokeWidth
      );
    } else if (props.draggingShape) {
      props.setDraggingShape(null);
    }
  };

  return { handleMouseDown, handleMouseMove, handleMouseUp };
};

export default MouseHandlers;
