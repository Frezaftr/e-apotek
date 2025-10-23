import express from "express";
import { registerUser, loginUser, getUsers } from "../controllers/userController.js";

const router = express.Router();

// Route untuk register dan login
router.post("/register", registerUser);
router.post("/login", loginUser);


router.get("/", getUsers);

router.get("/", getUsers);

export default router;
