import { create } from 'xmlbuilder2';
export function arrayToXml(array, rootElement = 'root', itemElement = 'item') {
    if (!Array.isArray(array)) {
        throw new Error('Input must be an array of objects.');
    }

    try {
        const xmlDoc = create().ele(rootElement);
        array.forEach((obj, index) => {
            const item = xmlDoc.ele(itemElement, { index });
            Object.entries(obj).forEach(([key, value]) => {
                item.ele(key).txt(value !== undefined ? value.toString() : '');
            });
        });
        return xmlDoc.end({ prettyPrint: true });
    } catch (error) {
        console.error('Error converting array to XML:', error);
        return '';
    }
}
export function xmlToArray(xmlString) {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, "text/xml");
    const items = xmlDoc.getElementsByTagName("item");
    
   
    return Array.from(items).map(item => {
        const obj = {};
        
        
        for (let child of item.children) {
            const tagName = child.tagName;
            const value = child.textContent;
            if (tagName === 'points') {
              
                obj[tagName] = value.split(',').map(Number);
            } else if (['x', 'y', "width" , "height", 'strokeWidth',"radiusX","radiusY","radius","size","offsetX","offsetY","scaleX","scaleY","skewY","skewX"].includes(tagName)) {
              
                obj[tagName] = Number(value);
            } else {
               
                obj[tagName] = value;
            }
        }
        
        return obj;
    });
 }
export function save(shapes){ 
    window.alert("file is saved");
    const path=document.getElementById("savepath").value+document.getElementById("savename").value+'.'+document.getElementById("data-format").value;
   
  
    if (shapes.length === 0) {
        alert("No shapes to save!");
        return;
    }
    let sString;
    if(document.getElementById("data-format").value==='xml'){
        sString=arrayToXml(shapes);
    }
    else{
        sString=JSON.stringify(shapes);
    }
    const response=fetch('http://localhost:8080/api/files/save',{
      method:'POST',
      headers: {
    'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        "str":sString,
        "filePath":path,
       
      })
    });
}