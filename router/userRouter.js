import express from "express";
import { userLogin, userRegistration } from "../controllers/userController.js";

const router = express.Router();

router.post("/user-registration", userRegistration);

router.post("/user-login", userLogin);

export default router;
