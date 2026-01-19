import React from 'react';
import './Card.css';

const Card = ({
  children,
  title,
  className = '',
  hoverable = false,
  ...props
}) => {
  const classes = [
    'custom-card',
    hoverable ? 'hoverable' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} {...props}>
      {title && <h3 className="card-title">{title}</h3>}
      <div className="card-content">{children}</div>
    </div>
  );
};

export default Card;