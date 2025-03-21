// import express from "express";
// import mongoose from "mongoose";
// import { userRoutes } from "./Routes/userRoutes.js";
// import cors from "cors";
// import { channelRoutes } from "./Routes/channelRoutes.js";
// import { authUserRoutes } from "./Routes/authUserRoutes.js";
// import multer from "multer";
// import { registerUser } from "./Controller/userController.js";
// import cookieParser from "cookie-parser";

// const app = express();
//  mongoose.connect("mongodb://localhost:27017/youtube");


// app.use(express.json());
// app.use(cookieParser()); 
// app.use(cors({
//     origin: "http://localhost:5173", // Allow frontend access
//     credentials: true,
//   }));
//   app.use(express.urlencoded({ extended: true }));
//   app.use("/uploads", express.static("uploads"));

// userRoutes(app);
// channelRoutes(app);
// authUserRoutes(app);
// const upload = multer({ dest: "uploads/" }); // Save images in 'uploads' folder
// app.post("/register", upload.single("profileImage"), registerUser);

// app.get("/",(req,res)=> {
//     res.send({message:"Hii we have started our youtube backend"})
// })
// app.listen(5100,()=>{
//     console.log("Server is running in port 5100");
// })



import express from "express";
import mongoose from "mongoose";
import { userRoutes } from "./Routes/userRoutes.js";
import cors from "cors";
import { channelRoutes } from "./Routes/channelRoutes.js";
import { authUserRoutes } from "./Routes/authUserRoutes.js";
import multer from "multer";
import { registerUser } from "./Controller/userController.js";
import cookieParser from "cookie-parser";
import path from "path"; // ✅ Import path module

const app = express();
mongoose.connect("mongodb://localhost:27017/youtube");

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173", // Allow frontend access
    credentials: true,
}));

app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads")); // Serve uploaded files

// ✅ Proper Multer Setup
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Save images in "uploads" folder
    },
    filename: (req, file, cb) => {
        // ✅ Save with original extension and unique name
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    },
});

const upload = multer({ storage });

// ✅ Register User Route with Multer Middleware
app.post("/register", upload.single("profileImage"), registerUser);

// ✅ Register Other Routes
userRoutes(app);
channelRoutes(app);
authUserRoutes(app);

app.get("/", (req, res) => {
    res.send({ message: "Hii we have started our YouTube backend" });
});

app.listen(5100, () => {
    console.log("Server is running on port 5100");
});
