import express from "express";
import { userLogin, userRegistration } from "../controllers/userController.js";

const router = express.Router();

router.post("/registration", userRegistration);

router.post("/login", userLogin);

export default router;
