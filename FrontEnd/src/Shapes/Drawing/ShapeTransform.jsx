import { HistoryManager } from "../../UndoAndRedo/HistoryManager";
import { Square } from "../Shapes/Square";
import { Rectangle } from "../Shapes/Rectangle";
import { Triangle } from "../Shapes/Triangle";
import { FreeHand } from "../Shapes/FreeHand";
import { Copy } from "../../Copy/Copy";

export const ShapeTransform = (props) => {
  const handleDragEnd = (e, index) => {
    const { x, y } = e.target.position();
    HistoryManager.saveState(props.shapes);
    props.setShapes((prevShapes) => {
      const updatedShapes = [...prevShapes];
      updatedShapes[index] = { ...updatedShapes[index], x, y };
      return updatedShapes;
    });
  };

  const handleTransformEnd = () => {
    if (props.selected) {
      HistoryManager.saveState(props.shapes);
      const node = props.selected;
      const updatedShape = {
        ...props.selected.attrs,
        scaleX: node.scaleX(),
        scaleY: node.scaleY(),
        rotation: node.rotation(),
      };

      if (props.selected.className === "Rect") {
        if (props.selected.attrs.height === props.selected.attrs.width) {
          Square.handleTransformEnd(updatedShape, node, props.selected);
        } else {
          Rectangle.handleTransformEnd(updatedShape, node, props.selected);
        }
      }
      if (
        props.selected.className === "Line" &&
        props.selected.attrs.points.length === 6
      ) {
        Triangle.handleTransformEnd(updatedShape, node);
      }
      if (
        props.selected.className === "Line" &&
        props.selected.attrs.points.length > 6
      ) {
        FreeHand.handleTransformEnd(updatedShape, node, props.selected);
      }

      props.setShapes((prevShapes) =>
        prevShapes.map((shape, index) =>
          index === props.selected.index ? updatedShape : shape
        )
      );

      node.scaleX(1);
      node.scaleY(1);
    }
  };

  const handleClick = (e) => {
    if (
      e.target instanceof window.Konva.Node &&
      e.target !== e.target.getStage()
    ) {
      if (props.tool === "copy") {
        const newShape = Copy.copy(e, e.target.className, props.shapes);
        props.setShapes((prevShapes) => [...prevShapes, newShape]);
      } else {
        props.set_select(e.target);
        props.shapeRef.current = e.target;
        props.setColor(e.target.attrs.stroke);
        if (
          e.target.className === "Rect" ||
          e.target.className === "Circle" ||
          (e.target.className === "Line" &&
            e.target.attrs.points.length === 6 &&
            e.target.attrs.fill !== null)
        ) {
          props.setBackground(e.target.attrs.fill);
        }
      }
    } else {
      props.set_select(null);
      if (props.transformerRef.current) {
        props.transformerRef.current.nodes([]);
      }
    }
  };

  return { handleDragEnd, handleTransformEnd, handleClick };
};

export default ShapeTransform;
