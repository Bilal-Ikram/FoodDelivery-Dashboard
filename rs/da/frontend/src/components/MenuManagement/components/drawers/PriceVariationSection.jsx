import { useState, useEffect } from "react";
import { Plus, Trash2 } from "lucide-react";
import PropTypes from "prop-types";

export const PriceVariationSection = ({ variations, onChange }) => {
  const [localVariations, setLocalVariations] = useState(variations || []);

  useEffect(() => {
    onChange(localVariations);
  }, [localVariations]);

  const addVariation = () => {
    setLocalVariations([
      ...localVariations,
      {
        id: Date.now(), size: "", price: 0
       },
    ]);
  };

  const removeVariation = (id) => {
    setLocalVariations(localVariations.filter((v) => v.id !== id));
  };

  const handleChange = (id, field, value) => {
    // Prevent empty variation price
    if (field === "price") {
      // Convert empty string to NaN to fail validation
      const numericValue = parseFloat(value);
      value = isNaN(numericValue) ? NaN : Math.max(0, numericValue);
    }

    if (field === "size") {
      // Remove special characters
      value = value.replace(/[^a-zA-Z\s]/g, "");
    }

    setLocalVariations(
      localVariations.map((v) => (v.id === id ? { ...v, [field]: value } : v))
    );
  };

  //   // Handle Enter key for quick adding
  // const handleKeyPress = (e) => {
  //   if (e.key === 'Enter') {
  //     addVariation();
  //   }
  // };

  return (
    <div className="space-y-6 p-4 bg-white mt-6 pb-8">
      <div className="space-y-2">
        <h3 className=" text-xl font-semibold text-slate-800">
          Price and Variations
        </h3>
        <p className="text-sm font-medium text-gray-400">
          Add a variation if this item comes in different sizes (e.g. Small,
          Medium, Large) or options (e.g. Soup, Dry). Include GST/VAT in prices
          if applicable.
        </p>
      </div>

      <div className="space-y-4">
        {localVariations.map((variation) => (
          <div
            key={variation.id}
            className="relative p-4 border border-gray-200 rounded-lg"
          >
            <button
              onClick={() => removeVariation(variation.id)}
              className="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-500"
            >
              <Trash2 className="w-4 h-4" />
            </button>

            <div className="space-y-4 mt-5">
              <VariationInput
                label="Variation Name (e.g. Regular)"
                value={variation.size}
                onChange={(e) =>
                  handleChange(variation.id, "size", e.target.value)
                }
              />

              <div className="relative">
                <input
                  type="number"
                  value={variation.price || ""}
                  className="w-full p-[14px] bg-gray-50 rounded-lg border border-gray-200 pr-12 focus:outline-none focus:ring-1 focus:ring-gray-800 focus:border-gray-800"
                  onChange={(e) => {
                    const rawValue = e.target.value;
                    const value = parseFloat(rawValue);
                    handleChange(
                      variation.id,
                      "price",
                      isNaN(value) ? rawValue : value
                    );
                  }}
                  min="0"
                  step="0.01"
                />
                <label
                  className={`absolute left-3 transition-all pointer-events-none ${
                    variation.price
                      ? "top-0 text-xs text-gray-500"
                      : "top-3 text-gray-400"
                  }`}
                >
                  Price
                </label>
                <span className="absolute right-3 top-3 text-gray-500">
                  PKR
                </span>
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
        className="w-full p-[14px] bg-gray-100 rounded-lg border border-gray-200"
        placeholder=" "
      />
      <label
        className={`absolute left-3 transition-all pointer-events-none ${
          isFocused || value
            ? "top-0 text-xs text-gray-500"
            : "top-3 text-gray-400"
        }`}
      >
        {label}
      </label>
    </div>
  );
};

PriceVariationSection.propTypes = {
  variations: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      size: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    })
  ).isRequired,
  onChange: PropTypes.func.isRequired,
};

VariationInput.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
};
