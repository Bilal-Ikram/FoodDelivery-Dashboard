import { Router } from "express";
import { registerRestaurant } from "../controllers/register.controller.js";
const router = Router();

// Register a new restaurant
router.post('/register', registerRestaurant);

export default router;