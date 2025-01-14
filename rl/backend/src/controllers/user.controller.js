import asyncHandler from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from '../utils/ApiError.js';
import { User } from "../models/user.model.js";
import sendEmail from '../utils/Email.js';
import { verifyJWT } from './../middlewares/auth.middleware.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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

    // Validation
    if ([name, restaurantName, email, password, restaurantAddress, phoneNo].some(field => 
      !field || field.trim().length === 0)) {
      throw new ApiError(400, "All fields are required");
    }

    // Check if the  restaurant already exists
    const existingRestaurant = await User.findOne({ 
      $or: [{ restaurantAddress }, { email }] 
    });
    
    if (existingRestaurant) {
      throw new ApiError(400, `Restaurant with this email or address already exists`);
    }

   

    // Create restaurant
    const restaurant = await User.create({
      restaurantName,
      name,
      email,
      password,
      phoneNo,
      restaurantAddress,
      refreshToken
    });

    // Remove password from response
    const createdRestaurant = restaurant.toObject();
    delete createdRestaurant.password;
    delete createdRestaurant.refreshToken;

    // Send admin email
    const adminEmail = process.env.ADMIN_EMAIL || 'bilalik3210@gmail.com';
    const subject = 'New Restaurant Registration';
    const text = `A new restaurant has registered:\n\nRestaurant Name: ${restaurantName}\nName: ${name}\nEmail: ${email}\nPhone: ${phoneNo}\nAddress: ${restaurantAddress}`;
    
    await sendEmail(adminEmail, subject, text);
    console.log("Admin notification email sent successfully");

    return res.status(201).json(
      new ApiResponse(201, createdRestaurant, 'Registration successful. Await admin approval.')
    );
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
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

    console.log('Login attempt for:', email);

    if (!email && !password) {
      throw new ApiError(400, 'Email and password are required');
    }

    // Find user and include password field
    const user = await User.findOne({ email }).select('+password');
    
    if (!user) {
      throw new ApiError(401, 'Invalid credentials');
    }

    // Debug log
    console.log('Found user:', { email: user.email });

    // Compare password using bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new ApiError(401, 'Invalid password credentials');
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);

    // Remove sensitive data from response
    const loggedInUser = user.toObject();
    delete loggedInUser.password;
    delete loggedInUser.refreshToken;

    const options = {
      httpOnly: true,
      secure: true,
      sameSite: 'strict'
    };

    return res
      .status(200)
      .cookie('accessToken', accessToken, options)
      .cookie('refreshToken', refreshToken, options)
      .json(new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken
        },
        'Login successful'
      ));
  } catch (err) {
    console.error('Login error:', err);
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

// Refresh token

const refreshToken = asyncHandler(async (req, res) => {
  // Get the refresh token from the request
  const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;
  if (!incomingRefreshToken) {
    throw new ApiError(401, 'No refresh token provided');
  }
  // Verify the refresh token
  try {
    const decodedToken = verifyJWT(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET,
    )
    const user = await User.findById(decodedToken?._id)
    if (!user) {
      throw new ApiError(403, 'Unauthorized');
    }
    // matching 
    if (incomingRefreshToken !== user?.refreshToken) {
      throw new ApiError(403, 'Refresh TOken is expored or used');
    }
    const options = {
      httpOnly: true,
      secure: true
    }
    const { accessToken, newRefreshToken } = await generateAccessAndRefreshToken(user._id);
    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, newRefreshToken },
          'User refreshed successfully'
        )
      )
  } catch (error) {
    throw new ApiError(401, error?.message ||
      'Invalid refresh token or expired token'
    )
  }

})


export { registerRestaurant, loginUser, logoutUser, refreshToken };