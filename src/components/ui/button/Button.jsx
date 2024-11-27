// src/components/ui/button/Button.jsx
import React from 'react';

const Button = ({ children, onClick, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="btn px-4 py-2 bg-blue-500 text-white rounded-md disabled:opacity-50"
    >
      {children}
    </button>
  );
};

export { Button };
