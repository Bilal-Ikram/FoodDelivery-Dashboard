import { ApiError } from "../utils/ApiError.js";
import aysncHandler from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

// it will verify if user exist or logged in or not
export const verifyJWT = aysncHandler(async (req, _, next) => {
    //
   const token= req.cookies?.accessToken || req.header
    ('Authorization')?.replace("Bearer ","")
    if (!token) {
        throw new ApiError(401,"You are not authenticated!");
    }

    try {
        const decodedToken= jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        
        const user= await User.findById(decodedToken?._id).select(
            '-password -refreshToken'
        )

        if (!user) {
            throw new ApiError(404,"Invalid Access Token");
        }
        req.user= user;
        next();
    } catch (error) {
        throw new ApiError(401,error?.message || "Invalid token!");
    }

})