import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { 
  registerRestaurant,
  loginUser,
  logoutUser,
  refreshAccessToken,
  migrateUsers
} from "../controllers/user.controller.js";
import { createMenu } from "../controllers/menu.controller.js";

const router = Router();

// Auth routes
router.route("/register").post(registerRestaurant);
router.route("/login").post(loginUser);

// Secured routes
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/refresh-token").post(refreshAccessToken);

// Menu routes with proper middleware sequence
router.route("/:restaurantId/menu").post(
  verifyJWT, // ✅ Authenticate first
  upload.single("image"), // Then handle file upload
  createMenu
);

// Migration route
router.post("/migrate-users", verifyJWT, migrateUsers);

export default router;