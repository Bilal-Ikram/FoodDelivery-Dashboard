// src/pages/SignupPage.jsx
import React, { useState } from 'react';
import axios from 'axios';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FORM_FIELDS } from '../constants/formFields';
import { createInitialState } from '../utils/formUtils';
import FormField from '../components/FormField';

// Validation schema
const validationSchema = Yup.object().shape({
  restaurantName: Yup.string().required('Restaurant Name is required'),
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phoneNo: Yup.string()
    .matches(/^\d{11}$/, 'Phone number must be 10 digits')
    .required('Phone number is required'),
  restaurantAddress: Yup.string().required('Restaurant Address is required'),
});

export default function SignupPage() {
  const [formData, setFormData] = useState(() =>
    createInitialState(FORM_FIELDS)
  );
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = React.useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  }, [errors]);

  const handleBlur = React.useCallback((e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Validate the form data
      await validationSchema.validate(formData, { abortEarly: false });

      // Submit the form data
      await axios.post('/api/v1/restaurants/register', formData);

      // Reset form fields after successful submission
      setFormData(createInitialState(FORM_FIELDS));
      setErrors({});
      setTouched({});

      // Show success message
      toast.success('Form submitted successfully!');
    } catch (err) {
      if (err.name === 'ValidationError') {
        // Handle validation errors
        const newErrors = {};
        err.inner.forEach((error) => {
          newErrors[error.path] = error.message;
        });
        setErrors(newErrors);
      } else {
        // Handle API errors
        console.error('Form submission failed:', err);
        toast.error('Form submission failed. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen relative">
      {/* Fixed background image */}
      <div className="fixed inset-0 w-full h-full">
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/new_bg.jpg')"
          }}
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Main content container */}
      <div className="relative min-h-screen flex flex-col">
        {/* Header with logo */}
        <header className="bg-white z-10 p-5">
          <img
            src="/images/logo-foodpanda.png"
            alt="Foodpanda"
            className="h-[42px] pl-4"
          />
        </header>

        {/* Scrollable form section */}
        <main className="flex-1 overflow-auto px-4 py-6 mt-10 ml-32">
          <div className="max-w-[624px] bg-white shadow-lg p-8">
            <h2 className="text-2xl font-roboto font-black text-center mb-6 text-[#4a4a4a] text-wrap">
              Interested? Fill out the form below to become our partner and increase your income!
            </h2>

            <form onSubmit={handleSubmit} className="">
              <div className="max-w-[520px] p-6">
                <div className="">
                  {FORM_FIELDS.map(field => (
                    <FormField
                      key={field.name}
                      {...field}
                      value={formData[field.name]}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={errors[field.name]}
                      touched={touched[field.name]}
                      ariaDescribedby={`${field.name}-error`}
                    />
                  ))}
                </div>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-pink-600 text-white py-3 px-4 rounded-sm hover:bg-pink-700 focus:outline-none"
              >
                {isSubmitting ? 'Submitting...' : 'SUBMIT FORM'}
              </button>
            </form>
          </div>
        </main>

        {/* Footer */}
        <footer className="relative bg-gray-900 text-white p-4">
          <div className="flex justify-between items-center max-w-7xl mx-auto pb-32">
            <div>
              <img
                src="/images/logo-foodpanda.png"
                alt="Foodpanda"
                className="h-6"
              />
            </div>
            <div>
              <span>Social</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}