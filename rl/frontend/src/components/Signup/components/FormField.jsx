import  { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const FormField = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  onBlur,
  error,
  touched,
  ariaDescribedby,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = (e) => {
    setIsFocused(false);
    setIsDirty(true);
    if (onBlur) {
      onBlur(e);
    }
  };

  const hasError = touched && error;
  const showError = hasError;

  const labelColor = showError
    ? 'text-red-500'
    : isFocused
      ? 'text-pink-500'
      : 'text-[#000000ad]';

  const borderColor = showError
    ? 'border-red-500'
    : isFocused
      ? 'border-pink-500'
      : 'border-[#dcdcdc]';

  return (
    <div className="relative mb-12">
      <label
        className={`absolute -top-2 z-10 left-3 text-sm bg-white px-1 font-roboto font-light transition-colors duration-200 ${labelColor}`}
      >
        {label}*
      </label>
      <div className="relative">
        <input
          type={inputType}
          name={name}
          value={value}
          required={true}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          aria-describedby={ariaDescribedby}
          className={`block w-[440px] rounded-md border px-3 py-[8px] ${borderColor}
            text-[#333] transition-colors duration-200
            focus:outline-none 
            ${showError ? 'focus:ring-red-500' : 'focus:ring-pink-500'}
            ${isPassword ? 'pr-10' : ''}`}
        />
        {isPassword && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            {showPassword ? (
              <EyeOff size={20} className="text-gray-500" />
            ) : (
              <Eye size={20} className="text-gray-500" />
            )}
          </button>
        )}
      </div>
      {showError && (
        <p id={`${name}-error`} className="mt-1 mr-5 text-sm text-red-500 text-left">
          {error}
        </p>
      )}
    </div>
  );
};

export default FormField;