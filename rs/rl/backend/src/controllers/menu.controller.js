import { Menu } from "../models/menu.model.js";
import { ApiError } from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import fs from "fs";

const createMenu = asyncHandler(async (req, res) => {
  // Wrap in Multer middleware to handle file upload
  // console.log('Received files:', req.file);
  // console.log('Received body:', req.body);
  try {
    // Get fields from request
    const { name, description, category } = req.body;
    const variations = JSON.parse(req.body.variations);
    const restaurantId = req.params.restaurantId; // Get from URL params

    // Validate required fields
    if (!req.file) throw new ApiError(400, "Image file is required");
    if (!name || !category)
      throw new ApiError(400, "Name and category are required");

    // Check existing menu (fix query)
    const existingMenu = await Menu.findOne({
      name: name.trim(),
      restaurantId,
    });

    if (existingMenu) {
      throw new ApiError(400, "Menu item with this name already exists");
    }

    // Verify restaurant ID matches logged-in user
    if (req.params.restaurantId !== req.user.restaurantId.toString()) {
      throw new ApiError(403, "Unauthorized restaurant access");
    }

    // Process variations (keep as numbers)
    const validVariations = variations.map((v) => ({
      size: v.size.trim().toLowerCase(),
      price: parseFloat(v.price),
    }));

    // Upload image to Cloudinary
    const cloudinaryResponse = await uploadOnCloudinary(req.file.path);
    if (!cloudinaryResponse?.secure_url) {
      throw new ApiError(500, "Failed to upload image");
    }

    // Create menu item
    const menu = new Menu.create({
      name: name.trim(),
      description: description?.trim(),
      category: category.trim().toLowerCase(),
      variations: validVariations,
      image: {
        url: cloudinaryResponse.secure_url,
        public_id: cloudinaryResponse.public_id,
      },
      restaurantId: req.user._id,
    });
    await menu.save();

    // Cleanup temporary file
    fs.unlinkSync(req.file.path);

    res.status(201).json({
      _id: menu._id,
      name: menu.name,
      description: menu.description,
      category: menu.category,
      variations: menu.variations,
      image: menu.image.url,
    });
  } catch (error) {
    // Cleanup on error
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    throw new ApiError(
      error.statusCode || 500,
      error.message || "Something went wrong while creating the menu"
    );
  }
});
export { createMenu };
