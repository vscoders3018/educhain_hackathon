import express from 'express';
import { loginAdmin,adminDashboard,allCompanies } from '../controllers/adminController.js';
import authAdmin from '../middleware/authAdmin.js';
const adminRouter = express.Router();

adminRouter.post("/login", loginAdmin)
adminRouter.get("/all-companies",allCompanies)
adminRouter.get("/dashboard", authAdmin, adminDashboard)

export default adminRouter;
