import { Drawer } from '@mantine/core';
import { TextInput, ColorInput, FileInput, Button, Stack } from '@mantine/core';

const AddCategoryDrawer = ({ opened, close }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Category form submitted');
    close();
  };

  return (
    <Drawer
      opened={opened}
      onClose={close}
      title="Add New Category"
      position="right"
      size="md"
      overlayProps={{ opacity: 0.5, blur: 4 }}
    >
      <form onSubmit={handleSubmit}>
        <Stack spacing="md">
          <TextInput
            label="Category Name"
            placeholder="Enter category name"
            required
          />
          
         
          
          <FileInput
            label="Category Icon"
            placeholder="Choose icon"
            accept="image/*"
          />
          
          <ColorInput
            label="Category Color"
            placeholder="Pick color"
          />
          
          <Button type="submit" color="blue" fullWidth>
            Add Category
          </Button>
        </Stack>
      </form>
    </Drawer>
  );
};

export default AddCategoryDrawer;