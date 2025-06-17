import React from 'react';

interface TextareaInputProps {
  id: string;
  name: string;
  label: string;
  value: string;
  rows?: number;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextareaInput = ({ id, name, label, value, rows = 3, onChange }: TextareaInputProps) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <textarea
      id={id}
      name={name}
      className="input-field"
      rows={rows}
      value={value}
      onChange={onChange}
    />
  </div>
);

export default TextareaInput;
