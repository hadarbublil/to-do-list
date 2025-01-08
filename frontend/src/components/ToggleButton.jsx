import React from 'react';

const ToggleButton = ({ value, onChange, options, label }) => {
  return (
    <div className="form-group">
      <label>{label}</label>
      <select
        className="form-control"
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ToggleButton;
