import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
    {
        name: {
        type: String,
        required: true,
        lowercase: true,
        match: /^[a-zA-Z\s]+$/,
        minlength: 3,
        maxlength: 20,
        trim: true
        }
    },
    {
        timestamps: true
    }
);
    
export const Category = mongoose.model("Category", CategorySchema);