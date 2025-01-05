import express from 'express';
import { loginCompany,companyDashboard, companyProfile, updateCompanyProfile , registerCompany,verifyCompany} from '../controllers/companyController.js';
import authCompany from '../middleware/authCompany.js';
const companyRouter = express.Router();

companyRouter.post("/login", loginCompany)
companyRouter.post("/signup", registerCompany)
companyRouter.get("/dashboard", authCompany, companyDashboard)
companyRouter.get("/profile", authCompany, companyProfile)
companyRouter.get("/profile", authCompany, companyProfile)
companyRouter.post("/update-profile", authCompany, updateCompanyProfile)


export default companyRouter;