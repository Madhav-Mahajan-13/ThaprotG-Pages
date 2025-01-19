import express from 'express';
import { getAlumProjects, searchProjects } from '../Controllers/alumProjectController.js';
const alumProjectRouter = express.Router();

alumProjectRouter.get("/allproject",getAlumProjects);
alumProjectRouter.get("/search",searchProjects)



export default alumProjectRouter; // For ES6 syntax


