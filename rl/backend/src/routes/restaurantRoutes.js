import { Router } from "express";
import { registerRestaurant } from "../controllers/user.controller.js";
import { loginUser, logoutUser, refreshAccessToken } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router();

// Register a new restaurant
router.route("/register").post(registerRestaurant);
router.route("/login").post(loginUser);

//secured routes
router.route("/logout").post(verifyJWT, logoutUser)
router.route("/refresh-token").post(refreshAccessToken)

export default router;