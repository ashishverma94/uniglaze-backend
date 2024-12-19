import express from "express";
import { createUserRequest } from "../controller/user.controller.js";
const userRouter = express.Router();

userRouter.post("/user-request", createUserRequest);

export default userRouter; 
