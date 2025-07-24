import "@fortawesome/fontawesome-free/css/all.css";
import { FiMousePointer } from "react-icons/fi";
import { SaveDialog } from "./Save/savecomponent";
import { LoadDialog } from "./Load/loadcomponent";
import ShapeButtons from "./Shapes/ShapeButtons/ShapesButtons";
import CopyButton from "./Copy/CopyButton";
import DeleteButton from "./Delete/DeleteButton";
import ColorPicker from "./Colors/ColorPicker";
import UndoRedoButtons from "./UndoAndRedo/UndoRedoButtons";

const ToolBar = ({
  selected,
  Delete,
  setBackground,
  background,
  setTool,
  setColor,
  color,
  handleUndo,
  handleRedo,
  shapes,
  setStrokeWidth,
  handleSave,
  handleLoad,
  handleRecolorFill,
  handleRecolorStroke,
}) => {
  const handleToolSelect = (tool) => {
    setTool(tool);
  };

  return (
    <div className="toolbar">
      <SaveDialog handleSave={handleSave}></SaveDialog>
      <div className="tools">
        <ShapeButtons
          handleToolSelect={handleToolSelect}
          setStrokeWidth={setStrokeWidth}
        ></ShapeButtons>
        <CopyButton
          handleToolSelect={handleToolSelect}
          shapes={shapes}
        ></CopyButton>

        <DeleteButton
          handleDelete={Delete}
          shapes={shapes}
        ></DeleteButton>

        <UndoRedoButtons
          handleRedo={handleRedo}
          handleUndo={handleUndo}
        ></UndoRedoButtons>

        <button
          title="Select"
          onClick={() => handleToolSelect(null)}
          className="exit"
        >
          <FiMousePointer />
          <p>Select</p>
        </button>

        <ColorPicker
          color={color}
          setColor={setColor}
          selected={selected}
          handleRecolorFill={handleRecolorFill}
          handleRecolorStroke={handleRecolorStroke}
          setBackground={setBackground}
          background={background}
          shapes={shapes}
        />
      </div>
      <LoadDialog handleLoad={handleLoad}></LoadDialog>
    </div>
  );
};

export default ToolBar;
