import React from 'react';

export default function Spinner() {
  return (
    <div style={{height:'100%',display:'flex',placeContent:'center'}}>
      <style>
        {`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}
      </style>
      <div
        style={{
          width: '40px',
          height: '40px',
          border: '4px solid #ccc',
          borderTopColor: '#0073aa',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          margin: 'auto',
          display:'inline'
        }}
      />
    </div>
  );
}
