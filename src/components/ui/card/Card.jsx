// src/components/ui/card/Card.jsx
import React from 'react';
import './Card.css';

const Card = ({ children, className }) => {
  return <div className={`card ${className}`}>{children}</div>;
};

const CardHeader = ({ children }) => {
  return <div className="card-header">{children}</div>;
};

const CardTitle = ({ children }) => {
  return <h2 className="card-title">{children}</h2>;
};

const CardContent = ({ children }) => {
  return <div className="card-content">{children}</div>;
};

export { Card, CardHeader, CardTitle, CardContent };
// src/components/ui/card/index.js