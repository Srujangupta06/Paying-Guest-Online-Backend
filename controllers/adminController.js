import { Admin } from "../models/adminModel.js"; // Single Admin Model
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const generateToken = (admin) => {
  return jwt.sign({ id: admin._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1h",
  });
};

// Admin Registration
export const adminRegistrationData = async (req, res) => {
  const {
    name,
    email,
    password,
    confirmPassword,
    mobile_number,
    gender,
    city,
  } = req.body;

  try {
    // Check if admin already exists
    const adminStatus = await Admin.findOne({ email });
    if (adminStatus) {
      return res.status(400).json({ message: "Admin Already Exists" });
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // Hash password before storing
    const saltedRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltedRounds);

    // Create new Admin user
    const newAdmin = new Admin({
      name,
      email,
      password: hashedPassword,
      mobile_number,
      gender,
      city,
    });

    await newAdmin.save();

    // Generate JWT token
    const token = generateToken(newAdmin);

    res
      .status(201)
      .json({ message: "Admin Registered Successfully", jwt_token: token });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Admin Login
export const adminLoginData = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the admin exists
    const adminStatus = await Admin.findOne({ email });
    if (!adminStatus) {
      return res
        .status(404)
        .json({ message: "Admin account not found. Please register first." });
    }

    // Validate password
    const isValidPassword = await bcrypt.compare(
      password,
      adminStatus.password
    );
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid Password" });
    }

    // Generate JWT token
    const token = generateToken(adminStatus);

    res
      .status(200)
      .json({ message: "Admin logged in successfully", jwt_token: token });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
