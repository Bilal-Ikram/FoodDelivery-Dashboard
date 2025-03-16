import asyncHandler from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from '../utils/ApiError.js';
import { User } from "../models/user.model.js";
import sendEmail from '../utils/Email.js';
import { verifyJWT } from './../middlewares/auth.middleware.js';
import { Restaurant } from "../models/restaurant.model.js";
// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';

// Create new user
// backend/controllers/restaurantController.js
const generateAccessAndRefreshToken = async (userId) => {
  // Generate access and refresh tokens

  try {
    const user = await User.findById(userId).populate('restaurant');
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    console.log("Access Token:", accessToken); // Debugging
    console.log("Refresh Token:", refreshToken); // Debugging

    user.refreshToken = refreshToken
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  }
  catch (error) {
    throw new ApiError(500, "Something went wrong while generating access and refresh token");
  }
}

// 🔄 Migration script for Existing Users
const migrateUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find({ restaurantName: { $exists: true } });
    
    if(users.length === 0) {
      return res.status(200).json(new ApiResponse(200, {}, "No users to migrate"));
    }

    const migrationResults = await Promise.all(users.map(async (user) => {
      try {
        // Create new restaurant entry
        const restaurant = await Restaurant.create({
          name: user.restaurantName,
          address: user.restaurantAddress,
          phone: user.phoneNo,
          isApproved: user.isApproved
        });

        // Update user document
        const updatedUser = await User.findByIdAndUpdate(
          user._id,
          {
            $set: { restaurant: restaurant._id },
            $unset: { 
              restaurantName: 1, 
              restaurantAddress: 1, 
              phoneNo: 1,
              isApproved: 1
            }
          },
          { new: true }
        ).select("-password -refreshToken");

        return {
          userId: user._id,
          restaurantId: restaurant._id,
          success: true
        };
      } catch (error) {
        return {
          userId: user._id,
          success: false,
          error: error.message
        };
      }
    }));

    return res.status(200).json(
      new ApiResponse(200, { results: migrationResults }, "Migration completed")
    );

  } catch (error) {
    throw new ApiError(500, `Migration failed: ${error.message}`);
  }
});


// Register a new restaurant

const registerRestaurant = asyncHandler(async (req, res) => {
  // get user details from frontend
  // validation - not empty
  // check if user already exists: username, email
  // check for images, check for avatar
  // upload them to cloudinary, avatar
  // create user object - create entry in db
  // remove password and refresh token field from response
  // check for user creation
  // return res
  try {
    const { restaurantName, FullName, email, password, phone, address } = req.body;

    // Checking if user,email snd pass are empty or user has left them empty
    if (
      [FullName, restaurantName, email, password, address, phone].some((field) =>
        field.trim().length === 0)
    ) {
      throw new ApiError(400, "All fields are required");
    }
    // Check if the restaurant already exists
    const existingRestaurant = await User.findOne({ $or: [{ name: restaurantName }, { email }] });
    if (existingRestaurant) {
      throw new ApiError(400, 'Email or restaurantName already exists');
    }

    // Create a new restaurant first
    const restaurant = new Restaurant({
      name: restaurantName,
      address,
      phone,
    });

    // Save the restaurant to the database
    await restaurant.save();

     // Create user with restaurant reference
     const user = await User.create({
      name,
      email,
      password,
      restaurant: restaurant._id,
      role: 'owner'
    });
    // Generate access and refresh tokens
    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(restaurant._id);

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
    return res.status(201).json(new ApiResponse(200, { accessToken, refreshToken },'Registration successful. Await admin approval.')
    );
  } catch (err) {
    console.error('Error registering restaurant:', err);
    return res.status(500).json({ error: 'Internal server error' });
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

    if (!email && !password) {
      throw new ApiError(400, 'Please provide email and password');
    }

    const user = await User.findOne({ email }).populate('restaurant');

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
      // secure: true
      domain: 'localhost', // Set the domain to localhost
      path: '/' // Set the path to root
    }


    console.log("Access Token before setting cookie:", accessToken); // Debugging
    console.log("Refresh Token before setting cookie:", refreshToken); // Debugging

   
    await user.save({ validateBeforeSave: false });

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse(
          200,
          {
            user: {
              _id: user._id,
              name: user.name,
              email: user.email,
              role: user.role,
              restaurant: user.restaurant,
              restaurantId: user.restaurantId
            },
            accessToken,
            refreshToken

          },
          'User Loggedd in successfully'
        )
      )
    // .redirect(`http://localhost:5174/${uniqueIdentifier}`);
  } catch (err) {
    throw new ApiError(err.statusCode || 500, err.message || 'Login failed');
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
    // secure: true
    domain: 'localhost', // Set the domain to localhost
    path: '/' // Set the path to root
  }

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, 'User logged out successfully'));

});

// Refresh token

const refreshAccessToken = asyncHandler(async (req, res) => {
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
      //  secure: true
      domain: 'localhost', // Set the domain to localhost
      path: '/' // Set the path to root
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


export { registerRestaurant, loginUser, logoutUser, refreshAccessToken, migrateUsers };