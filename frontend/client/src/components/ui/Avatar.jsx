import React from 'react';
import './Avatar.css';

const Avatar = ({
  src,
  alt = 'Avatar',
  size = 'medium',
  online = false,
  className = '',
  ...props
}) => {
  const classes = [
    'avatar',
    `avatar-${size}`,
    online ? 'avatar-online' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} {...props}>
      {src ? (
        <img src={src} alt={alt} className="avatar-img" />
      ) : (
        <span className="avatar-fallback">{alt?.[0]?.toUpperCase()}</span>
      )}
    </div>
  );
};

export default Avatar;