import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { User } from "./models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;
const secretKey = process.env.JWT_SECRET_KEY;
const initializeDBAndServer = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("DB Connection: Success");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};
initializeDBAndServer();

const generateToken = (user) => {
  return jwt.sign({ id: user._id }, secretKey);
};

app.post("/api/user/registration", async (req, res) => {
  const { name, email, password, gender, city, mobile_number } = req.body;
  const userStatus = await User.findOne({ email: email });
  if (userStatus) {
    res.status(400).send({ message: "User already exists" });
  } else {
    const saltedRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltedRounds);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      gender,
      city,
      mobile_number,
    });
    await newUser.save();
    const token = generateToken(newUser);
    res
      .status(200)
      .send({ message: "User registered successfully", jwt_token: token });
  }
});

// User Login API

app.post("/api/user/login", async (req, res) => {
  const { email, password } = req.body;
  // Check User Exist with email
  const userStatus = await User.findOne({ email: email });
  if (userStatus) {
    // Check for valid Password
    const hashedPassword = await bcrypt.compare(password, userStatus.password);
    if (hashedPassword) {
      const token = generateToken(userStatus);
      res
        .status(200)
        .send({ message: "User logged in successfully", jwt_token: token });
    } else {
      res.status(400).send({ message: "Invalid Password" });
    }
  } else {
    res.status(400).send({ message: "User does not exist" });
  }
});
