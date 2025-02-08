import express from "express";
import { changeStatus, getApprovedProjects, getDeniedProjects, getPendingProjects, searchProjects } from "../Controllers_admin/projectController.js";
import { activateSubAdmin, createSubAdmin, deleteSubAdmin, suspendSubAdmin, viewAllSubAdmin } from "../Controllers_admin/AdminCreationController.js";
import { activeCarousel, createCarousel, deleteCarousel, showCarousel, suspendCarousel } from "../Controllers_admin/carouselController.js";
import { uploadProjectFiles } from "../middleware/uploadFiles.js";

const adminRouter = express.Router();

adminRouter.get("/projects_approved",getApprovedProjects)
adminRouter.get("/projects_pending",getPendingProjects)
adminRouter.get("/projects_denied",getDeniedProjects)
adminRouter.post("/projects/search",searchProjects)
adminRouter.post("/changeStatus",changeStatus)
adminRouter.get("/viewSubAdmins",viewAllSubAdmin)
adminRouter.post("/createSubAdmin",createSubAdmin)
adminRouter.post("/activeSubAdmin",activateSubAdmin)
adminRouter.post("/suspendSubAdmin",suspendSubAdmin)
adminRouter.post("/deleteSubAdmin",deleteSubAdmin)
adminRouter.get("/viewCarousel",showCarousel)
adminRouter.post("/crateCarousel",uploadProjectFiles,createCarousel)
adminRouter.post("/activeCarousel",activeCarousel)
adminRouter.post("/suspendCarousel",suspendCarousel)
adminRouter.post("/deleteCarousel",deleteCarousel)
export default adminRouter;