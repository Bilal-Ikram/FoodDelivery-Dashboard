import { useState } from 'react';
import { Plus, FileText, FolderPlus } from 'lucide-react';
import AddItemDrawer from './drawers/AddItemDrawer';
import AddCategoryDrawer from './drawers/AddCategoryDrawer';

const MenuHeader = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeDrawer, setActiveDrawer] = useState(null);

  const handleMouseEnter = () => {
    setTimeout(() => setIsDropdownOpen(true), 200);
  };

  const handleMouseLeave = () => {
    setTimeout(() => setIsDropdownOpen(false), 1000);
  };

  const closeDrawer = () => setActiveDrawer(null);

  return (
    <>
      <div className="w-full bg-white shadow-sm relative">
        <div className="max-w-6xl mx-auto p-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-gray-800">Main Menu</h1>
            <div
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 flex items-center">
                Add New
                <Plus className="w-4 h-4 ml-2" />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  <button 
                    onClick={() => setActiveDrawer('item')}
                    className="w-full px-4 py-3 flex items-center space-x-3 hover:bg-gray-50 transition-colors"
                  >
                    <FileText className="w-5 h-5 text-gray-500" />
                    <span className="text-gray-700">Add Item</span>
                  </button>
                  <button 
                    onClick={() => setActiveDrawer('category')}
                    className="w-full px-4 py-3 flex items-center space-x-3 hover:bg-gray-50 transition-colors"
                  >
                    <FolderPlus className="w-5 h-5 text-gray-500" />
                    <span className="text-gray-700">Add Category</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Drawers */}
      <AddItemDrawer 
        opened={activeDrawer === 'item'} 
        close={closeDrawer} 
      />
      <AddCategoryDrawer 
        opened={activeDrawer === 'category'} 
        close={closeDrawer} 
      />
    </>
  );
};

export default MenuHeader;