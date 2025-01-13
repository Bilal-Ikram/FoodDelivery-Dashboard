import asyncHandler from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from '../utils/ApiError.js';
import { User } from "../models/user.model.js";
import sendEmail from '../utils/Email.js';

// Create new user
// backend/controllers/restaurantController.js
const generateAccessAndRefreshToken = async (userId) => {// Generate access and refresh tokens

  try {
    const user = await User.findById(userId)
    const accessToken = user.generateAccessToken()
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  }
  catch (error) {
    throw new ApiError(500, "Something went wrong while generating access and refresh token");
  }
}


const registerRestaurant = asyncHandler(async (req, res) => {
  try {
    const { restaurantName, name, email, password, phoneNo, restaurantAddress } = req.body;

    // Checking if user,email snd pass are empty or user has left them empty
    if (
      [name, restaurantName, email, password, restaurantAddress, phoneNo].some((field) =>
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
      password,
      phoneNo,
      restaurantAddress,
      refreshToken
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
    res.status(201).json(new ApiResponse(200, 'Registration successful. Await admin approval.')
    );
  } catch (err) {
    console.error('Error registering restaurant:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const loginUser = asyncHandler(async (req, res) => {
  // req body should contain email and password
  // find the user with the email
  // check if the password is correct
  // generate a token if password  is correct
  // send the token to the user in secure cookies
  // send a success response to the user
  // backend/controllers/authController.js

  try {
    const { email, password } = req.body;
    console.log(email);
    
    if (!email && !password) {
      throw new ApiError(400, 'Please provide email and password');
    }

    const user = await User.findOne({ email });

    if (!user) {
      throw new ApiError(401, 'User does not exist');
    }

    const isPasswordValid = await user.isPasswordCorrect(password)
    if (!isPasswordValid) {
      throw new ApiError(401, 'Incorrect password');
    }
    // Generate JWT token

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")
    //send in cookies
    const options = {
      httpOnly: true,
      secure: true
    }

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse(
          200,
          {
            user: loggedInUser, accessToken,
            refreshToken
          },
          'User Logged in successfully'
        )
      );
  } catch (err) {
    console.error('Error logging in:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: undefined
      }
    },
    {
      new: true,
    }
  )
  const options = {
    httpOnly: true,
    secure: true
  }

  return res
   .status(200)
   .clearCookie("accessToken", options)
   .clearCookie("refreshToken", options)
   .json(new ApiResponse(200, 'User logged out successfully'));

});
export { registerRestaurant, loginUser, logoutUser };