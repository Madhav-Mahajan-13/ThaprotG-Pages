import express, { Router } from "express";
import { getImages } from "../Controllers/galleryController.js";

const galleryRouter=express.Router();

galleryRouter.post("/",getImages);
// galleryRouter.post("/search", searchImages )


export default galleryRouter;