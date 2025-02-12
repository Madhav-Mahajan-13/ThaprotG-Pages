import express from "express";
import { showCarousel, showEvent } from "../Controllers/objectController.js";

const objectRouter = express.Router();


objectRouter.get("/getCarousel",showCarousel);
objectRouter.get("/getEvent",showEvent);

export default objectRouter;