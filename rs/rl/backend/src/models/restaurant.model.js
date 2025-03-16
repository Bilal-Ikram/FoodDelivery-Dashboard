import mongoose from "mongoose";

const RestaurantSchema = new mongoose.Schema(
    {
      restaurantName: {
        type: String,
        required: true,
        trim: true,
        match: /^[a-zA-Z\s]+$/,
        minlength: 3,
        maxlength: 50,
        index: true
      },
      address: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 100
      },
      phone: {
        type: String,
        required: true,
        minlength: 11,
        maxlength: 11,
        match: /^[0-9]{11}$/
      },
      isActive: {
        type: Boolean,
        default: true
      }
    },
    { timestamps: true }
  );
  
  export const Restaurant = mongoose.model("Restaurant", RestaurantSchema);