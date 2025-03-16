import { useState, useEffect } from "react";
import { Navigate, useParams } from 'react-router-dom';
import { ChevronDown, UtensilsCrossed, Logs } from "lucide-react";
import { ItemDrawer } from "./drawers/ItemDrawer";
import CategoryDrawer from "./drawers/AddCategoryDrawer";
import { MenuCategoryList } from "./MenuCategoryList";


const MenuHeader = () => {

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [drawerType, setDrawerType] = useState(null);
  const [editingItem, setEditingItem] = useState(null);

  
  // Initialize state from localStorage
  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem("categories");
    return saved ? JSON.parse(saved) : [];
  });

  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem("items");
    return saved ? JSON.parse(saved) : [];
  });


  // Save to localStorage when state changes
  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  //////////////////////////////  RESTAURANTID   //////////////////////////////
  const { restaurantId } = useParams();
  const storedRestaurantId = localStorage.getItem('restaurantId');

  if (!restaurantId && storedRestaurantId) {
    return <Navigate to={`/dashboard/${storedRestaurantId}`} />;
  }

  const handleMouseEnter = () => setTimeout(() => setIsDropdownOpen(true), 200);
  const handleMouseLeave = () => setTimeout(() => setIsDropdownOpen(false), 1000);
  const closeDrawer = () => setDrawerType(null);

  const handleDeleteItem = (itemId) => {
    setItems(prev => prev.filter(item => item.id !== itemId));
  };

  const handleEditItem = (item) => {
    // Implement your edit logic here
    setEditingItem(item);
    setDrawerType("item");

    console.log("Editing item:", item);
  };

  const handleSaveCategory = (categoryData) => {
    const newCategory = {
      id: Date.now().toString(),
      name: categoryData.categoryName.trim()
    };
    
    setCategories(prev => {
      const updated = [...prev, newCategory];
      localStorage.setItem("categories", JSON.stringify(updated));
      return updated;
    });
    // onClose();
  };

  const handleSaveItem = (itemData) => {
    setItems(prev => {
      let updatedItems;
      if (itemData.id) {
        // Update existing item
        updatedItems = prev.map(item => 
          item.id === itemData.id ? { ...itemData } : item
        );
      } else {
        // Add new item
        const newItem = {
          id: Date.now().toString(),
          ...itemData,
          createdAt: new Date().toISOString()
        };
        updatedItems = [...prev, newItem];
      }
      localStorage.setItem("items", JSON.stringify(updatedItems));
      return updatedItems;
    });
    setEditingItem(null);
  };

  return (
    <>
      <div className="w-full bg-white shadow-sm relative">
        <div className="max-w-6xl mx-auto p-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-gray-800">Main Menu</h1>
            <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              <button className="px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 flex items-center">
                Add New
                <ChevronDown className="w-4 h-4 ml-2" />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  <button onClick={() => setDrawerType("item")} className="w-full px-4 py-3 flex items-center space-x-3 hover:bg-gray-100">
                    <UtensilsCrossed className="w-5 h-5 text-gray-800" />
                    <span className="text-gray-800">Add Item</span>
                  </button>
                  <button onClick={() => setDrawerType("category")} className="w-full px-4 py-3 flex items-center space-x-3 hover:bg-gray-50">
                    <Logs className="w-5 h-5 text-gray-800" />
                    <span className="text-gray-800">Add Category</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <MenuCategoryList 
        categories={categories} 
        items={items} 
        onAddItem={() => setDrawerType("item")}
        onEditItem={handleEditItem}
        onDeleteItem={handleDeleteItem}
      />

      <ItemDrawer
        restaurantId={restaurantId}  
        opened={drawerType === "item"} 
        onClose={() => {
          setDrawerType(null);
          setEditingItem(null);
        }}
        onSave={handleSaveItem}
        categories={categories}
        initialData={editingItem} // Pass the item to edit
      />
      
      <CategoryDrawer
        opened={drawerType === "category"}
        onClose={closeDrawer}
        onSave={handleSaveCategory}
      />
    </>
  );
};

export default MenuHeader;
