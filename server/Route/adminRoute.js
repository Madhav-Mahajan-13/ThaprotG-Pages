import express from "express";
import { changeStatus, getApprovedProjects, getDeniedProjects, getPendingProjects, searchProjects } from "../Controllers_admin/projectController.js";
import { activateSubAdmin, createSubAdmin, deleteSubAdmin, suspendSubAdmin, viewAllSubAdmin } from "../Controllers_admin/AdminCreationController.js";
import { activeCarousel, createCarousel, deleteCarousel, showCarousel, suspendCarousel } from "../Controllers_admin/carouselController.js";
import { uploadProjectFiles } from "../middleware/uploadFiles.js";
import { addInsight } from "../Controllers_admin/insightController.js";
import { activeUser, deleteUser, getAllUsers, searchUsers, suspendUser } from "../Controllers_admin/userController.js";
import { activeEvent, createEvent, deleteEvent, showEvent, suspendEvent } from "../Controllers_admin/eventController.js";
import { forgotPassword, loginAdmin, resetPassword, verifyOTP } from "../Controllers_admin/loginController.js";


const adminRouter = express.Router();
//projects
adminRouter.get("/projects_approved",getApprovedProjects)
adminRouter.get("/projects_pending",getPendingProjects)
adminRouter.get("/projects_denied",getDeniedProjects)
adminRouter.post("/projects/search",searchProjects)
adminRouter.post("/changeStatus",changeStatus)
//subadmins
adminRouter.get("/viewSubAdmins",viewAllSubAdmin)
adminRouter.post("/createSubAdmin",createSubAdmin)
adminRouter.post("/activeSubAdmin",activateSubAdmin)
adminRouter.post("/suspendSubAdmin",suspendSubAdmin)
adminRouter.post("/deleteSubAdmin",deleteSubAdmin)
// carousel
adminRouter.get("/viewCarousel",showCarousel)
adminRouter.post("/createCarousel",uploadProjectFiles,createCarousel)
adminRouter.post("/activeCarousel",activeCarousel)
adminRouter.post("/suspendCarousel",suspendCarousel)
adminRouter.post("/deleteCarousel",deleteCarousel)
// insight
adminRouter.post("/addInsight",uploadProjectFiles,addInsight)

// users
adminRouter.get("/users",getAllUsers)
adminRouter.post("/searchUsers",searchUsers)
adminRouter.post("/activeUser",activeUser)
adminRouter.post("/suspendUser",suspendUser)
adminRouter.post("/deleteUser",deleteUser)

adminRouter.get('/viewEvents',showEvent)
adminRouter.post("/createEvent",uploadProjectFiles,createEvent)
adminRouter.post("/activeEvent",activeEvent)
adminRouter.post("/suspendEvent",suspendEvent)
adminRouter.post("/deleteEvent",deleteEvent)

// login
adminRouter.post("/loginAdmin",loginAdmin)
adminRouter.post("/forg0tPassword",forgotPassword);
adminRouter.post("/verifyOtp",verifyOTP);
adminRouter.post("/resetPassword",resetPassword);


export default adminRouter;