import express from 'express';
import { uploadProjectFiles } from '../middleware/uploadFiles.js';
import { postProject } from '../Controllers/postProjectController.js';

const postProjectRouter=express.Router();

postProjectRouter.post("/postProject",uploadProjectFiles,postProject)

export default postProjectRouter;