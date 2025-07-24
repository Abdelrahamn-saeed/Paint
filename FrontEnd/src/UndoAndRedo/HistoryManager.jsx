export class HistoryManager {
  static undoStack = [];
  static redoStack = [];

  static reset (){
    this.undoStack=[];
    this.redoStack=[];
  }

  static saveState(shapes) {
    
    this.undoStack.push([...shapes]);
    this.redoStack = [];
   
  }

  static handleUndo(shapes, setShapes, set_select) {
    if (this.undoStack.length > 0) {
      
      this.redoStack.push([...shapes]);

      const previousState = this.undoStack.pop();
      setShapes(previousState);
      set_select(null);
    }
  }

  static handleRedo(shapes, setShapes, set_select) {
    if (this.redoStack.length > 0) {
    
      this.undoStack.push([...shapes]);
      
     
      const nextState = this.redoStack.pop();
      setShapes(nextState);
      set_select(null);
    }
  }

  static handleDelete(selected, shapes, setShapes, set_select) {
    if (selected !== null) {
      this.saveState(shapes);
      setShapes(prevShapes => prevShapes.filter((_, i) => i !== selected.index));
      set_select(null);
    }
  }

  static clear(shapes) {
    this.saveState(shapes);
    this.redoStack = [];
    
  }
  
}