export function RecolorFill(selected, newColor, shapes, setShapes) {
    if (selected === null) return false;
    
    const shapeIndex = selected.index;
    const updatedShapes = [...shapes];
    const shape = updatedShapes[shapeIndex];
    
   
    if (shape.fill === newColor) {
        return false;
    }
    
    let colorChanged = false;
    
    switch (selected.className) {
        case 'Circle':
        case 'Rect':
        case 'Ellipse':
            updatedShapes[shapeIndex] = {
                ...shape,
                fill: newColor
            };
            selected.fill(newColor);
            colorChanged = true;
            break;
        
        case 'Line':
            if (selected.attrs.points.length === 6) {
                updatedShapes[shapeIndex] = {
                    ...shape,
                    fill: newColor
                };
                selected.fill(newColor);
                colorChanged = true;
            }
            break;
    }
    
    if (colorChanged) {
        setShapes(updatedShapes);
        selected.getLayer().batchDraw();
    }

}

export function RecolorStroke(selected, newColor, shapes, setShapes) {
    if (selected === null) return false;
    
    const shapeIndex = selected.index;
    const updatedShapes = [...shapes];
    const shape = updatedShapes[shapeIndex];
    
 
    if (shape.stroke === newColor) {
        return false;
    }
    
    let colorChanged = false;
    
    switch (selected.className) {
        case 'Circle':
        case 'Rect':
        case 'Ellipse':
        case 'Line':
            updatedShapes[shapeIndex] = {
                ...shape,
                stroke: newColor
            };
            selected.stroke(newColor);
            colorChanged = true;
            break;
    }
    
    if (colorChanged) {
        setShapes(updatedShapes);
        selected.getLayer().batchDraw();
    }

}