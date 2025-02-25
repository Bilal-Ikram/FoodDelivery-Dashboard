import { useState } from "react";
import { ChevronDown, UtensilsCrossed, Logs } from "lucide-react";
import AddItemDrawer from "./drawers/AddItemDrawer";
import CategoryDrawer from './drawers/AddCategoryDrawer';

const MenuHeader = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [drawerType, setDrawerType] = useState(null); // Changed state name

  const handleMouseEnter = () => {
    setTimeout(() => setIsDropdownOpen(true), 200);
  };

  const handleMouseLeave = () => {
    setTimeout(() => setIsDropdownOpen(false), 1000);
  };

  const closeDrawer = () => setDrawerType(null);

  const handleDrawerToggle = (type) => {
    setDrawerType((prev) => (prev === type ? null : type)); // Toggle logic
  };

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
              <button className="px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 flex items-center">
                Add New
                <ChevronDown className="w-4 h-4 ml-2" />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  <button
                    onClick={() => handleDrawerToggle("item")}
                    className="w-full px-4 py-3 flex items-center space-x-3 hover:bg-gray-100 transition-colors"
                  >
                    <UtensilsCrossed className="w-5 h-5 text-gray-800" />
                    <span className="text-gray-800">Add Item</span>
                  </button>
                  <button
                    onClick={() => handleDrawerToggle("category")}
                    className="w-full px-4 py-3 flex items-center space-x-3 hover:bg-gray-50 transition-colors"
                  >
                    <Logs className="w-5 h-5 text-gray-800" />
                    <span className="text-gray-800">Add Category</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Drawers */}
      <AddItemDrawer opened={drawerType === "item"} close={closeDrawer} />
      <CategoryDrawer
        opened={drawerType === "category"}
        onClose={closeDrawer}
        onSave={(data) => {
          // Add your API call here
          console.log("Saving category:", data);
        }}
      />
    </>
  );
};

export default MenuHeader;
