import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

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
  };

  const handleSave = () => {
    onSave(formData);
    sessionStorage.removeItem('categoryDraft');
    onClose();
  };

  const isFormValid = formData.categoryName && formData.categoryType;

  if (!opened) return null;

  return (
    <div className="fixed top-0 right-0 h-screen w-1/3 bg-white shadow-lg rounded-l-xl overflow-hidden">
      {/* Header Section */}
      <div className="bg-violet-950 p-4 flex items-center justify-between">
        <button onClick={onClose} className="text-white">
          ←
        </button>
        <h2 className="text-white text-lg font-medium">Add Category</h2>
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
      <div className="p-6 bg-white h-[calc(100vh-4rem)] overflow-y-auto">
        <div className="space-y-6">
          <div>
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