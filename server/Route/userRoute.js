import express from "express"
import { getCurrentUser, updateUser,searchUser } from "../Controllers/userControllers.js";

export const userRouter =express.Router();

// userRouter.post("/api/post-projects",upload.fields([
//     { name: 'image', maxCount: 1 },
//     { name: 'pdf', maxCount: 1 },
// ]),postProject);


// getcurrentuser
userRouter.get("/dashboard/:userId",getCurrentUser)
userRouter.post("/dashboard/:userId",updateUser)
userRouter.get("/search/:name",searchUser)