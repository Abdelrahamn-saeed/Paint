import React, { useEffect } from 'react';

export const Notification = ({ message, type = 'success', isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  const getStyles = () => {
    const baseStyle = {
      success: {
        backgroundColor: '#10B981',
        borderColor: '#059669',
        icon: 'fa-check-circle',
        gradient: 'linear-gradient(145deg, #10B981, #059669)'
      },
      error: {
        backgroundColor: '#EF4444',
        borderColor: '#DC2626',
        icon: 'fa-exclamation-circle',
        gradient: 'linear-gradient(145deg, #EF4444, #DC2626)'
      }
    };
    return baseStyle[type] || baseStyle.success;
  };

  if (!isVisible) return null;
  const styles = getStyles();

  return (
    <div
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        background: styles.gradient,
        color: 'white',
        padding: '16px 24px',
        borderRadius: '12px',
        boxShadow: '0 8px 16px rgba(0,0,0,0.1), 0 4px 6px rgba(0,0,0,0.06)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        fontSize: '16px',
        animation: 'slideInAndBounce 0.5s ease-out',
        border: `1px solid ${styles.borderColor}`,
        minWidth: '300px',
        backdropFilter: 'blur(8px)',
        transform: 'translateZ(0)',
        WebkitFontSmoothing: 'antialiased'
      }}
    >
      <div style={{
        width: '24px',
        height: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <i className={`fas ${styles.icon} fa-lg`} style={{ filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.2))' }}></i>
      </div>
      <span style={{ 
        flex: 1,
        textShadow: '0 1px 2px rgba(0,0,0,0.1)',
        fontWeight: '500',
        letterSpacing: '0.3px'
      }}>
        {message}
      </span>
      <button
        onClick={onClose}
        style={{
          background: 'none',
          border: 'none',
          color: 'white',
          cursor: 'pointer',
          opacity: '0.8',
          transition: 'all 0.2s',
          padding: '4px',
          borderRadius: '50%',
          width: '24px',
          height: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        onMouseOver={(e) => e.target.style.opacity = '1'}
        onMouseOut={(e) => e.target.style.opacity = '0.8'}
      >
        <i className="fas fa-times"></i>
      </button>
      <style>
        {`
          @keyframes slideInAndBounce {
            0% {
              transform: translateX(120%);
              opacity: 0;
            }
            70% {
              transform: translateX(-10px);
            }
            100% {
              transform: translateX(0);
              opacity: 1;
            }
          }
        `}
      </style>
    </div>
  );
};
