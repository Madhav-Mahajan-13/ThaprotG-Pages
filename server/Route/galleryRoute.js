import express, { Router } from "express";
import { getImages, searchImages } from "../Controllers/galleryController.js";

const galleryRouter=express.Router();

galleryRouter.get("/",getImages);
galleryRouter.post("/search", searchImages )


export default galleryRouter;