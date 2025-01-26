import { HistoryManager } from "./HistoryManager";
import { FaRedoAlt, FaUndo } from "react-icons/fa";

export function UndoRedoButtons({
  handleRedo,
  handleUndo,

    
  }) {
    const isUndoAvailable = HistoryManager.undoStack.length > 0;
    const isRedoAvailable = HistoryManager.redoStack.length > 0;

    return(
      <>
       <button
          
          onClick={handleRedo}
          className="previous"
          disabled={!isRedoAvailable}
          style={{ opacity: isRedoAvailable ? 1 : 0.4 }}
        >
          <FaRedoAlt /><p>Redo</p>
        </button>
        <button
          
          onClick={handleUndo}
          className="undo"
          disabled={!isUndoAvailable}
          style={{ opacity: isUndoAvailable ? 1 : 0.4 }}
        >
          <FaUndo /><p>Undo</p>
        </button>
      
      </>

    );
  }
  export default UndoRedoButtons