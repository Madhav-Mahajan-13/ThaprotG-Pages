import express from 'express';
import { getAlumProjects, searchProjects } from '../Controllers/alumProjectController.js';
const alumProjectRouter = express.Router();

alumProjectRouter.post("/allproject",getAlumProjects);
alumProjectRouter.post("/search",searchProjects)



export default alumProjectRouter; // For ES6 syntax
