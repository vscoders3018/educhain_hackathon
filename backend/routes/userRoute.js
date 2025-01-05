import express from 'express';
import { loginUser, registerUser, getProfile, updateProfile , getreports} from '../controllers/userController.js';
import analysisreport from "../controllers/reportanalysis.js";
import upload from '../middleware/multer.js';
import authUser from '../middleware/authUser.js';
const userRouter = express.Router();

userRouter.post("/register", registerUser)
userRouter.post("/login", loginUser)

userRouter.get("/get-profile", authUser, getProfile)
userRouter.post("/update-profile", upload.single('image'), authUser, updateProfile)

userRouter.post("/analysis-report", upload.single('file'), authUser, analysisreport)
userRouter.get("/reports", authUser, getreports)

export default userRouter;