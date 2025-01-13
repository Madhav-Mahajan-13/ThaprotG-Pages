import express from "express"
import { postProject } from "../Controllers/userControllers.js";

export const userRouter =express.Router();

userRouter.post("/api/post-projects",upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'pdf', maxCount: 1 },
]),postProject);

