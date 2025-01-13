import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import InputField from '../InputField/InputField';
import Button from '../Button/Button';

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });
  const [focusedInput, setFocusedInput] = useState('');

  const validateForm = () => {
    const newErrors = {
      email: !formData.email ? 'Please enter email.' : '',
      password: !formData.password ? 'Please enter the password.' : ''
    };
    setErrors(newErrors);
    return !newErrors.email && !newErrors.password;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Login attempted with:', formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <InputField
        type="email"
        id="email"
        name="email"
        value={formData.email}
        onChange={(e) => {
          setFormData({...formData, email: e.target.value});
          if (errors.email) setErrors({...errors, email: ''});
        }}
        onFocus={() => setFocusedInput('email')}
        onBlur={() => setFocusedInput('')}
        label="Email"
        error={errors.email}
        isFocused={focusedInput === 'email'}
      />

      <InputField
        type={showPassword ? 'text' : 'password'}
        id="password"
        name="password"
        value={formData.password}
        onChange={(e) => {
          setFormData({...formData, password: e.target.value});
          if (errors.password) setErrors({...errors, password: ''});
        }}
        onFocus={() => setFocusedInput('password')}
        onBlur={() => setFocusedInput('')}
        label="Password"
        error={errors.password}
        isFocused={focusedInput === 'password'}
        rightIcon={
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        }
      />

      <div className="flex justify-end">
        <a href="#" className="text-pink-500 hover:text-pink-600 transition-colors duration-200 text-sm">
          Forgot password?
        </a>
      </div>

      <Button type="submit" variant="primary">
        Log in
      </Button>

      <div className="text-center">
        <p className="text-gray-600">OR</p>
      </div>

      <Button variant="secondary">
        Log in with phone number
      </Button>

      <div className="text-center text-gray-600">
        No account?{' '}
        <a href="#" className="text-pink-500 hover:text-pink-600 transition-colors duration-200">
          Partner with Foodpanda
        </a>
      </div>
    </form>
  );
};

export default LoginForm;