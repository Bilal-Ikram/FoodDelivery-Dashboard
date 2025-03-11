import mongoose from "mongoose";

const MenuSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      lowercase: true,
      match: /^[a-zA-Z\s]+$/,
      minlength: 3,
      maxlength: 20,
      trim: true
    },
    price: {
      type: Number,
      required: true
    },
    category: {
      type: String,
      required: true,
      lowercase: true,
      match: /^[a-zA-Z\s]+$/,
      minlength: 3,
      maxlength: 20,
      trim: true
    },
    description: {
      type: String,
      required: true,
      maxlength: 100,
      trim: true
    },
    image: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

export const Menu = mongoose.model("Menu", MenuSchema);