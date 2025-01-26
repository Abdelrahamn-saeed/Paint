import {HistoryManager} from '../UndoAndRedo/HistoryManager'


export const Copy = {

    copy(e, name, shapes){
        HistoryManager.saveState(shapes);
        const newShape = { ...e.target.attrs };
        if (name === "Line" && e.target.attrs.points.length === 6) {
          newShape.type = "triangle";
          newShape.points = e.target.attrs.points.map(num => num + 20);
        } else if (name === "Line" && e.target.attrs.points.length === 4) {
          newShape.type = "line";
          newShape.points = e.target.attrs.points.map(num => num + 20);
        } else if (name === "Line" && e.target.attrs.points.length > 6) {
          newShape.type = "free-drawing";
          newShape.points = e.target.attrs.points.map(num => num + 20);
        } else {
          if (name === "Rect" && e.target.attrs.height === e.target.attrs.width) {
            newShape.type = "square";
            newShape.size = e.target.attrs.width;
          }
          newShape.x += 20;
          newShape.y += 20;
        }
        return newShape;
    }
}