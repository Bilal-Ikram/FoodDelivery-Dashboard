import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { ArrowLeft } from "lucide-react";
import { InputField } from "./InputField";
import { CategoryField } from "./CategoryField";
import { UploadImage } from "./UploadImage";
import { PriceVariationSection } from "./PriceVariationSection";
// import { useParams } from "react-router-dom";

export const ItemDrawer = ({
  opened,
  onClose,
  onSave,
  categories,
  initialData,
  restaurantId,
}) => {
  // const { restaurantId } = useParams(); // Extract from URL
  const [formData, setFormData] = useState({
    itemName: "",
    description: "",
    category: "",
    image: null,
    variations: [],
  });

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    if (opened) {
      const draft = sessionStorage.getItem("draftItem");
      if (draft) setFormData(JSON.parse(draft));
    }
  }, [opened]);

  // Initialize form with existing data when editing
  useEffect(() => {
    if (opened && initialData) {
      setFormData({
        itemName: initialData.itemName || "",
        description: initialData.description || "",
        category: initialData.category || "",
        image: initialData.image || null,
        variations: initialData.variations || [],
        id: initialData.id, // Keep existing ID
      });
    } else if (!opened) {
      // Reset form when closing
      setFormData({
        itemName: "",
        description: "",
        category: "",
        image: null,
        variations: [],
        id: null,
      });
    }
  }, [opened, initialData]);

  useEffect(() => {
    const validation = {
      itemName: formData.itemName.trim().length > 0,
      category: formData.category !== "",
      image: formData.image instanceof File,
      hasVariations: formData.variations.length > 0,
      validVariations: formData.variations.every(
        (v) =>
          v.size.trim() &&
          typeof v.price === "number" &&
          !isNaN(v.price) &&
          v.price > 0
      ),
    };

    const isValid = Object.values(validation).every((v) => v);
    setIsFormValid(isValid);

    // console.log('Validation Status:', validation);
  }, [formData]);

  const handleSaveDraft = () => {
    sessionStorage.setItem("draftItem", JSON.stringify(formData));
    onClose();
  };
  ///////////////////////////API LOGIC HERE////////////////////////////////

  const handlePublish = async () => {
    // Format data before saving
    const itemData = {
      ...formData,
      variations: formData.variations.map((v) => ({
        ...v,
        price: parseFloat(v.price),
      })),
    };
    onSave(itemData);
    /////////// DRAFT BUTTON LOGIC HERE ///////////////
    sessionStorage.removeItem("draftItem");
    setFormData({
      itemName: "",
      description: "",
      category: "",
      image: null,
      variations: [],
    });
    
    // SAVE THE ITEM TO THE BACKEND API //////////////////
    try {
      const formDataToSend = new FormData();

      // 1. Append image file
      if (formData.image instanceof File) {
        formDataToSend.append("image", formData.image);
      }

      // 2.Append other fields with proper encoding
      formDataToSend.append("name", formData.itemName);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("category", formData.category);

      // 3. Stringify variations array
      // Validate and format variations
      const variations = Array.isArray(formData.variations)
        ? formData.variations
        : [];

      // Ensure valid price values
      const validVariations = variations.map((v) => ({
        size: v.size || "",
        price: Number(v.price) || 0,
      }));

      formDataToSend.append("variations", JSON.stringify(validVariations));

      // 4. Add authentication header
      const token = localStorage.getItem("accessToken");

      const response = await axios.post(
        `http://localhost:8000/api/v1/restaurants/${restaurantId}/menu`,
        formDataToSend,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("API Response:", response.data);
      // Add error boundary for restaurantId
      if (!restaurantId) {
        throw new Error("Restaurant ID is missing");
      }

      //5. handle success ones
      onSave(response.data.data);
      sessionStorage.removeItem("draftItem");

      // 6. Reset form after successful API call
      setFormData({
        itemName: "",
        description: "",
        category: "",
        image: null,
        variations: [],
      });

      onClose();
    } catch (error) {
      console.error("Full API Error:", {
        message: error.message,
        response: error.response?.data,
        stack: error.stack,
      });
      alert(error.response?.data?.message || "Failed to save menu item");
    }
  };

  if (!opened) return null;

  return (
    <>
      {/* Backdrop with fade animation */}
      <div
        className={`fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300 ${
          opened ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Drawer with slide-in animation */}
      <div
        className={`fixed top-1 right-2 h-[calc(100vh-20px)] w-[550px] bg-slate-100 shadow-2xl rounded-xl border border-gray-100 overflow-hidden
        transform transition-all duration-300 ease-out ${
          opened ? "translate-x-0" : "translate-x-[110%]"
        }`}
      >
        {/* <div className="fixed top-1 right-2 h-[calc(100vh-20px)] w-[500px] bg-neutral-100 shadow-2xl rounded-xl border border-gray-100 overflow-hidden "> */}
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200 bg-slate-800 mb-5">
          <div className="flex items-center space-x-2">
            <button onClick={onClose} className="p-2  rounded">
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            <h2 className="text-xl font-semibold text-white">Add Item</h2>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={handleSaveDraft}
              className={`px-4 py-2 rounded ${
                isFormValid
                  ? "bg-pink-500 text-white"
                  : "bg-gray-100 text-gray-400"
              }`}
              disabled={!isFormValid}
            >
              Save As Draft
            </button>
            <button
              onClick={handlePublish}
              className={`px-4 py-2 rounded ${
                isFormValid
                  ? "bg-pink-500 text-white"
                  : "bg-gray-100 text-gray-400"
              }`}
              disabled={!isFormValid}
            >
              Publish
            </button>
          </div>
        </div>

        {/* Content */}
        {/* <div className="flex-1 overflow-y-auto p-4 bg-white rounded-md"> */}
        {/* Content with Custom Scrollbar Area */}
        <div className="h-[calc(100%-80px)] overflow-y-auto custom-scrollbar">
          <div className="p-4 space-y-6 bg-white">
            <h3 className="pb-4 text-xl font-semibold text-slate-800">
              Item Details
            </h3>
            <UploadImage
              onFileSelect={(file) =>
                setFormData((prev) => ({ ...prev, image: file }))
              }
            />

            <InputField
              name="itemName"
              label="Item Name"
              example="Cheese Pizza, Fried Rice, Apple Juice"
              required
              value={formData.itemName}
              onChange={(e) =>
                setFormData({ ...formData, itemName: e.target.value })
              }
            />

            <InputField
              name="description"
              label="Item Description"
              example="Cheddar and mozzarella cheese on a thin crust"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />

            <CategoryField
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              categories={categories}
            />
          </div>
          {/* Price Variation Section */}
          <PriceVariationSection
            variations={formData.variations}
            onChange={(variations) => setFormData({ ...formData, variations })}
          />
        </div>
      </div>
    </>
  );
};

ItemDrawer.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
  opened: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

ItemDrawer.propTypes = {
  initialData: PropTypes.object,
  restaurantId: PropTypes.string.isRequired,
};

// // Add default props for ItemDrawer
// ItemDrawer.defaultProps = {
//   categories: [],
// };
