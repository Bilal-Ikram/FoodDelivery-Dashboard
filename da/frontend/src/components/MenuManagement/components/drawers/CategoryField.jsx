// CategoryField.jsx
import PropTypes from 'prop-types';

export const CategoryField = ({ value, onChange }) => (
    <div className="mb-6">
      <div className="relative text-gray-400 ">
        <select
          className="w-full p-4 bg-gray-100 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-gray-800 focus:border-gray-800"
          value={value}
          onChange={onChange}
        >
          <option value="">Select Category</option>
          <option value="Small Mains">Small Mains</option>
          <option value="Big Mains">Big Mains</option>
          <option value="Pizza">Pizza</option>
          <option value="Burgers">Burgers & Sandwich</option>
          <option value="Espresso">Espresso</option>
          <option value="Espresso">Fries</option>
        </select>
        {/* <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
          ▼
        </div> */}
      </div>
    </div>
);

CategoryField.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};