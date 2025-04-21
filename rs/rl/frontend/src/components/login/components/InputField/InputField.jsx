import React from 'react';

const InputField = ({ 
  type = 'text',
  id,
  name,
  value,
  onChange,
  onFocus,
  onBlur,
  label,
  error,
  isFocused,
  rightIcon
}) => {
  return (
    <div className="relative">
      <div className="relative  transition-colors duration-200">
        <input
          type={type}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          className="w-full md:w-[480px] px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent border border-gray-300  hover:border-gray-400"
          required
        />
        <label 
          htmlFor={id} 
          className={`absolute left-2 px-2 transition-all duration-200
                    ${(isFocused || value) 
                      ? 'text-xs top-0 bg-white text-pink-500' 
                      : 'text-gray-500 top-3'}`}
        >
          {label}
        </label>
        {rightIcon && (
          <div className="absolute right-1 top-1/2 transform -translate-y-1/2">
            {rightIcon}
          </div>
        )}
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default InputField;