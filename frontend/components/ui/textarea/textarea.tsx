import React from 'react';

interface TextareaProps {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  rows?: number;
}

const Textarea: React.FC<TextareaProps> = ({ placeholder, value, onChange, rows = 4 }) => {
  return (
    <textarea placeholder={placeholder} value={value} onChange={onChange} rows={rows} />
  );
};

export default Textarea;
