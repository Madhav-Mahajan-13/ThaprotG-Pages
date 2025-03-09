import express from "express";
import { email_notification } from "../Controllers/givingBackController.js";
const givingbackRouter= express.Router();

givingbackRouter.post("/visit",email_notification)

export default givingbackRouter;