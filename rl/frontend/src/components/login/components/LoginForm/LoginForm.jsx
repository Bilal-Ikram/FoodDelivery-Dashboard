import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import axios from 'axios';
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
    password: '',
    submit: ''
  });
  const [focusedInput, setFocusedInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {
      email: !formData.email ? 'Please enter email.' : '',
      password: !formData.password ? 'Please enter the password.' : '',
      submit: ''
    };
    setErrors(newErrors);
    return !newErrors.email && !newErrors.password;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      console.log('Attempting login with:', {
        email: formData.email,
        password: formData.password?.length > 0 ? 'password-provided' : 'no-password'
      });

      const response = await axios.post(
        'http://localhost:8000/api/v1/restaurants/login', 
        formData,
        {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true
        }
      );

      console.log('Login response:', response.data);
      
      if (response.data.success) {
        // Add success message
        console.log('Login successful');
        // Redirect to dashboard
        // window.location.href = '/dashboard';
      } else {
        setErrors(prev => ({
          ...prev,
          submit: response.data.message || 'Login failed'
        }));
      }
    } catch (error) {
      console.error('Login error:', error);
      const errorMessage = error?.response?.data?.message || 
                          error?.message || 
                          'An error occurred during login';
      
      setErrors(prev => ({
        ...prev,
        submit: errorMessage
      }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {errors.submit && (
        <div className="p-3 bg-red-100 text-red-700 rounded-md text-sm">
          {errors.submit}
        </div>
      )}

      <InputField
        type="email"
        id="email"
        name="email"
        value={formData.email}
        onChange={(e) => {
          setFormData({...formData, email: e.target.value.trim()});
          if (errors.email) setErrors({...errors, email: ''});
        }}
        onFocus={() => setFocusedInput('email')}
        onBlur={() => setFocusedInput('')}
        label="Email"
        error={errors.email}
        isFocused={focusedInput === 'email'}
        disabled={isLoading}
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
        disabled={isLoading}
        rightIcon={
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
            disabled={isLoading}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        }
      />

      <div className="flex justify-end">
        <a 
          href="#" 
          className="text-pink-500 hover:text-pink-600 transition-colors duration-200 text-sm"
        >
          Forgot password?
        </a>
      </div>

      <Button 
        type="submit" 
        variant="primary"
        disabled={isLoading}
      >
        {isLoading ? 'Logging in...' : 'Log in'}
      </Button>

      <div className="text-center">
        <p className="text-gray-600">OR</p>
      </div>

      <Button 
        variant="secondary"
        disabled={isLoading}
        onClick={() => {/* Add phone login logic */}}
      >
        Log in with phone number
      </Button>

      <div className="text-center text-gray-600">
        No account?{' '}
        <a 
          href="#" 
          className="text-pink-500 hover:text-pink-600 transition-colors duration-200"
        >
          Partner with Foodpanda
        </a>
      </div>
    </form>
  );
};

export default LoginForm;