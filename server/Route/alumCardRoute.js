import express from "express";
import { createCard } from "../Controllers/alumCardController.js";

const alumCardRouter =express.Router();

alumCardRouter.post("/create",createCard);


export default alumCardRouter;