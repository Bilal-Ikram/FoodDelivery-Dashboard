import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ArrowLeft } from 'lucide-react';
import { InputField } from './InputField';
import { CategoryField } from './CategoryField';
import { UploadImage } from './UploadImage';

export const ItemDrawer = ({ opened, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    itemName: '',
    description: '',
    category: '',
    image: null
  });

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    if (opened) {
      const draft = sessionStorage.getItem('draftItem');
      if (draft) setFormData(JSON.parse(draft));
    }
  }, [opened]);

  useEffect(() => {
    setIsFormValid(!!formData.itemName.trim() && !!formData.category && !!formData.image);
  }, [formData]);

  const handleSaveDraft = () => {
    sessionStorage.setItem('draftItem', JSON.stringify(formData));
    onClose();
  };

  const handlePublish = () => {
    onSave(formData);
    sessionStorage.removeItem('draftItem');
    setFormData({
      itemName: '',
      description: '',
      category: '',
      image: null
    });
    onClose();
  };

  if (!opened) return null;

  return (
  
<div className="fixed top-1 right-2 h-[calc(100vh-20px)] w-[500px] bg-neutral-100 shadow-2xl rounded-xl border border-gray-100 overflow-hidden ">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-gray-200 bg-slate-800 mb-5">
        <div className="flex items-center space-x-2">
          <button onClick={onClose} className="p-2  rounded">
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <h2 className="text-xl font-semibold text-white">Add Item</h2>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={handleSaveDraft}
            className={`px-4 py-2 rounded ${isFormValid ? 'bg-pink-500 text-white' : 'bg-gray-100 text-gray-400'}`}
            disabled={!isFormValid}
          >
            Save As Draft
          </button>
          <button
            onClick={handlePublish}
            className={`px-4 py-2 rounded ${isFormValid ? 'bg-pink-500 text-white' : 'bg-gray-100 text-gray-400'}`}
            disabled={!isFormValid}
          >
            Publish
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 bg-white rounded-md">
        <h3 className='pb-4 text-xl font-semibold text-slate-800'>Item Details</h3>
        <UploadImage onFileSelect={(file) => setFormData({...formData, image: file})} />
        
        <InputField
          name="itemName"
          label="Item Name"
          example="Cheese Pizza, Fried Rice, Apple Juice"
          required
          value={formData.itemName}
          onChange={(e) => setFormData({...formData, itemName: e.target.value})}
        />

        <InputField
          name="description"
          label="Item Description"
          example="Cheddar and mozzarella cheese on a thin crust"
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
        />

        <CategoryField
          value={formData.category}
          onChange={(e) => setFormData({...formData, category: e.target.value})}
        />
      </div>
      <h1>lskdfjlsk</h1>
    </div>
  );
};

ItemDrawer.propTypes = {
  opened: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired
};