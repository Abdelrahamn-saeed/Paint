 import { HistoryManager } from '../UndoAndRedo/HistoryManager';

export const Delete = (selected,setSelected,shapes,setShapes, setLines) => {
    if(selected!==null){
      HistoryManager.handleDelete(selected, shapes, setShapes, setSelected);
    }else {
      HistoryManager.clear(shapes);
      setShapes([]);
      setLines([]);
      setSelected(null);
    } 
  };