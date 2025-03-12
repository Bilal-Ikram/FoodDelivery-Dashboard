import { Menu } from "../models/menu.model";
import { ApiError } from "../utils/ApiError";
import asyncHandler from "../utils/asyncHandler";
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import { upload } from '../middlewares/multer.middleware.js';
import fs from 'fs';

// Apply Multer middleware for image upload
const uploadMiddleware = upload.single('image');

const createMenu = asyncHandler(async (req, res) => {
  // Wrap in Multer middleware to handle file upload
  uploadMiddleware(req, res, async (err) => {
    try {
      if (err) {
        throw new ApiError(400, "File upload error");
      }

      const { name, description, variations, category } = req.body;

      // Validate required fields
      if (!name || !category || !req.file) {
        throw new ApiError(400, "Name, category and image are required");
      }

      // Check if menu already exists in this restaurant
        const existingMenu = await Menu.findOne({
          $or: [{ name }, { restaurantId: req.user._id }]
      });
      if (existingMenu) {
        throw new ApiError(400, "Menu item with this name already exists");
      }

      // Validate variations array
      if (!Array.isArray(variations) || variations.length === 0) {
        throw new ApiError(400, "At least one variation is required");
      }

      // Validate variation structure
      const validVariations = [];
      const sizeSet = new Set();
      
      for (const variation of variations) {
        if (!variation.size || !variation.price) {
          throw new ApiError(400, "Each variation must have size and price");
        }

        const normalizedSize = variation.size.trim().toLowerCase();
        if (sizeSet.has(normalizedSize)) {
          throw new ApiError(400, `Duplicate size: ${variation.size}`);
        }
        sizeSet.add(normalizedSize);

        const price = parseFloat(variation.price);
        if (isNaN(price) || price <= 0) {
          throw new ApiError(400, `Invalid price for ${variation.size}`);
        }

        validVariations.push({
          size: normalizedSize,
          price: price.toFixed(2)
        });
      }

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
          public_id: cloudinaryResponse.public_id
        },
        restaurantId: req.user._id
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
        image: menu.image.url
      });

    } catch (error) {
      // Cleanup on error
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      throw new ApiError(error.statusCode || 500, error.message || "Something went wrong while creating the menu");
    }
  });
});