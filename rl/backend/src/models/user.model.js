import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema(
  {
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Restaurant',
      required: true,
      index: true
    },

    fullName: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 50
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ['owner', 'manager', 'staff'],
      default: 'owner'
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
      email: this.email,
      restaurantId: this.restaurant._id,
      role: this.role
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
