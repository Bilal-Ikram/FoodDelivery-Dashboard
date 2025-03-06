import { useState } from 'react';
import PropTypes from 'prop-types';


export const InputField = ({ label, example, required, value, onChange }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="mb-6 relative">
      <div className={`relative transition-all duration-200 ${isFocused || value ? 'pt-5' : ''}`}>
        <input
          className="w-full p-4 bg-gray-100 rounded-lg border border-gray-200 focus:outline-none"
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          required={required}
        />
        <label className={`absolute left-4 transition-all duration-200 ${
          isFocused || value ? 'top-5 text-xs text-gray-600' : 'top-4 text-gray-400'
        }`}>
          {label}{required && '*'}
        </label>
      </div>
      {example && <p className="text-sm text-gray-400 font-medium mt-2">Example: {example}</p>}
    </div>
  );
};
InputField.propTypes = {
    label: PropTypes.string.isRequired,
    example: PropTypes.string,
    required: PropTypes.bool,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
  };