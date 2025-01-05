import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import userModel from "../models/userModel.js";
import reportModel from "../models/reportModel.js";
import connectCloudinary from "../config/cloudinary.js"
import { v2 as cloudinary } from "cloudinary";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

connectCloudinary();

// Function to extract JSON from markdown-formatted string
function extractJSONFromMarkdown(text) {
  const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/);
  if (jsonMatch && jsonMatch[1]) {
    try {
      return JSON.parse(jsonMatch[1]);
    } catch (error) {
      return null;
    }
  }
  return null;
}

const addCustomField = async (req, res) => {
  const { key } = req.body;
  const field = key.key;
  const value = key.value;
  const patientId = req.params.id;
  const patient = await userModel.findById(patientId);
  
  if (!patient) {
    return res.status(404).json({ message: "Patient not found" });
  }

  // Check if custom_data field exists; if not, initialize it
  if (!patient.custom_data) {
    patient.custom_data = {}; // Initialize custom_data as an empty object
    await patient.save();
  }

  try {
    const data = await userModel.updateOne(
      { _id: patientId },
      { $set: { [`custom_data.${field}`]: value } }
    );

    if (data.acknowledged && data.modifiedCount > 0) {
      res.status(200).json({ message: "Custom field added successfully" });
    } else {
      res.status(404).json({ message: "No patient found or no modification done" });
    }
  } catch (error) {
    res.status(500).json({ 
      message: "Error in adding new field", 
      error: error.message 
    });
  }
};

const processParsedResults = (parsedResults) => {
  let formattedResults = {};

  // Loop through each key-value pair in the parsed results
  for (const [key, value] of Object.entries(parsedResults)) {
    // Convert each value to a string, regardless of its type
    formattedResults[key] = String(value);
  }

  return formattedResults;
};

const analysisreport = async (req, res) => {
  // Check if file is present in the request
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const filePath = req.file.path;

  try {
    // Upload image to Cloudinary
    const uploadedImage = await cloudinary.uploader.upload(filePath, {
      folder: "analysis_reports", // Optional: Organize images into folders on Cloudinary
    });

    const cloudinaryUrl = uploadedImage.secure_url; // The URL of the uploaded image

    // Prepare the prompt with existing data
    let prompt = `
      Scan all the data given in the photo. Make a key-value pair for it.
      Make sure do not add personal info like name , email , phone number , address so that no one can find patients based on this data. 
      If a value has a unit (e.g., mg/dL, bpm), include the unit in the value string.
      Return the important data as a flat JSON object with key-value pairs (no nested objects).
    `;

    // Initialize the Gemini model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Read the file buffer
    const fileBuffer = fs.readFileSync(filePath);

    // Prepare the image part
    const imagePart = {
      inlineData: {
        data: fileBuffer.toString("base64"),
        mimeType: req.file.mimetype,
      },
    };

    // Generate content with the AI model
    const result = await model.generateContent([prompt, imagePart]);
    const text = result.response.text();

    // Extract and parse JSON from the response
    const parsedResults = extractJSONFromMarkdown(text);

    if (parsedResults) {
      // Process the parsed results to ensure proper key-value formatting
      const formattedResults = processParsedResults(parsedResults);


      // Save the results in the reports schema
      const newReport = new reportModel({
        imageLink: cloudinaryUrl, // Save the Cloudinary URL
        customData: JSON.stringify(formattedResults), // Save as a JSON string
        testType:req.body.testType ,
        address:req.body.address
      });
      await newReport.save();

      res.status(200).json({
        report: formattedResults,
      });
    } else {
      res.status(500).json({ message: "Failed to parse the API response" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error processing file",
      error: error.message,
    });
  } finally {
    // Clean up: delete the uploaded file
    try {
      fs.unlinkSync(filePath);
    } catch (unlinkError) {
      console.error("Error deleting uploaded file:", unlinkError);
    }
  }
};

export { addCustomField };
export default analysisreport;

