import { Router } from "express";
import { registerRestaurant } from "../controllers/register.controller.js";
import { loginUser, logoutUser } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router();

// Register a new restaurant
router.route("/register").post(registerRestaurant);
router.route("/login").post(loginUser);

//secured routes
router.route("/logout").post(verifyJWT, logoutUser)

export default router;