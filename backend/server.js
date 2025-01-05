import express from "express";
import cors from 'cors';
import 'dotenv/config';
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import companyRouter from "./routes/companyRoute.js";
import adminRouter from "./routes/adminRoute.js";

// app config
const app = express();

const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

// middlewares
app.use(express.json());

app.use(cors({
  origin: ['http://localhost:5174',"http://localhost:5173","https://educhain-user.vercel.app","https://educhain-company.vercel.app"],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// api endpoints
app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);
app.use("/api/company", companyRouter);


// root endpoint
app.get("/", (req, res) => {
  res.send("API Working");
});

app.listen(port, () => console.log(`Server started on PORT:${port}`));
