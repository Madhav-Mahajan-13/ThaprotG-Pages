import express from "express";
import { changeStatus, getApprovedProjects, getDeniedProjects, getPendingProjects, searchProjects } from "../Controllers_admin/projectController.js";
import { activateSubAdmin, createSubAdmin, suspendSubAdmin, viewAllSubAdmin } from "../Controllers_admin/AdminCreationController.js";
import { activeCarousel, createCarousel, showCarousel, suspendCarousel } from "../Controllers_admin/carouselController.js";
import { uploadProjectFiles } from "../middleware/uploadFiles.js";

const adminRouter = express.Router();

adminRouter.get("/projects_approved",getApprovedProjects)
adminRouter.get("/projects_pending",getPendingProjects)
adminRouter.get("/projects_denied",getDeniedProjects)
adminRouter.post("/projects/search",searchProjects)
adminRouter.post("/changeStatus",changeStatus)
adminRouter.post("/changeStatus",changeStatus)
adminRouter.get("/viewSubAdmins",viewAllSubAdmin)
adminRouter.post("/createSubAdmin",createSubAdmin)
adminRouter.post("/activeSubAdmin",activateSubAdmin)
adminRouter.post("/suspendSubAdmin",suspendSubAdmin)
adminRouter.get("/viewCarousel",showCarousel)
adminRouter.post("/crateCarousel",uploadProjectFiles,createCarousel)
adminRouter.post("/activeCarousel",activeCarousel)
adminRouter.post("/suspendCarousel",suspendCarousel)
export default adminRouter;