import express from "express";
import { changeStatus, getApprovedProjects, getDeniedProjects, getPendingProjects, searchProjects } from "../Controllers_admin/projectController.js";
import { activateSubAdmin, createSubAdmin, deleteSubAdmin, registerSiteAdmin, suspendSubAdmin, viewAllSubAdmin } from "../Controllers_admin/AdminCreationController.js";
import { activeCarousel, createCarousel, deleteCarousel, showCarousel, suspendCarousel } from "../Controllers_admin/carouselController.js";
import { uploadProjectFiles } from "../middleware/uploadFiles.js";
import { addInsight } from "../Controllers_admin/insightController.js";
import { activeUser, deleteUser, getAllUsers, searchUsers, suspendUser } from "../Controllers_admin/userController.js";
import { activeEvent, createEvent, deleteEvent, showEvent, suspendEvent } from "../Controllers_admin/eventController.js";
import { forgotPassword, loginAdmin, resetPassword, verifyOTP } from "../Controllers_admin/loginController.js";
import verifyToken from "../middleware/adminMiddleware.js";
import rateLimit from "express-rate-limit";

const otpLimiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: process.env.otp_limits,
    message: { msg: "Too many OTP requests. Try again later.", success: false },
  });


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
adminRouter.post("/createAdmin",registerSiteAdmin)
adminRouter.post("/loginAdmin",loginAdmin)
adminRouter.post("/forgotPassword",otpLimiter,forgotPassword);

adminRouter.post("/verifyOTP",verifyOTP);
adminRouter.post("/resetPassword",resetPassword);

adminRouter.get("/verifyToken",verifyToken,async (req,res) => {
    const user_type = req.user_type;
    return res.status(200).json({
        success:true,
        user_type : user_type
    })
})

adminRouter.get("/logout",async (req,res) => {
    try {
        res.clearCookie("authToken");

        return res.status(200).json({
            success:true,
            message:"Logged Out Successfully"
        })
    } catch (e) {
        return res.status(400).json({
            success:false,
            message:e.message
        })
    }
    

})

export default adminRouter;