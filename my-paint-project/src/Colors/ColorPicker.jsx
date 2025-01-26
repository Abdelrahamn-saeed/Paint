import { HistoryManager } from "../UndoAndRedo/HistoryManager";
export function ColorPicker({
    color,
    setColor,
    selected,
    handleRecolorFill,
    handleRecolorStroke,
    setBackground,
    background,
    shapes,
  }) {
    const handleColorChange = (event) => {
        setColor(event.target.value);
        if (selected !== null) {
          handleRecolorStroke(event.target.value);
        }
      };
    
      const handleBackgroundChange = (event) => {
        setBackground(event.target.value);
        if (selected !== null) {
          
          if (selected.className === "Circle" || 
              selected.className === "Rect" || 
              selected.className === "Ellipse" || 
              (selected.className === "Line" && selected.attrs.points.length === 6)) {
            handleRecolorFill(event.target.value);
          }
        }
      };
    
      const handleColorMouseUpFill = () => {
        if (selected !== null &&(selected.className === "Circle" || 
            selected.className === "Rect" || 
            selected.className === "Ellipse" || 
            (selected.className === "Line" && selected.attrs.points.length === 6))) {
          HistoryManager.saveState(shapes);
       }
      };
      const handleColorMouseUpStroke = () => {
        if (selected !== null ) {
          HistoryManager.saveState(shapes);
       }
      };
return (
    <>
    <input
          title='Stroke Color'
          id="colors1"
          type="color"
          value={color}
          onChange={handleColorChange}
          onMouseUp={handleColorMouseUpStroke}
        />
        <input
          title='Fill Color'
          id="colors2"
          type="color"
          value={background}
          onChange={handleBackgroundChange}
          onMouseUp={handleColorMouseUpFill}
        />
        </>
)
}
export default ColorPicker
