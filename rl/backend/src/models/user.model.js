import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

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
    password: {
      type: String,
      required: true
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
      maxlength: 100,
      required: true
    },
    refreshToken: {
      type: String,
    },
    isApproved: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

// before saving password hash(encrypt) the password.
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()  // if password is not modified, then return next() to avoid hashing the password again.
  this.password = await bcrypt.hash(this.password, 10)  // hash the password before saving to the database
  next()
})
//comparing the password for next login. checking if user enter the correct password.
UserSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password)
}

// generateAccessToken that will be saved in db.
UserSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
  )
}

//same as above code
 UserSchema.methods.generateRefreshToken = function () {

  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }
  )
}
export const User = mongoose.model("User", UserSchema)
