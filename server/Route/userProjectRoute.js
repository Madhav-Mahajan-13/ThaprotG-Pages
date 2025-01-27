import express from 'express';
import { uploadProjectFiles } from '../middleware/uploadFiles.js';
// import { postProject } from '../Controllers/postProjectController.js';
import {postProject, getUserProjects } from '../Controllers/userProjectController.js';

const userProjectRouter=express.Router();

userProjectRouter.post("/postProject",uploadProjectFiles,postProject)
userProjectRouter.post("/getUserProject",getUserProjects)

export default userProjectRouter;