import express from "express";
import { changeStatus, getApprovedProjects, getDeniedProjects, getPendingProjects, searchProjects } from "../Controllers_admin/projectController.js";
import { activateSubAdmin, createSubAdmin, deleteSubAdmin, registerSiteAdmin, suspendSubAdmin, viewAllSubAdmin } from "../Controllers_admin/AdminCreationController.js";
import { activeCarousel, createCarousel, deleteCarousel, showCarousel, suspendCarousel } from "../Controllers_admin/carouselController.js";
import { uploadProjectFiles } from "../middleware/uploadFiles.js";
import { addInsight, getAllInsights } from "../Controllers_admin/insightController.js";
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
adminRouter.get("/projects_approved",verifyToken,getApprovedProjects)
adminRouter.get("/projects_pending",verifyToken,getPendingProjects)
adminRouter.get("/projects_denied",verifyToken,getDeniedProjects)
adminRouter.post("/projects/search",verifyToken,searchProjects)
adminRouter.post("/changeStatus",verifyToken,changeStatus)
//subadmins
adminRouter.get("/viewSubAdmins",verifyToken,viewAllSubAdmin)
adminRouter.post("/createSubAdmin",verifyToken,createSubAdmin)
adminRouter.post("/activeSubAdmin",verifyToken,activateSubAdmin)
adminRouter.post("/suspendSubAdmin",verifyToken,suspendSubAdmin)
adminRouter.post("/deleteSubAdmin",verifyToken,deleteSubAdmin)
// carousel
adminRouter.get("/viewCarousel",verifyToken,showCarousel)
adminRouter.post("/createCarousel",verifyToken,uploadProjectFiles,createCarousel)
adminRouter.post("/activeCarousel",verifyToken,activeCarousel)
adminRouter.post("/suspendCarousel",verifyToken,suspendCarousel)
adminRouter.post("/deleteCarousel",verifyToken,deleteCarousel)
// insight
adminRouter.post("/addInsight",verifyToken,uploadProjectFiles,addInsight)
adminRouter.get("/getInsights",verifyToken,uploadProjectFiles,getAllInsights)

// users
adminRouter.get("/users",verifyToken,getAllUsers)
adminRouter.post("/searchUsers",verifyToken,searchUsers)
adminRouter.post("/activeUser",verifyToken,activeUser)
adminRouter.post("/suspendUser",verifyToken,suspendUser)
adminRouter.post("/deleteUser",verifyToken,deleteUser)

adminRouter.get('/viewEvents',verifyToken,showEvent)
adminRouter.post("/createEvent",verifyToken,uploadProjectFiles,createEvent)
adminRouter.post("/activeEvent",verifyToken,activeEvent)
adminRouter.post("/suspendEvent",verifyToken,suspendEvent)
adminRouter.post("/deleteEvent",verifyToken,deleteEvent)

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
        res.clearCookie("token");

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