import React from 'react';
import './input.css';

const Input = ({
  label,
  error,
  fullWidth = true,
  className = '',
  ...props
}) => {
  const classes = [
    'custom-input',
    fullWidth ? 'full-width' : '',
    error ? 'input-error' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className="input-wrapper">
      {label && <label className="input-label">{label}</label>}
      <input className={classes} {...props} />
      {error && <span className="input-error-text">{error}</span>}
    </div>
  );
};

export default Input;