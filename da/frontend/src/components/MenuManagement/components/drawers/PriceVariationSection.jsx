// PriceVariationSection.jsx
import { useState, useEffect } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import PropTypes from 'prop-types';


export const PriceVariationSection = ({ variations, onChange }) => {
  const [localVariations, setLocalVariations] = useState(variations || []);

  useEffect(() => {
    onChange(localVariations);
  }, [localVariations]);

  const addVariation = () => {
    setLocalVariations([...localVariations, { id: Date.now(), name: '', price: '' }]);
  };

  const removeVariation = (id) => {
    setLocalVariations(localVariations.filter(v => v.id !== id));
  };

  const handleChange = (id, field, value) => {
    setLocalVariations(localVariations.map(v => 
      v.id === id ? { ...v, [field]: value } : v
    ));
  };

  return (
    <div className="space-y-6 p-4 bg-white mt-6">
      <div className="space-y-2">
        <h3 className=" text-xl font-semibold text-slate-800">Price and Variations</h3>
        <p className="text-sm font-medium text-gray-400">
          Add a variation if this item comes in different sizes (e.g. Small, Medium, Large) 
          or options (e.g. Soup, Dry). Include GST/VAT in prices if applicable.
        </p>
      </div>

      <div className="space-y-4 ">
        {localVariations.map((variation) => (
          <div key={variation.id} className="relative p-4 border border-gray-200 rounded-lg">
            <button
              onClick={() => removeVariation(variation.id)}
              className="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-500"
            >
              <Trash2 className="w-4 h-4 " />
            </button>

            <div className="space-y-4 ">
              <VariationInput
                label="Variation Name"
                value={variation.name}
                onChange={(e) => handleChange(variation.id, 'name', e.target.value)}
              />
              
              <div className="relative">
                <input
                  type="number"
                  value={variation.price}
                  onChange={(e) => handleChange(variation.id, 'price', e.target.value)}
                  className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 pr-12"
                  placeholder=" "
                />
                <label className="absolute left-3 top-3 text-gray-400 transition-all pointer-events-none">
                  Price
                </label>
                <span className="absolute right-3 top-3 text-gray-500">SGD</span>
              </div>
            </div>
          </div>
        ))}

        <button
          onClick={addVariation}
          className="flex items-center gap-2 text-pink-500 hover:text-pink-600 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Add Variation</span>
        </button>
      </div>
    </div>
  );
};

const VariationInput = ({ label, value, onChange }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative">
      <input
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="w-full p-3 bg-gray-100 rounded-lg border border-gray-200"
        placeholder=" "
      />
      <label className={`absolute left-3 transition-all pointer-events-none ${
        isFocused || value ? 'top-2 text-xs text-gray-500' : 'top-3 text-gray-400'
      }`}>
        {label}
      </label>
    </div>
  );
};
PriceVariationSection.propTypes = {
    variations: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
      })
    ).isRequired,
    onChange: PropTypes.func.isRequired
  };
  
  VariationInput.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    onChange: PropTypes.func.isRequired
  };
  
//   // Fix the useEffect dependency
//   useEffect(() => {
//     onChange(localVariations);
//   }, [localVariations, onChange]); // Add onChange to dependencies