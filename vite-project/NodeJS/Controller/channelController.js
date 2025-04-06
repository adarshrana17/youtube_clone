import { Channel } from "../Module/channelModel.js";
import multer from "multer";
import mongoose from "mongoose";

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Store images in uploads folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// Create Channel
export const createChannel = async (req, res) => {
  try {
    const { channelName, description } = req.body;
    const channelImage = req.file ? `/uploads/${req.file.filename}` : "";

    if (!channelName || !description) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const newChannel = new Channel({
      channelName,
      description,
      channelImage,
      user: req.user.id,
    });

    await newChannel.save();
    res
      .status(201)
      .json({ message: "Channel created successfully!", channel: newChannel });
  } catch (error) {
    res.status(500).json({ message: "Error creating channel", error });
  }
};

export const getUserChannel = async (req, res) => {
  try {
    const { userId } = req.params;

    // Validate the ID format
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID format" });
    }

    // Convert to ObjectId and query by correct field `user`
    const channel = await Channel.findOne({
      user: new mongoose.Types.ObjectId(userId),
    });

    // if (!channel) {
    //   return res
    //     .status(404)
    //     .json({ message: "Channel not found for this user" });
    // }
    if (!channel) {
      // Return 200 with null (not an error)
      return res.status(200).json({ channel });
    }
    res.status(200).json(channel);
  } catch (error) {
    console.error("Error fetching user channel:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// export const getUserChannel = async (req, res) => {
//   try {
//     const userId = req.user._id; // take it from decoded token

//     if (!mongoose.Types.ObjectId.isValid(userId)) {
//       return res.status(400).json({ message: "Invalid user ID format" });
//     }

//     const channel = await Channel.findOne({ user: userId });

//     if (!channel) {
//       return res
//         .status(404)
//         .json({ message: "Channel not found for this user" });
//     }

//     res.status(200).json(channel);
//   } catch (error) {
//     console.error("Error fetching user channel:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };
