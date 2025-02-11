import express from "express"
import { getCurrentUser, updateUser,searchUser, getUserInfo } from "../Controllers/userControllers.js";
import { uploadProjectFiles } from "../middleware/uploadFiles.js";

export const userRouter =express.Router();

// userRouter.post("/api/post-projects",upload.fields([
//     { name: 'image', maxCount: 1 },
//     { name: 'pdf', maxCount: 1 },
// ]),postProject);


// getcurrentuser
userRouter.get("/dashboard/:userId",getCurrentUser)
userRouter.post("/dashboard/:userId",uploadProjectFiles,updateUser)
userRouter.get("/search/:query",searchUser)
userRouter.get("/getUser/:username",getUserInfo)