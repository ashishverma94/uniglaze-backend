import express from "express";
import { jobApplication } from "../controller/jobs.controller.js";
const jobRouter = express.Router();

jobRouter.post("/apply-job", jobApplication);

export default jobRouter; 
