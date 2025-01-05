import React, { useState, useContext, useRef } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { Stage, Layer, Image, Rect } from "react-konva";

function Report() {
  const { id } = useParams();
  const { backendUrl, token , userData } = useContext(AppContext);
  const [uploadedFile, setUploadedFile] = useState(null); // Original uploaded file
  const [editedImage, setEditedImage] = useState(null); // Edited image
  const [image, setImage] = useState(null); // Image for editing (preview)
  const [blurAreas, setBlurAreas] = useState([]); // Areas to blur
  const [isDrawing, setIsDrawing] = useState(false); // Drawing state
  const [isLoading, setIsLoading] = useState(false); // Processing state
  const [analyzed, setAnalyzed] = useState(false); // Analysis state
  const [results, setResults] = useState({}); // Analysis results

  const [testType, setTestType] = useState("MRI"); // Selected test type
  const testTypes = [
    "MRI",
    "X-Ray",
    "Blood Test",
    "CT Scan",
    "Ultrasound",
    "ECG",
  ]; // Test types

  const stageRef = useRef();

  // Step 1: Handle File Upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        const img = new window.Image();
        img.src = reader.result;
        img.onload = () => setImage(img);
      };
      reader.readAsDataURL(file);
    }
  };

  // Step 2: Drawing Blur Areas
  const handleMouseDown = (e) => {
    setIsDrawing(true);
    const pos = e.target.getStage().getPointerPosition();
    setBlurAreas((prev) => [
      ...prev,
      { x: pos.x, y: pos.y, width: 0, height: 0 },
    ]);
  };

  const handleMouseMove = (e) => {
    if (!isDrawing) return;

    const stage = e.target.getStage();
    const pos = stage.getPointerPosition();
    setBlurAreas((prev) =>
      prev.map((rect, index) => {
        if (index === prev.length - 1) {
          return {
            ...rect,
            width: pos.x - rect.x,
            height: pos.y - rect.y,
          };
        }
        return rect;
      })
    );
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  // Step 3: Save Edited Image
  const handleSaveEditedImage = () => {
    const stage = stageRef.current;
    const dataURL = stage.toDataURL({ pixelRatio: 2 });
    setEditedImage(dataURL);
    toast.success("Report updated successfully!");
  };

  // Step 4: Process and Analyze Saved Image
  const handleAnalyzeImage = async () => {
    if (!editedImage) {
      toast.error("Please save the edited image first!");
      return;
    }

    setIsLoading(true);
    setAnalyzed(false);

    try {
      const blob = await fetch(editedImage).then((res) => res.blob());
      const formData = new FormData();
      formData.append("file", blob, "edited-image.png");
      formData.append("testType", testType); // Include selected test type
      formData.append("address", userData.address); // Include selected test type

      const response = await axios.post(
        `${backendUrl}/api/user/analysis-report`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            token,
          },
        }
      );

      setResults(response.data);
      console.log(response.data.report);
      setAnalyzed(true);
      toast.success("Report Uploaded successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to analyze the image.");
    }

    setIsLoading(false);
  };

  return (
    <div className=" flex flex-col items-center justify-start bg-gradient-to-r from-slate-50 to-slate-100 text-gray-900 px-4 md:px-8 lg:px-16 py-10">
      <h2 className="text-4xl font-bold text-black mb-4">
        Upload Medical Report
      </h2>

      <div className="w-full max-w-4xl bg-white shadow-2xl rounded-2xl overflow-hidden border border-slate-200">
        {/* Step 1: File Upload */}
        {!image && (
          <section className="p-8">
            <form className="space-y-6 bg-slate-50 p-8 rounded-xl border border-slate-200">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Test Type
                </label>
                <select
                  value={testType}
                  onChange={(e) => setTestType(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 ease-in-out"
                >
                  {testTypes.map((type) => (
                    <option key={type} value={type} className="py-2">
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div className="relative border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:bg-slate-100 transition duration-300">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="absolute inset-0 w-full opacity-0 cursor-pointer"
                />
                <div className="flex flex-col items-center justify-center space-y-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 text-slate-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <p className="text-slate-600">
                    Drag and drop or click to upload image
                  </p>
                </div>
              </div>
            </form>
          </section>
        )}

        {/* Step 2: Edit Image */}
        {image && !analyzed && (
  <div className="w-full bg-white shadow-lg rounded-lg flex flex-col items-center">
    <div>
      <h2 className="text-2xl font-semibold text-blue-700 mt-10 mb-2 text-center">
        Click and highlight to hide personal data
      </h2>
      <div className="relative">
        <Stage
          width={800}
          height={image ? Math.min(image.height * (800 / image.width), 1000) : 1000}
          ref={stageRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          style={{ cursor: "crosshair", border: "1px solid #ccc" }}
        >
          <Layer>
            <Image 
              image={image} 
              width={800}
              height={image ? image.height * (800 / image.width) : 1000}
            />
            {blurAreas.map((rect, i) => (
              <Rect
                key={i}
                x={rect.x}
                y={rect.y}
                width={rect.width}
                height={rect.height}
                fill="rgba(255, 255, 255, 1)"
                listening={false}
              />
            ))}
          </Layer>
        </Stage>
      </div>
    </div>

    {!editedImage ? (
      <button
        className="m-8 px-4 py-2 bg-blue-700 text-white rounded-lg shadow-lg"
        onClick={handleSaveEditedImage}
      >
        Save Edited Image
      </button>
    ) : (
      <button
        className={`mt-8 px-4 py-2 bg-green-600 text-white rounded-lg shadow-lg ${
          isLoading ? "cursor-not-allowed opacity-50" : ""
        }`}
        onClick={handleAnalyzeImage}
        disabled={isLoading}
      >
        {isLoading ? "Uploading..." : "Click to Upload Report"}
      </button>
    )}
  </div>
)}

        {/* Step 4: Display Results */}
        {analyzed && (
          <section className="p-8">
            <h2 className="text-3xl font-bold text-slate-800 mb-6 text-center">
              Analysis Results
            </h2>
            <div className="overflow-x-auto bg-white shadow rounded-lg">
              <table className="min-w-full border-collapse border border-slate-200">
                <tbody>
                  {Object.entries(results).map(([key, value]) => (
                    <tr
                      key={key}
                      className="odd:bg-slate-50 even:bg-white hover:bg-blue-50 transition duration-200"
                    >
                      {/* <td className="px-4 py-2 border border-slate-300 font-semibold text-slate-800">
                {key}
              </td> */}
                      <td className="px-4 py-2 border border-slate-300 text-slate-700">
                        {typeof value === "object" && value !== null ? (
                          <div className="overflow-x-auto">
                            <table className="min-w-full border-collapse border border-slate-300">
                              <thead>
                                <tr className="bg-slate-200">
                                  <th className="px-4 py-2 border border-slate-300 text-left">
                                    Key
                                  </th>
                                  <th className="px-4 py-2 border border-slate-300 text-left">
                                    Value
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {Object.entries(value).map(
                                  ([nestedKey, nestedValue]) => (
                                    <tr
                                      key={nestedKey}
                                      className="odd:bg-slate-100 even:bg-white hover:bg-blue-50 transition duration-200"
                                    >
                                      <td className="px-4 py-2 border border-slate-300 font-medium text-slate-800">
                                        {nestedKey}
                                      </td>
                                      <td className="px-4 py-2 border border-slate-300 text-slate-700">
                                        {nestedValue}
                                      </td>
                                    </tr>
                                  )
                                )}
                              </tbody>
                            </table>
                          </div>
                        ) : (
                          value
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export default Report;
