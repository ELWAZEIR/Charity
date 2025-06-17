import React from 'react';

interface Option {
  value: string;
  label: string;
}

interface SelectInputProps {
  id: string;
  name: string;
  label: string;
  value: string;
  required?: boolean;
  options: Option[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SelectInput = ({ id, name, label, value, required = false, options, onChange }: SelectInputProps) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
      {label} {required && <span className="text-error">*</span>}
    </label>
    <select
      id={id}
      name={name}
      required={required}
      className="input-field"
      value={value}
      onChange={onChange}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);

export default SelectInput;
