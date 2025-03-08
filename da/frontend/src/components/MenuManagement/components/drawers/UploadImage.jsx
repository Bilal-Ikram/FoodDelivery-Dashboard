import { useState } from 'react';
import PropTypes from 'prop-types';
import { Plus, Trash2 } from 'lucide-react';

export const UploadImage = ({ onFileSelect }) => {
  const [preview, setPreview] = useState(null);
  const [fileName, setFileName] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file (PNG, JPG, JPEG etc.)');
        e.target.value = ''; // Clear the inputf
        return;
      };
      

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        setFileName(file.name);
        onFileSelect(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    setFileName('');
    onFileSelect(null);
    document.getElementById('upload-input').value = ''; // Clear input value
  };

  return (
    <div className="mb-8">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-slate-800">Dish photo</h3>
        
        <input
          type="file"
          accept="image/jpeg, image/png"  // Accept image types
          className="hidden"
          onChange={handleFileChange}
          id="upload-input"
        />

        {preview ? (
          <div className="relative group">
            <img
              src={preview}
              alt="Dish preview"
              className="w-full h-64 object-cover rounded-lg border border-gray-200"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all flex items-center justify-center">
              <button
                type="button"
                onClick={handleRemove}
                className="text-white opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 className="w-6 h-6" />
              </button>
            </div>
          </div>
        ) : (
          <label
            htmlFor="upload-input"
            className="block cursor-pointer bg-pink-50 rounded-lg p-8 border-2 border-dashed border-pink-200 hover:border-pink-300 text-center"
          >
            <div className="flex flex-col items-center gap-3">
              <Plus className="w-8 h-8 text-pink-500" />
              <div className="text-pink-500 font-semibold">
                UPLOAD DISH PHOTO
              </div>
              <p className="text-sm text-gray-500 max-w-xs">
                1000x731 pixels minimum, 200KB to 20MB (JPG/PNG)
              </p>
            </div>
          </label>
        )}

        {fileName && (
          <div className="mt-3 flex items-center justify-between text-sm text-gray-600">
            <span>{fileName}</span>
            <div className="space-x-4">
              <button
                type="button"
                onClick={() => document.getElementById('upload-input').click()}
                className="text-pink-500 hover:text-pink-600"
              >
                Change
              </button>
              <button
                type="button"
                onClick={handleRemove}
                className="text-red-500 hover:text-red-600"
              >
                Remove
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

UploadImage.propTypes = {
  onFileSelect: PropTypes.func.isRequired
};
