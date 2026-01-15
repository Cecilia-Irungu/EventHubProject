import React from 'react';

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: 'small' | 'medium' | 'large';
}

const Avatar: React.FC<AvatarProps> = ({ src, alt, size = 'medium' }) => {
  return (
    <img src={src} alt={alt} className={`avatar ${size}`} />
  );
};

export default Avatar;
