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
import studentProjectRouter from "./Route/studentProjectRoute.js";
import objectRouter from "./Route/objectRoute.js";
// const {createServer} = require('http');
import {createServer} from "http"
import socketSetup from "./socket.js";
import givingbackRouter from "./Route/givingbackRoute.js";
import alumCardRouter from "./Route/alumCardRoute.js";

dotenv.config();

const port = 5000;


const app = express();
app.use(express.json());

const server = createServer(app);
socketSetup(server);


const allowedOrigins = [
    "http://localhost:3000",        // Local client
    "http://localhost:5173",        // Local Vite (admin)
    "http://thaprotg.thapar.edu",   // Deployed client
    "https://thaprotg.thapar.edu",
    "http://adminthaprotg.thapar.edu", // Deployed admin
    "https://adminthaprotg.thapar.edu"
  ];
  

// CORS Configuration
const corsOptions = {
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true // Allow cookies to be sent
};

app.use(cors(corsOptions));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/alumprojects",alumProjectRouter);
app.use("/api/studentprojects",studentProjectRouter);
app.use("/api/gallery",galleryRouter);
app.use("/api/givingback",givingbackRouter)

app.use("/api/user",userRouter);
app.use("/api/projects",userProjectRouter);

// app.use("/api/auth",router);
app.use("/api/auth",loginSignupRoute);

app.use("/api/admin",adminRouter);
app.use("/api/object",objectRouter);

app.use("/api/alumcard",alumCardRouter);

app.use("/uploads", express.static("uploads"));

server.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
