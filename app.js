import express from "express";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

import cors from "cors";
import userRoutes from "./router/userRouter.js";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://paying-guest-online-frontend.vercel.app/",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
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

app.use("/api/user", userRoutes);
