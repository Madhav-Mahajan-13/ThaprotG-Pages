import express from "express";
import { changeStatus, getApprovedProjects, getDeniedProjects, getPendingProjects, searchProjects } from "../Controllers_admin/projectController.js";

const adminRouter = express.Router();

adminRouter.get("/projects_approved",getApprovedProjects)
adminRouter.get("/projects_pending",getPendingProjects)
adminRouter.get("/projects_denied",getDeniedProjects)
adminRouter.post("/projects/search",searchProjects)
adminRouter.post("/changeStatus",changeStatus)
export default adminRouter;