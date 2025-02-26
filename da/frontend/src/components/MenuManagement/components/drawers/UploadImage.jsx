// UploadImage.jsx
import { useState } from 'react';
import PropTypes from 'prop-types';

export const UploadImage = ({ onFileSelect }) => {
  const [fileName, setFileName] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      onFileSelect(file);
    }
  };

  return (
    <div className="mb-8 text-center">
      <input
        type="file"
        accept="image/jpeg, image/png"
        className="hidden"
        onChange={handleFileChange}
        id="upload-input"
      />
      <label
        htmlFor="upload-input"
        className="cursor-pointer inline-block"
      >
        <div className="bg-pink-50 rounded-lg p-6 border-2 border-dashed border-pink-200 hover:border-pink-300">
          <div className="text-pink-500 font-semibold mb-2">
            UPLOAD DISH PHOTO
          </div>
          <p className="text-sm text-gray-500">
            1000x731 pixels minimum, 200KB to 20MB (JPG/PNG)
          </p>
          {fileName && (
            <p className="text-sm text-gray-600 mt-2">{fileName}</p>
          )}
        </div>
      </label>
    </div>
  );
};
UploadImage.PropTypes = {
    onFileSelect : PropTypes.func.isRequired
}