import userModel from "../models/user.models.js";

// CREATE USER
export const createUserRequest = async (req, res) => {
  try {
    const { name, email, mobile, info } = req.body;

    if (!name || !email || !mobile) {
      return res.status(400).json({
        error: "All fields are required (name, email, mobile, info).",
      });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        error: "Email is already registered. Please use a different email.",
      });
    }

    const newUser = new userModel({
      name,
      email,
      mobile,
      info,
    });

    const savedUser = await newUser.save();

    return res.status(201).json({
      message: "User created successfully.",
      user: savedUser,
    });
  } catch (err) {
    console.error("Error creating user:", err);
    return res.status(500).json({
      error: "An error occurred while creating the user.",
      message: err.message,
    });
  }
};
