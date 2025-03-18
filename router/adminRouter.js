import express from "express";
import {
  adminLoginData,
  adminRegistrationData,
} from "../controllers/adminController.js";

const router = express.Router();

router.post("/admin-registration", adminRegistrationData);

router.post("/admin-login", adminLoginData);

export default router;
