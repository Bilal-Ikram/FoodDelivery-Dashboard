import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    restaurantName: {
      type: String,
      required: true,
      lowercase: true,
      match: /^[a-zA-Z\s]+$/,
      minlength: 3,
      maxlength: 20,
      trim: true
    },
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    phoneNo: {
      type: String,
      minlength: 11,
      maxlength: 11,
      required: true
    },
    restaurantAddress: {
      type: String,
      minlength: 10,
      maxlength: 50,
      required: true
    },
    isApproved: {
      type: Boolean,
      default: false
    },
  },
  {
    timestamps: true
  }
);
export const User = mongoose.model("User", UserSchema)
