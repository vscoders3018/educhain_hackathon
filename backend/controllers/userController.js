import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import { v2 as cloudinary } from "cloudinary";
import reportModel from "../models/reportModel.js";

// API to register user
const registerUser = async (req, res) => {
  try {
    const { walletaddress } = req.body;

    // Check if wallet address is provided
    if (!walletaddress) {
      return ;
    }

    const alreadyuser = await userModel.findOne({ address: walletaddress });

    if (alreadyuser) {
      return res.json({ success: false, message: "User already Exist !" });
    }

    // Use wallet address as the seed for the image generation
    const generatedImage = `https://api.dicebear.com/9.x/pixel-art/svg?seed=${walletaddress}`;

    // Prepare user data
    const userData = {
      address: walletaddress,
      image: generatedImage, // Generated based on wallet address
    };

    // Save user to the database
    const newUser = new userModel(userData);
    const user = await newUser.save();

    // Generate a JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    // Respond with user details and token
    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        address: user.address,
        image: user.image,
      },
    });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};


// API to login user
const loginUser = async (req, res) => {
  try {
    const { walletaddress } = req.body;
    if (!walletaddress) {
    return;
    }
    const user = await userModel.findOne({ address: walletaddress });
    
    if (!user) {
      return res.json({ success: false, message: "User does not exist" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ 
      success: true, 
      token, 
      isApproved: user.isApproved 
    });
  } catch (error) {
    ;
    res.json({ success: false, message: error.message });
  }
};


// API to get user profile data
const getProfile = async (req, res) => {
  try {
    const { userId } = req.body;
    const userData = await userModel.findById(userId).select("-password");

    res.json({ success: true, userData });
  } catch (error) {
    ;
    res.json({ success: false, message: error.message });
  }
};

// API to update user profile
const updateProfile = async (req, res) => {
  try {
    const { gender , dob , bloodGroup , medicalCondition , userId} = req.body;
    const imageFile = req.fil

    if (!gender || !dob || !bloodGroup || !medicalCondition) {
      return res.json({ success: false, message: "Data Missing" });
    }

    await userModel.findByIdAndUpdate(userId, {
      gender,
      dob,
      bloodGroup,
      medicalCondition,
      isApproved:true
    });

    if (imageFile) {
      // upload image to cloudinary
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });
      const imageURL = imageUpload.secure_url;

      // await userModel.findByIdAndUpdate(userId, { image: imageURL });
      
    }

    res.json({ success: true, message: "Profile Updated" });
  } catch (error) {
    ;
    res.json({ success: false, message: error.message });
  }
};

const getreports = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.body.userId);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }
    const reports = await reportModel.find({address: user.address});
    res.json({ reports });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching reports" });
  
  }
}

export {
  loginUser,
  registerUser,
  getProfile,
  updateProfile,
  getreports
};
