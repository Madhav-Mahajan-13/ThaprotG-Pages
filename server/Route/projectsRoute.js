import express from "express";
import { getAlumProjects, searchProjects } from "../Controllers/alumProjectController.js";
import { getStudentProjects } from "../Controllers/studentProjectController.js";
import { uploadProjectFiles } from "../middleware/uploadFiles.js";
import { getUserProjects, postProject } from "../Controllers/userProjectController.js";

const projectRouter = express.Router();

projectRouter.get();


projectRouter.post("/allproject",getAlumProjects);
projectRouter.post("/search",searchProjects);
projectRouter.post("/allproject",getStudentProjects);
// projectRouter.post("/search",searchStudentProjects)
projectRouter.post("/postPrject",uploadProjectFiles,postProject)
projectRouter.post("/getUserProject",getUserProjects)