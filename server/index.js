import express from "express";
import cors from "cors";
import pg from "pg";
import dotenv from "dotenv";
import alumProjectRouter from "./Route/alumProjectRoute.js";
import galleryRouter from "./Route/galleryRoute.js";


dotenv.config();

const port = process.env.PORT || 5000;


const app = express();
app.use(express.json());
app.use(cors());


app.use("/api/alumprojects",alumProjectRouter);

app.use("/api/gallery",galleryRouter)


app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
