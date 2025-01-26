import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import alumProjectRouter from "./Route/alumProjectRoute.js";
import galleryRouter from "./Route/galleryRoute.js";
import { userRouter } from "./Route/userRoute.js";
import router from "./Route/uservalidationRoute.js";
import postProjectRouter from "./Route/postProjectRoute.js";
// import loginSignupRoute from './Route/loginSignupRoute.js'


dotenv.config();



const port = 5000;


const app = express();
app.use(express.json());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/alumprojects",alumProjectRouter);

app.use("/api/gallery",galleryRouter);

app.use("/api/user",userRouter);
app.use("/api/projects",postProjectRouter);


app.use("/api/auth",router);
// app.use("/api/auth",loginSignupRoute);


app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
