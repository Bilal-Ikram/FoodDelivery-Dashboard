import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { registerRestaurant } from "../controllers/user.controller.js";
import { createMenu } from "../controllers/menu.controller.js";
import {
  loginUser,
  logoutUser,
  refreshAccessToken,
  migrateUsers,
} from "../controllers/user.controller.js";

const router = Router();

// Register a new restaurant
router.route("/register").post(registerRestaurant);
router.route("/login").post(loginUser);

//secured routes
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/refresh-token").post(refreshAccessToken);

// Create a new menu item
router.route("/:restaurantId/menu").post(
  upload.single("image"), // ✅ Process file first
  verifyJWT, // Then authenticate
  createMenu
);
router.post("/migrate-users", verifyJWT, migrateUsers);
// router.patch('/menu/:id/image', updateMenuItemImage);

export default router;
