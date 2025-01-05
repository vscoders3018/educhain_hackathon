import mongoose from "mongoose";

const ReportSchema = new mongoose.Schema({
    imageLink: {
        type: String,
        required: true, 
    },
    userReference: {
        type: String,
    },
    address: {
        type: String,
    },
    testType: {
        type: String,
    },
    customData: {
        type: String, // Store JSON as a string
        required: true,
      },
      
}, {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
});


const reportModel = mongoose.models.Report || mongoose.model("Report", ReportSchema);
export default reportModel;
