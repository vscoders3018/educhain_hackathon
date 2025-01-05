import jwt from "jsonwebtoken";
import companyModel from "../models/companyModel.js";
import bcrypt from "bcrypt";
import validator from "validator";
import { v2 as cloudinary } from "cloudinary";
import userModel from "../models/userModel.js";

// API for admin login
const loginAdmin = async (req, res) => {
    try {

        const { number, password } = req.body

        if (number === process.env.ADMIN_NUMBER && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(number + password, process.env.JWT_SECRET)
            res.json({ success: true, token })
        } else {
            res.json({ success: false, message: "Invalid credentials" })
        }

    } catch (error) {
        
        res.json({ success: false, message: error.message })
    }

}

// API for adding company
const addCompany = async (req, res) => {

    try {

        const { name, email,number, password, speciality, degree, experience, about, fees, address, rating,location } = req.body
        const imageFile = req.file

        // checking for all data to add company
        if (!name || !email || !number || !password || !speciality || !degree || !experience || !about || !fees || !address || !rating || !location) {
            return res.json({ success: false, message: "Missing Details" })
        }

        // validating email format
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" })
        }

        // validating number format 
        if (!validator.isMobilePhone(number, 'any')) { 
            return res.json({ success: false, message: "Please enter a valid mobile number" });
        }

        // validating strong password
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" })
        }

        // hashing user password
        const salt = await bcrypt.genSalt(10); // the more no. round the more time it will take
        const hashedPassword = await bcrypt.hash(password, salt)

        // upload image to cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" })
        const imageUrl = imageUpload.secure_url

        const companyData = {
            name,
            email,
            number,
            image: imageUrl,
            password: hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            address: JSON.parse(address),
            rating,
            location,
            date: Date.now()
        }

        const newCompany = new companyModel(companyData)
        await newCompany.save()
        res.json({ success: true, message: 'Company Added' })

    } catch (error) {
        
        res.json({ success: false, message: error.message })
    }
}

const allCompanies = async (req, res) => {
    try {

        const compenies = await companyModel.find({}).select('-password')
        res.json({ success: true, compenies })

    } catch (error) {
        
        res.json({ success: false, message: error.message })
    }
}

const adminDashboard = async (req, res) => {
    try {

        const compenies = await companyModel.find({})
        const users = await userModel.find({})
        const appointments = await appointmentModel.find({})

        const dashData = {
            compenies: compenies.length,
            appointments: appointments.length,
            patients: users.length,
            latestAppointments: appointments.reverse()
        }

        res.json({ success: true, dashData })

    } catch (error) {
        
        res.json({ success: false, message: error.message })
    }
}

export {
    loginAdmin,
    addCompany,
    allCompanies,
    adminDashboard
}