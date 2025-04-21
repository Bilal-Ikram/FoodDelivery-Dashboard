import  { useState, useCallback } from 'react';
import axios from 'axios';
import * as Yup from 'yup';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FORM_FIELDS } from '../constants/formFields';
import { createInitialState } from '../utils/formUtils';
import FormField from '../components/FormField';

// Validation schema
const validationSchema = Yup.object().shape({
  restaurantName: Yup.string().required('Restaurant Name is required'),
  fullName: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]+$/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character'
    )
    .required('Password is required'),
  phone: Yup.string()
    .matches(/^\d{11}$/, 'Phone number must be 11 digits')
    .required('Phone number is required'),
  address: Yup.string().required('Restaurant Address is required'),
});

export default function SignupPage() {
  const [formData, setFormData] = useState(() =>
    createInitialState(FORM_FIELDS)
  );
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = async (name, value) => {
    try {
      await validationSchema.validateAt(name, { [name]: value });
      setErrors(prev => ({ ...prev, [name]: undefined }));
    } catch (err) {
      setErrors(prev => ({ ...prev, [name]: err.message }));
    }
  };

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    validateField(name, value);
  }, []);

  const handleBlur = useCallback((e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    validateField(name, formData[name]);
  }, [formData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const allTouched = FORM_FIELDS.reduce((acc, field) => ({
      ...acc,
      [field.name]: true
    }), {});
    setTouched(allTouched);

    try {
      await validationSchema.validate(formData, { abortEarly: false });

      // Log the exact data being sent
      console.log('Sending data:', formData);

      const response = await axios.post('http://localhost:8000/api/v1/restaurants/register', formData, {
        withCredentials: true, // Include cookies
        headers: {
          'Content-Type': 'application/json' // Ensure the correct content type
        }
      });

      // Log successful response
      console.log('Server response:', response.data);

      setFormData(createInitialState(FORM_FIELDS));
      setErrors({});
      setTouched({});
      toast.success('Form submitted successfully!');

    } catch (err) {
      // Display the error message to the user
      if (err.response?.data?.message === 'Email already exists') {
        setErrors('Email already exists. Please use a different email.');
      }

      if (err.name === 'ValidationError') {
        const newErrors = {};
        err.inner.forEach((error) => {
          newErrors[error.path] = error.message;
        });
        setErrors(newErrors);
        toast.error('Please fix the validation errors');
      } else if (axios.isAxiosError(err)) {
        if (err.message === 'Network Error') {
          toast.error('Unable to connect to the server. Please check your network or try again later.');
        } else {
          console.error('Server Error Details:', {
            response: err.response?.data,
            status: err.response?.status,
            message: err.message,
          });
          const errorMessage = err.response?.data?.message || 'Registration failed. Please try again.';
          toast.error(errorMessage);
          console.error('Registration error:', {
            status: err.response?.status,
            data: err.response?.data,
            message: err.message
          });
        }
      }
      else {
        console.error('Unexpected error:', err);
        toast.error('An unexpected error occurred');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen relative">
      <ToastContainer />
      <div className="fixed inset-0 w-full h-full">
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/new_bg.jpg')"
          }}
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative min-h-screen flex flex-col">
        <header className="bg-white z-10 p-3">
          <img
            src="/images/logo-foodpanda.png"
            alt="Foodpanda"
            className="h-[34px] pl-4"
          />
        </header>

        <main className="flex-1 overflow-auto px-2 py-6 mt-8 md:ml-24">
          <div className="max-w-[520px] bg-white shadow-lg p-8 rounded-md">
            <h2 className="text-xl font-roboto font-black text-center mb-6 text-[#4a4a4a] text-wrap">
              Interested? Fill out the form below to become our partner and increase your income!
            </h2>

            <form onSubmit={handleSubmit} className="">
              <div className="max-w-[500px] p-2">
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