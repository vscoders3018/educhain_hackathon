import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import companyModel from "../models/companyModel.js";

const registerCompany = async (req, res) => {
  try {
    const { name , email , password  } = req.body;

    // Check if wallet address is provided
    if (!name || !email || !password ) {
      return res.json({ success: false, message: "Missing Details" });
    }

    // Use wallet address as the seed for the image generation
    const image = `https://api.dicebear.com/9.x/pixel-art/svg?seed=${email}`;

    // Prepare user data
    const userData = {
      name:name,
      email:email,
      password: password,
      image: image,
    };

    // Save user to the database
    const newCompany = new companyModel(userData);
    const company = await newCompany.save();

    // Generate a JWT token
    const token = jwt.sign({ id: company._id }, process.env.JWT_SECRET);

    // Respond with user details and token
    res.json({
      success: true,
      token,
      user: {
        id: company._id,
        address: company.address,
        image: company.image,
      },
    });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// API for company Login
const loginCompany = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body)
    const user = await companyModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "Invalid credentials" });
    }


      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.json({ success: true, token });

  } catch (error) {
    ;
    res.json({ success: false, message: error.message });
  }
};

// API to get all companys list for Frontend
const companyList = async (req, res) => {
  try {
    const compenies = await companyModel.find({}).select(["-password", "-email"]);
    res.json({ success: true, compenies });
  } catch (error) {
    ;
    res.json({ success: false, message: error.message });
  }
};

// API to get company profile for  company Panel
const companyProfile = async (req, res) => {
  try {
    const { docId } = req.body;
    const profileData = await companyModel.findById(docId).select("-password");

    res.json({ success: true, profileData });
  } catch (error) {
    ;
    res.json({ success: false, message: error.message });
  }
};

// API to update company profile data from  company Panel
const updateCompanyProfile = async (req, res) => {
  try {
    const { docId, fees, address, available } = req.body;

    await companyModel.findByIdAndUpdate(docId, { fees, address, available });

    res.json({ success: true, message: "Profile Updated" });
  } catch (error) {
    ;
    res.json({ success: false, message: error.message });
  }
};

// API to get dashboard data for company panel
const companyDashboard = async (req, res) => {
  try {
    const { docId } = req.body;

    const appointments = await appointmentModel.find({ docId });

    let earnings = 0;

    appointments.map((item) => {
      if (item.isCompleted || item.payment) {
        earnings += item.amount;
      }
    });

    let patients = [];

    appointments.map((item) => {
      if (!patients.includes(item.userId)) {
        patients.push(item.userId);
      }
    });

    const dashData = {
      earnings,
      appointments: appointments.length,
      patients: patients.length,
      latestAppointments: appointments.reverse(),
    };

    res.json({ success: true, dashData });
  } catch (error) {
    ;
    res.json({ success: false, message: error.message });
  }
};

// Verify a company
const verifyCompany = async (req, res) => {
  try {
    const { id } = req.params;

    const company = await companyModel.findById(id);
    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found. Please verify.",
      });
    }

    company.isverified = true;
    await company.save();

    res.status(200).json({
      success: true,
      message: `Company "${company.name}" verified successfully.`,
      company,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error occurred during verification.",
      error: error.message,
    });
  }
};

export {
  registerCompany,
  loginCompany,
  companyList,
  companyDashboard,
  companyProfile,
  updateCompanyProfile,
  verifyCompany
};
