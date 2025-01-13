import asyncHandler from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from '../utils/ApiError.js';
import { User } from "../models/user.model.js";
import sendEmail from '../utils/Email.js';

// Create new user
// backend/controllers/restaurantController.js

const registerRestaurant =asyncHandler( async (req, res) => {
  try {
    const { restaurantName, name, email, phoneNo, restaurantAddress } = req.body;

    // Checking if user,email snd pass are empty or user has left them empty
    if (
        [name,restaurantName, email, restaurantAddress,phoneNo].some((field) =>
            field.trim().length === 0)
    ) {
        throw new ApiError(400, "All fields are required");
    }
    // Check if the restaurant already exists
    const existingRestaurant = await User.findOne({ $or: [{ restaurantAddress }, { email }] });
    if (existingRestaurant) {
        throw new ApiError(400, 'Email already exists');
    }

    // Create a new restaurant
    const restaurant = new User({
      restaurantName,
      name,
      email,
      phoneNo,
      restaurantAddress,
    });

    // Save the restaurant to the database
    await restaurant.save();

    // Send an email to the admin
    const adminEmail = process.env.ADMIN_EMAIL || 'bilalik3210@gmail.com';
    const subject = 'New Restaurant Registration';
    const text = `A new restaurant has registered:\n\nRestaurant Name: ${restaurantName}\nName: ${name}\nEmail: ${email}\nPhone: ${phoneNo}\nAddress: ${restaurantAddress}`;
    console.log("Sending email to admin:", adminEmail); // Log the admin email
    console.log("Email subject:", subject); // Log the email subject
    console.log("Email content:", text); // Log the email content
    await sendEmail(adminEmail, subject, text);
    console.log("Email sent successfully!"); // Log success message


    // Respond to the client
    res.status(201).json( new ApiResponse (200,'Registration successful. Await admin approval.')
    );
  } catch (err) {
    console.error('Error registering restaurant:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export{ registerRestaurant };