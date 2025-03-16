import React from 'react';

const Button = ({ 
  type = 'button',
  variant = 'primary',
  children,
  className = '',
  ...props 
}) => {
  const baseStyles = "w-full py-3 rounded-lg font-medium transform transition-all duration-200 hover:shadow-md active:shadow-sm active:translate-y-0.5";
  
  const variants = {
    primary: "bg-pink-500 text-white hover:bg-pink-600 active:bg-pink-700",
    secondary: "border border-pink-500 text-pink-500 hover:bg-pink-50 active:bg-pink-100"
  };

  return (
    <button
      type={type}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;