import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.css';
export const SaveDialog = ({handleSave}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filename, setFilename] = useState('');
  const [format, setFormat] = useState('json');
  const defaultPath = 'Downloads/';
  return (
    <div className="saveDiv" >
      <button 
        className='save'
        onClick={() => setIsOpen(true)}
      >
        <i className="fa-solid fa-download"></i><p>save</p>
      </button>

      {isOpen && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
            fontFamily: 'Arial, sans-serif'
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsOpen(false);
          }}
        >
          <div 
            style={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '8px',
              width: '400px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{marginBottom: '20px', fontSize: '1.25rem', fontWeight: 'bold',padding:'20px'}}>
              Save File
            </h2>
            
            <div style={{marginBottom: '15px',padding:'20px'}}>
              <label style={{display: 'block', marginBottom: '5px'}}>
                Path
              </label>
              <input
                id='savepath'
                type="text"
                value={defaultPath}
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  backgroundColor: '#f0f0f0'
                }}
                disabled
              />
            </div>
            
            <div style={{marginBottom: '15px',padding:'20px'}}>
              <label style={{display: 'block', marginBottom: '5px'}}>
                Filename
              </label>
              <input
                id='savename'
                type="text"
                placeholder="Enter filename"
                value={filename}
                onChange={(e) => setFilename(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #ccc',
                  borderRadius: '4px'
                }}
              />
            </div>
            
            <div style={{marginBottom: '15px',padding:'20px'}}>
              <label style={{display: 'block', marginBottom: '5px'}}>
                Format
              </label>
              <select
                id='data-format' 
                value={format}
                onChange={(e) => setFormat(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #ccc',
                  borderRadius: '4px'
                }}
              >
                <option value="json">JSON</option>
                <option value="xml">XML</option>
              </select>
            </div>
            
            <div style={{
              display: 'flex', 
              justifyContent: 'flex-end', 
              gap: '10px'
            }}>
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#f0f0f0',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  color:'black'
                }}
           
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={!filename}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#2778be',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  color:'Black'
                }}
               
         
                
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};