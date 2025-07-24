import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.css';
export const LoadDialog = ({handleLoad}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filename, setFilename] = useState('');
  const [format, setFormat] = useState('json');
  const defaultPath = 'Downloads/';
  return (
    <div className="loadDiv" >
      <button 
        onClick={() => setIsOpen(true)}
        className='load'
      >
        <i className="fa-solid fa-upload"></i><p>load</p>
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
            zIndex: 1000
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsOpen(false);
          }}
        >
          <div 
            style={{
              backgroundColor: '#ffffff',
              padding: '30px',
              borderRadius: '12px',
              width: '450px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
              border: '1px solid #e1e1e1'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{
              marginBottom: '25px', 
              fontSize: '1.5rem', 
              fontWeight: 'bold',
              color: '#2778be',
              borderBottom: '2px solid #2778be',
              paddingBottom: '10px'
            }}>
              Load File
            </h2>
            
            <div style={{marginBottom: '20px'}}>
              <label style={{
                display: 'block', 
                marginBottom: '8px',
                color: '#555',
                fontWeight: '500'
              }}>
                Path
              </label>
              <input
                required 
                id='loadpath'
                type="text"
                value={defaultPath}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '6px',
                  backgroundColor: '#f8f8f8',
                  fontSize: '14px'
                }}
                disabled
              />
            </div>
            
            <div style={{marginBottom: '20px'}}>
              <label style={{
                display: 'block', 
                marginBottom: '8px',
                color: '#555',
                fontWeight: '500'
              }}>
                Filename
              </label>
              <input
                id='loadname'
                type="text"
                placeholder="Enter filename"
                value={filename}
                onChange={(e) => setFilename(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '6px',
                  fontSize: '14px',
                  transition: 'border-color 0.3s',
                  outline: 'none'
                }}
              />
            </div>
            
            <div style={{marginBottom: '25px'}}>
              <label style={{
                display: 'block', 
                marginBottom: '8px',
                color: '#555',
                fontWeight: '500'
              }}>
                Format
              </label>
              <select
                id='loaddata-format'
                value={format}
                onChange={(e) => setFormat(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '6px',
                  fontSize: '14px',
                  cursor: 'pointer'
                }}
              >
                <option value="json">JSON</option>
                <option value="xml">XML</option>
              </select>
            </div>
            
            <div style={{
              display: 'flex', 
              justifyContent: 'flex-end', 
              gap: '12px',
              marginTop: '20px'
            }}>
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#f0f0f0',
                  border: 'none',
                  borderRadius: '6px',
                  color: '#333',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#e4e4e4'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#f0f0f0'}
              >
                Cancel
              </button>
              <button
                onClick={handleLoad}
                disabled={!filename}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#2778be',
                  border: 'none',
                  borderRadius: '6px',
                  color: 'white',
                  fontWeight: '500',
                  cursor: filename ? 'pointer' : 'not-allowed',
                  opacity: filename ? 1 : 0.7,
                  transition: 'all 0.3s'
                }}
                onMouseOver={(e) => {
                  if (filename) e.target.style.backgroundColor = '#1c5c94'
                }}
                onMouseOut={(e) => e.target.style.backgroundColor = '#2778be'}
              >
                Load
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};