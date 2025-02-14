import { Drawer } from '@mantine/core';
import { TextInput, Textarea, FileInput, Button, Stack } from '@mantine/core';

const AddItemDrawer = ({ opened, close }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Item form submitted');
    close();
  };

  return (
    <Drawer
      opened={opened}
      onClose={close}
      title="Add New Item"
      position="right"
      size="md"
      overlayProps={{ opacity: 0.5, blur: 4 }}
    >
      <form onSubmit={handleSubmit}>
        <Stack spacing="md">
          <TextInput
            label="Item Name"
            placeholder="Enter item name"
            required
          />
          
          <Textarea
            label="Description"
            placeholder="Enter item description"
            minRows={3}
          />
          
          <FileInput
            label="Upload Image"
            placeholder="Choose file"
           
            accept="image/*"
          />
          
          <TextInput
            label="Price"
            type="number"
            placeholder="Enter price"
            required
          />
          
          <Button type="submit" color="blue" fullWidth>
            Add Item
          </Button>
        </Stack>
      </form>
    </Drawer>
  );
};

export default AddItemDrawer;