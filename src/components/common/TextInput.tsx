import React from 'react';

interface TextInputProps {
  id: string;
  name: string;
  label: string;
  value: string | number;
  required?: boolean;
  type?: string;
  fullWidth?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextInput = ({
  id,
  name,
  label,
  value,
  required = false,
  type = 'text',
  onChange,
  fullWidth = false, 
}: TextInputProps) => {
  return (
    <div className={fullWidth ? 'md:col-span-2' : ''}>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-error">*</span>}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        className="input-field"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default TextInput;
