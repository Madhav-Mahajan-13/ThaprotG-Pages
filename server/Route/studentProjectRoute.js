import express from 'express';
import { getStudentProjects, searchProjects } from '../Controllers/studentProjectController.js';
// import { getAlumProjects, searchProjects } from '../Controllers/alumProjectController.js';
const studentProjectRouter = express.Router();
studentProjectRouter.post("/allproject",getStudentProjects);
studentProjectRouter.post("/search",searchProjects)

export default studentProjectRouter;


// export default alumProjectRouter; // For ES6 syntax


