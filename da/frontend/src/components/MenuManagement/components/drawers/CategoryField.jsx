// CategoryField.jsx
import PropTypes from 'prop-types';

export const CategoryField = ({ value, onChange }) => (
    <div className="mb-6">
      <div className="relative text-gray-400 focus: outline-none focus: border-none">
        <select
          className="w-full p-4 bg-gray-100 rounded-lg border border-gray-200 appearance-none focus:outline-none "
          value={value}
          onChange={onChange}
        >
          <option value="">Select Category</option>
          <option value="Small Mains">Small Mains</option>
          <option value="Big Mains">Big Mains</option>
          <option value="Pizza">Pizza</option>
          <option value="Burgers">Burgers</option>
          <option value="Espresso">Espresso</option>
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