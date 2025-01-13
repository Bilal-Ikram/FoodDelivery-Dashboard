// src/components/FormField.jsx
import React from 'react';

const FormField = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  onBlur,
  error,
  touched,
  ariaDescribedby, // Use camelCase for the prop name
}) => (
  <div className="relative mb-12">
    <label className="absolute -top-2 left-3 text-sm bg-white px-1 font-roboto font-light text-[#000000ad]">
      {label}*
    </label>
    <input
      type={type}
      name={name}
      value={value}
      required={true}
      onChange={onChange}
      onBlur={onBlur}
      aria-describedby={ariaDescribedby} // Use the prop here
      className={`block w-[440px] rounded-md border px-3 py-[8px] border-[#dcdcdc] text-[#333] ${
        error && touched ? 'border-red-500' : 'border-[#33333]'
      } focus:outline-none`}
    />
    {error && touched && (
      <p id={`${name}-error`} className="mt-1 mr-5 text-sm text-red-500 text-left">
        {error}
      </p>
    )}
  </div>
);

export default FormField;