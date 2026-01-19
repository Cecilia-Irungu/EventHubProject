import React from 'react';
import './Button.css';

const Button = ({
  children,
  variant = 'primary', 
  size = 'medium',     
  disabled = false,
  loading = false,
  fullWidth = false,
  className = '',
  ...props
}) => {
  const classes = [
    'btn',
    `btn-${variant}`,
    `btn-${size}`,
    fullWidth ? 'btn-full' : '',
    disabled || loading ? 'btn-disabled' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      className={classes}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="btn-loading">Loading...</span>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;