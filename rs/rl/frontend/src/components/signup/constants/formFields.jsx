// src/constants/formFields.js
export const FORM_FIELDS = [
    { name: 'restaurantName', label: 'Restaurant Name', type: 'text' },
    { name: 'fullName', label: 'FullName', type: 'text' },
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'password', label: 'Password', type: 'password' },
    { name: 'phone', label: 'Phone', type: 'tel', maxLength: 11, pattern: '[0-9]{11}', title: 'Phone number must be exactly 11 digits' },
    { name: 'address', label: 'Restaurant Address', type: 'text' }
  ];