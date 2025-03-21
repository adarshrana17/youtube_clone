import userModel from "../Module/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const cookiesOption = {
  httpOnly: true,
  secure: false,
  sameSite: "Lax",
};

export function registerUser(req, res) {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "Request body is empty" });
    }

    const { fullName, email, password, dateOfBirth, mobile } = req.body;
    if (!fullName || !email || !password || !dateOfBirth || !mobile) {
      return res.status(400).json({ message: "All fields are required" });
    }

    userModel.findOne({ email }).then(async (existingUser) => {
      if (existingUser) {
        return res.status(403).json({ message: "User already exists" });
      }

      const newUser = new userModel({
        fullName,
        email,
        password: bcrypt.hashSync(password, 10),
        dateOfBirth: new Date(dateOfBirth),
        mobile,
        profileImage: req.file ? req.file.filename : null,
      });

      await newUser.save();
      return res.status(201).json({ message: "User registered successfully" });
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, "ZXCVBNMasdfghjklQWERTYUIOP1234567890", {
      expiresIn: "1h",
    });

    res.cookie("token", token, cookiesOption);

    res.json({
      token,
      user: {
        _id: user._id,
        email: user.email,
        fullName: user.fullName,
        profileImage: user.profileImage,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export async function loggedinUser(req, res) {
  try {
    if (!req.cookies || !req.cookies.token) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    const token = req.cookies.token;
    const decoded = jwt.verify(token, "ZXCVBNMasdfghjklQWERTYUIOP1234567890");
    const user = await userModel.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export function logOut(req, res) {
  res.clearCookie("token", cookiesOption).json({ message: "Logged Out Successfully" });
}



