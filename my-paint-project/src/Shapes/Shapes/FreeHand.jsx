import { HistoryManager } from "../../UndoAndRedo/HistoryManager";

export const FreeHand = {

    handleMouseDown(setIsDrawingNow, setLines, lines, pos, color, strokeWidth){
        setIsDrawingNow(true);
        setLines([...lines, { type: "free-drawing", points: [pos.x, pos.y], stroke: color, strokeWidth: strokeWidth }]);
    },

    handleMouseMove(lines, position, strokeWidth){
        const lastLine = lines[lines.length - 1];
        const newPoints = lastLine.points.concat([position.x, position.y]);
        return [...lines.slice(0, -1), { ...lastLine, points: newPoints, strokeWidth: strokeWidth }];
    },

    handleMouseUp(setIsDrawingNow, lines, setLines, shapes, setShapes, strokeWidth){
        setIsDrawingNow(false);
        const lastLine = lines[lines.length - 1];
        if (lastLine && lastLine.points.length > 2) {
        HistoryManager.saveState(shapes);
        setShapes(prevShapes => [...prevShapes, { ...lastLine, type: 'free-drawing',strokeWidth: strokeWidth }]);
        setLines([]);
      }
    },

    handleTransformEnd(updatedShape, node, selected){
        updatedShape.type = 'free-drawing';
        const scaledPoints = [];
        for (let i = 0; i < updatedShape.points.length; i += 2) {
          const x = updatedShape.points[i] * node.scaleX();
          const y = updatedShape.points[i + 1] * node.scaleY();
          scaledPoints.push(x, y);
        }
        updatedShape.points = scaledPoints;
        updatedShape.scaleX = 1;
        updatedShape.scaleY = 1;
    },
}