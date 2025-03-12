import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { registerRestaurant } from "../controllers/user.controller.js";
import { createMenuItem, updateMenuItemImage } from '../controllers/menu.controller.js';
import { loginUser, logoutUser, refreshAccessToken } from "../controllers/user.controller.js";

const router = Router();

// Register a new restaurant
router.route("/register").post(registerRestaurant);
router.route("/login").post(loginUser);

//secured routes
router.route("/logout").post(verifyJWT, logoutUser)
router.route("/refresh-token").post(refreshAccessToken)

// Create a new menu item
router.post('/restaurants/:restaurantId/menu', createMenuItem);
router.patch('/menu/:id/image', updateMenuItemImage);

export default router;