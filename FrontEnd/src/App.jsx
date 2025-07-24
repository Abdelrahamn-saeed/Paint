import React, { useState } from "react";
import ToolBar from "./ToolBar";
import Draw from "./Shapes/Drawing/Draw.jsx";
import { HistoryManager } from "./UndoAndRedo/HistoryManager.jsx";
import { save } from "./Save/save.jsx";
import { load } from "./Load/load.jsx";
import { Delete } from "./Delete/Delete.jsx";
import { RecolorFill, RecolorStroke } from "./Colors/Recolor.jsx";

const App = () => {
  const [tool, setTool] = useState(null);
  const [color, setColor] = useState("#000000");
  const [background, setBackground] = useState("transparent");
  const [shapes, setShapes] = useState([]);
  const [lines, setLines] = useState([]);
  const [selected, setSelected] = useState(null);
  const [strokeWidth, setStrokeWidth] = useState(null);
  return (
    <div id="program">
      <ToolBar
        selected={selected}
        Delete={() =>
          Delete(selected, setSelected, shapes, setShapes, setLines)
        }
        setBackground={setBackground}
        background={background}
        setTool={setTool}
        setColor={setColor}
        color={color}
        handleUndo={() =>
          HistoryManager.handleUndo(shapes, setShapes, setSelected)
        }
        handleRedo={() =>
          HistoryManager.handleRedo(shapes, setShapes, setSelected)
        }
        shapes={shapes}
        setStrokeWidth={setStrokeWidth}
        handleSave={() => save(shapes)}
        handleLoad={() => load(setShapes)}
        handleRecolorFill={(newColor) =>
          RecolorFill(selected, newColor, shapes, setShapes)
        }
        handleRecolorStroke={(newColor) =>
          RecolorStroke(selected, newColor, shapes, setShapes)
        }
      />
      <Draw
        tool={tool}
        color={color}
        background={background}
        shapes={shapes}
        setShapes={setShapes}
        lines={lines}
        setLines={setLines}
        set_select={setSelected}
        selected={selected}
        strokeWidth={strokeWidth}
        setColor={setColor}
        setBackground={setBackground}
      />
    </div>
  );
};

export default App;
