import { HistoryManager } from '../UndoAndRedo/HistoryManager';
import { xmlToArray } from '../Save/save';

export function load(setShapes){
    
    const path=document.getElementById("loadpath").value+document.getElementById("loadname").value+'.'+document.getElementById("loaddata-format").value;
    
    let m=true;
    const response = fetch('http://localhost:8080/api/files/load', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "filePath": path })
    })
    .then(response => {
        if (!response.ok) {
            window.alert("file not found");
            throw new Error('File not found');
        }
        return response.text();
    })
    .then(content => {
        console.log(content);
        if (document.getElementById("loaddata-format").value === 'xml') {
            const shapesArray = xmlToArray(content);
            setShapes([...shapesArray]);
        } else {
            setShapes([...JSON.parse(content)]);
        }
        HistoryManager.reset();
        window.alert("file is loaded");
        })
    .catch(error => {
        console.error('Error:', error);
    });

}