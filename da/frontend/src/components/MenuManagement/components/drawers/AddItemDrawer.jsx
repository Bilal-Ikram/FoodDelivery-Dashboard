import PropTypes from "prop-types";
import { useState, useEffect } from 'react';
import { Drawer,TextInput, Textarea, FileInput, Button, Stack } from "@mantine/core";

const AddItemDrawer = ({ opened, close }) => {
  const [formData, setFormData] = useState({
    itemName: '',
    description: '',
    price: '',
    image: null,
  });

  useEffect(() => {
    const savedDraft = localStorage.getItem('draftItem');
    if (savedDraft) setFormData(JSON.parse(savedDraft));
  }, []);

  const handleSaveDraft = () => {
    localStorage.setItem('draftItem', JSON.stringify(formData));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Publishing:', formData);
    localStorage.removeItem('draftItem');
    close();
  };

  return (
    <Drawer
      opened={opened}
      onClose={close}
      title="Add New Item"
      position="right" // Changed from left to right
      size="xl"
      zIndex={1000} // Explicit z-index
      overlayProps={{ opacity: 0.5, blur: 4 }}
      styles={{
        content: {
          // height: "100vh", // Ensure full height
          backgroundColor: '#f8f9fa' // Lighter background color
        },
        header: {
          backgroundColor: '#f8f9fa' // Lighter background color

        }
      }}
    >
      <form onSubmit={handleSubmit}>
        <Stack spacing="lg">
          <TextInput label="Item Name" placeholder="Enter item name" required />
          <Textarea
            label="Description"
            placeholder="Enter item description"
            minRows={3}
            required
          />

          <FileInput
            label="Upload Image"
            placeholder="Choose file"
            required
            accept="image/*"
          />

          <TextInput
            mt="md"
            label="Price"
            type="number"
            placeholder="Enter price"
            required
          />

        </Stack>
      </form>
            {/* Fixed position buttons */}
            <div className="fixed bottom-0 right-0 w-[100%] bg-white border-t border-gray-300 p-4 flex justify-end gap-20">
        <button
          onClick={handleSaveDraft}
          className="px-4 py-2 text-gray-500 hover:bg-gray-100 rounded-md transition-colors duration-200 border border-pink-500"
        >
          Save as Draft
        </button>
        <button
          onClick={handleSubmit}
          className="mr-6 px-6 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 transition-colors duration-200"
        >
          Publish
        </button>
        <Button  color="#125" onClick={close} variant="filled" size="md" > 
          Cancel
        </Button>
      </div>
    </Drawer>
  );
};

AddItemDrawer.propTypes = {
  opened: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
};

export default AddItemDrawer;