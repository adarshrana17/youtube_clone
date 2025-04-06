import express from "express";
import { createChannel } from "../Controller/channelController.js";
import { getUserChannel } from "../Controller/channelController.js";
import { verifyToken } from "../middlewares/verifytoken.js";
import multer from "multer";

const router = express.Router();
const upload = multer({ dest: "uploads/" }); // Store images in 'uploads' folder

router.post(
  "/create-channel",
  verifyToken,
  upload.single("channelImage"),
  createChannel
);
router.get("/user-channel/:userId", verifyToken, getUserChannel);

export function channelRoutes(app) {
  app.use(router);
}
