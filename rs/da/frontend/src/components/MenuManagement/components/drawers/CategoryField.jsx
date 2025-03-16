import PropTypes from 'prop-types';

export const CategoryField = ({ value, onChange, categories = [] }) => (
  <div className="mb-6">
    <div className="relative text-gray-400">
      <select
        className="w-full p-4 bg-gray-100 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-gray-800 focus:border-gray-800"
        value={value}
        onChange={onChange}
      >
        <option value="">Select Category</option>
        {categories.map(category => (
          <option key={category.id} value={category.name}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  </div>
);


// Update prop types to not be required
CategoryField.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    })
  )
};