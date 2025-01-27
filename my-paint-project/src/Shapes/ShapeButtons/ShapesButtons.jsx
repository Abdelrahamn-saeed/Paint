import { FaRegSquare } from "react-icons/fa";
import { RiRectangleLine } from "react-icons/ri";
import { IoTriangleOutline } from "react-icons/io5";
import { FaRegCircle } from "react-icons/fa";
import { BsEgg } from 'react-icons/bs';

export function ShapeButtons({
    handleToolSelect,
    setStrokeWidth

    }) {
        const strokeWidths = [2, 3, 5, 7, 10, 15, 20];
        
        const handleStrokeWidth = (e) => {
            setStrokeWidth(Number(e.target.value));
          };

        return(
            <>
<button  onClick={() => handleToolSelect("ellipse")} className='ellipse'>
<BsEgg /><p>Ellipse</p>
</button>
<button  onClick={() => handleToolSelect("circle")} className='circle'>
<FaRegCircle /><p>Circle</p>
</button>
<button  onClick={() => handleToolSelect("square")} className='square'>
<FaRegSquare /><p>Square</p>
</button>
<button  onClick={() => handleToolSelect("rectangle")} className='rectangle'>
<RiRectangleLine /><p>Rectangle</p>
</button>
<button  onClick={() => handleToolSelect("triangle")} className='triangle'>
<IoTriangleOutline /><p>Triangle</p>
</button>
<button  onClick={() => handleToolSelect("line")} className="Line">
/ <p>Line</p>
</button>
<div className="Pen">
<button  onClick={() => handleToolSelect("pen")} className="pen">
  <i className="fa-solid fa-pencil"></i><p>Pen</p>
</button>
<select onChange={handleStrokeWidth}>
  {strokeWidths.map((width) => (
    <option key={`stroke-width-${width}`} value={width}>
      {width}
    </option>
  ))}
</select>
</div>
</>

        )

    }

    export default ShapeButtons

