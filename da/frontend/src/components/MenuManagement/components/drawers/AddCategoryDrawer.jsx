import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ArrowLeft } from 'lucide-react';


const CategoryDrawer = ({ opened, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    categoryName: '',
    categoryType: '',
    description: ''
  });

  // Load draft when drawer opens
  useEffect(() => {
    if (opened) {
      const draft = sessionStorage.getItem('categoryDraft');
      if (draft) setFormData(JSON.parse(draft));
    }
  }, [opened]);

  // Handle input changes properly
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveDraft = () => {
    sessionStorage.setItem('categoryDraft', JSON.stringify(formData));
    onClose();
  };

  const handleSave = () => {     /// ADD  API LOGIC HERE
    onSave(formData);
    sessionStorage.removeItem('categoryDraft');
    //Reset the form
    setFormData({
      categoryName: '',
      categoryType: '',
      description: ''
    });
    onClose();
  };

  const isFormValid = formData.categoryName && formData.categoryType;

  if (!opened) return null;

  return (
    <div className="fixed right-1 top-2 h-[calc(100vh-20px)] w-[500px] bg-neutral-100 shadow-2xl flex flex-col rounded-xl border border-gray-100 overflow-hidden">
      {/* Header Section */}
      <div className="bg-slate-800 p-4 flex items-center "> 
        <button onClick={onClose} className="text-white flex items-center">
        <ArrowLeft />
          <h2 className="text-white text-lg font-medium ml-2">Add Category</h2>
        </button>
        <div className="flex-grow"></div> {/* This will push the buttons to the right */}
        <div className="flex gap-2">
          <button
            onClick={handleSaveDraft}
            className={`px-4 py-2 rounded ${isFormValid ? 'bg-pink-500' : 'bg-gray-300'} text-white`}
            disabled={!isFormValid}
          >
            Save Draft
          </button>
          <button
            onClick={handleSave}
            className={`px-4 py-2 rounded ${isFormValid ? 'bg-pink-500' : 'bg-gray-300'} text-white`}
            disabled={!isFormValid}
          >
            Save
          </button>
        </div>
      </div>

      {/* Form Section - All inputs use handleInputChange */}
      {/* <div className='bg-neutral-200 min-w-full'></div> */}
      <div className="p-6 bg-white h-[calc(100vh-rem)] overflow-y-auto mt-6 rounded-md">
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-black pb-4">Category Details</h2>
            <label className="block text-sm font-medium mb-1">
              Category Name *
              <input
                name="categoryName"
                value={formData.categoryName}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full bg-neutral-100 rounded border border-gray-300"
                required
              />
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Category Type *
              <select
                name="categoryType"
                value={formData.categoryType}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full bg-neutral-100 rounded border border-gray-300"
                required
              >
                <option value="">Select Type</option>
                <option value="Small Mains">Small Mains</option>
                <option value="Big Mains">Big Mains</option>
                <option value="Pizza">Pizza</option>
                <option value="Burgers">Burgers</option>
              </select>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Description (optional)
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full bg-neutral-100 rounded border border-gray-300 h-24"
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

CategoryDrawer.propTypes = {
  opened: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default CategoryDrawer;