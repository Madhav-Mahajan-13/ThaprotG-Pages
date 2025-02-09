import express from "express";
import cors from "cors";
import cookieParser from 'cookie-parser';
import dotenv from "dotenv";
import alumProjectRouter from "./Route/alumProjectRoute.js";
import galleryRouter from "./Route/galleryRoute.js";
import { userRouter } from "./Route/userRoute.js";
// import router from "./Route/uservalidationRoute.js";
import userProjectRouter from "./Route/userProjectRoute.js";
import loginSignupRoute from './Route/loginSignupRoute.js'
import adminRouter from "./Route/adminRoute.js";

dotenv.config();

const port = 5000;


const app = express();
app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000", // Allow your frontend domain
    credentials: true, // Required for cookies
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/alumprojects",alumProjectRouter);

app.use("/api/gallery",galleryRouter);

app.use("/api/user",userRouter);
app.use("/api/projects",userProjectRouter);

// app.use("/api/auth",router);
app.use("/api/auth",loginSignupRoute);

app.use("/api/admin",adminRouter);

app.use("/uploads", express.static("uploads"));

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
