import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

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

app.get("/", (req, res) => res.send("Hello from the backend"));
