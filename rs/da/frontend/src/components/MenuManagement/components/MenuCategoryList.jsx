// MenuCategoryList.jsx

import { ChevronDown, ImageOff, Plus } from 'lucide-react';
import PropTypes from 'prop-types';
import { useState } from 'react';

export const MenuCategoryList = ({ categories, items, onAddItem }) => {
  const [openCategory, setOpenCategory] = useState(categories[0]?.id || null);

  const getCategoryItems = (categoryName) => {
    return items.filter(item => item.category === categoryName);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      {categories.map((category) => {
        const categoryItems = getCategoryItems(category.name);
        const isOpen = openCategory === category.id;

        return (
          <div key={category.id} className="border rounded-lg shadow-sm">
            <button
              onClick={() => setOpenCategory(isOpen ? null : category.id)}
              className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100"
            >
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-semibold">{category.name}</h2>
                <span className="text-sm text-gray-500">
                  ({categoryItems.length} items)
                </span>
              </div>
              <ChevronDown className={`transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
              <div className="p-4 space-y-4">
                {categoryItems.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="flex flex-col items-center space-y-2 text-gray-500">
                      <ImageOff className="w-8 h-8" />
                      <p>No items in this category</p>
                      <button
                        onClick={onAddItem}
                        className="flex items-center text-pink-500 hover:text-pink-600"
                      >
                        <Plus className="w-4 h-4 mr-1" />
                        Add Item
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {categoryItems.map(item => (
                      <div key={item.id} className="border rounded-lg p-4">
                        <div className="flex gap-4">
                          {item.image && (
                            <img 
                              src={item.image} 
                              alt={item.itemName}
                              className="w-20 h-20 object-cover rounded-lg"
                            />
                          )}
                          <div className="flex-1">
                            <h3 className="font-semibold">{item.itemName}</h3>
                            <p className="text-sm text-gray-600 mt-1 text-wrap">
                              {item.description}
                            </p>
                            <div className="mt-2">
                              <span className="font-medium">
                                {item.variations?.length > 0 
                                  ? `From PKR ${Math.min(...item.variations.map(v => v.price))}`
                                  : `PKR ${item.price}`}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

MenuCategoryList.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      itemName: PropTypes.string.isRequired,
      description: PropTypes.string,
      price: PropTypes.string,
      image: PropTypes.string,
      category: PropTypes.string.isRequired,
      variations: PropTypes.array,
    })
  ).isRequired,
  onAddItem: PropTypes.func.isRequired,
  onEditItem: PropTypes.func.isRequired,
};

MenuCategoryList.defaultProps = {
  categories: [],
  items: [],
  onAddItem: () => {},
  onEditItem: () => {}
};