import { Menu } from "../models/menu.model.js";
import { ApiError } from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import fs from 'fs/promises';
import mongoose from "mongoose";

const createMenu = asyncHandler(async (req, res) => {
  let filePath;
  
  try {
    // Validate required fields
    if (!req.file) {
      throw new ApiError(400, "Image file is required");
    }
    
    const { name, description, category } = req.body;
    if (!name?.trim() || !category?.trim()) {
      throw new ApiError(400, "Name and category are required fields");
    }

    // Verify file exists
    filePath = req.file.path;
    try {
      await fs.access(filePath);
    } catch (error) {
      throw new ApiError(400, "Uploaded file not found on server");
    }

    // Parse and validate variations
    const variations = JSON.parse(req.body.variations || '[]').map(v => {
      const size = String(v.size).trim().toLowerCase();
      const price = parseFloat(v.price);
      
      if (size.length <= 3) {
        throw new ApiError(400, "Size must be at least 3 characters");
      }
      
      if (isNaN(price) || price < 0.01) {
        throw new ApiError(400, "Valid price required (minimum 0.01)");
      }

      return {
        size,
        price: Number(price.toFixed(2))
      };
    });

    // Upload to Cloudinary
    const cloudinaryResponse = await uploadOnCloudinary(filePath);
    if (!cloudinaryResponse?.secure_url) {
      throw new ApiError(500, "Failed to upload image to Cloudinary");
    }

    // Validate restaurant ID format
    if (!mongoose.Types.ObjectId.isValid(req.user.restaurant)) {
      throw new ApiError(400, "Invalid restaurant ID format");
    }

    // Create menu item (no population needed)
    const menu = await Menu.create({
      name: name.trim(),
      description: description?.trim(),
      category: category.trim().toLowerCase(),
      variations,
      image: {
        url: cloudinaryResponse.secure_url,
        public_id: cloudinaryResponse.public_id
      },
      restaurantId: req.user.restaurant
    });

    // Simplified response
    res.status(201).json({
      success: true,
      data: {
        _id: menu._id,
        name: menu.name,
        category: menu.category, // Direct string access
        variations: menu.variations,
        image: menu.image.url
      }
    });

  } catch (error) {
    // Cleanup uploaded file if exists
    if (filePath) {
      await fs.unlink(filePath).catch(console.error);
    }

    // Handle specific error types
    if (error instanceof SyntaxError) {
      throw new ApiError(400, "Invalid variations format");
    }
    if (error instanceof mongoose.Error.ValidationError) {
      const messages = Object.values(error.errors).map(err => err.message);
      throw new ApiError(400, messages.join(', '));
    }

    throw new ApiError(
      error.statusCode || 500,
      error.message || "Failed to create menu item"
    );
  }
});

export { createMenu };