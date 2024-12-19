import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./utils/db.js";
import cookieParser from "cookie-parser";
dotenv.config();

export const app = express();

// BODY PARSER
app.use(express.json());
// COOKIE PARSER
app.use(cookieParser());
// CORS [CROSS ORIGIN RESOURCE SHARING]
app.use(cors('*'));

// creating first route
app.get("/", (req, res) => {
  res.send("API is working");
});

// routes
import jobRouter from "./routes/jobs.routes.js";
import userRouter from "./routes/user.routes.js";
app.use("/", userRouter,jobRouter);

// SERVER
app.listen(process.env.PORT || 3000, () => {
  connectDB();
  console.log(`Server is connected with port ${process.env.PORT || 3000}`);
});
