import React, { useContext, useState } from "react";
import { Doughnut, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from '../context/AppContext';

// Register components with ChartJS
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const PatientDash = ({
  name = "John Doe",
  age = 29,
  gender = "Female",
  bloodGroup = "A+",
  reportsUploaded = 30, // Example number of reports uploaded
  totalReports = 50, // Example total number of reports
  totalCoins = 500,
  coinsRedeemed = 200,
  availableRewards = [
    {
      title: "Free Annual Wellness Checkup",
      coinsRequired: 100,
      description: "Get a comprehensive annual checkup.",
    },
    {
      title: "Discount on Prescription Glasses",
      coinsRequired: 150,
      description: "20% off on glasses.",
    },
    {
      title: "Free Flu Vaccination",
      coinsRequired: 75,
      description: "Protect yourself with a free flu shot.",
    },
  ],
  sellRecordPrice = 200,
}) => {
  const [coinsLeft, setCoinsLeft] = useState(totalCoins - coinsRedeemed);
  const { userData } = useContext(AppContext);

  // Health Stats (Blood Pressure and Blood Sugar)
  const healthStatsData = {
    labels: ["Blood Pressure", "Blood Sugar"],
    datasets: [
      {
        data: [120, 90], // Example values
        backgroundColor: ["#2F855A", "#3182CE"],
        borderColor: ["#2F855A", "#3182CE"],
        borderWidth: 1,
      },
    ],
  };

  // Reports Uploaded - Stacked Bar Chart Data
  const reportUploadsData = {
    labels: ["Reports"],
    datasets: [
      {
        label: "Uploaded",
        data: [reportsUploaded],
        backgroundColor: "#4C51BF",
      },
      {
        label: "Pending",
        data: [totalReports - reportsUploaded],
        backgroundColor: "#E53E3E",
      },
    ],
  };

  // Rewards Section
  const handleRedeemReward = (reward) => {
    if (coinsLeft >= reward.coinsRequired) {
      setCoinsLeft(coinsLeft - reward.coinsRequired);
    }
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Patient Dashboard" },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  return (
    <div className="bg-gray-50 min-h-screen px-8 pt-2 py-3 w-full">
      <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">
        User Dashboard
      </h1>

      {/* Patient Profile Section */}
      <div className="bg-white shadow-lg rounded-2xl p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          User Profile
        </h2>
        <div className="flex justify-between items-center">
          <div className="text-lg text-gray-600">
          <p>
              <strong>Anonymous User</strong>
            </p>
            <p>
              <strong>DOB:</strong> {userData.dob}
            </p>
            <p>
              <strong>Gender:</strong> {userData.gender}
            </p>
            <p>
              <strong>Blood Group:</strong> {userData.bloodGroup}
            </p>
          </div>
          <div className="bg-blue-500 rounded-full w-24 h-24 flex items-center justify-center text-white text-2xl font-semibold">
            {name.charAt(0)}
          </div>
        </div>
      </div>

      {/* Coin Management and Report Upload */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white shadow-lg rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Medical Report
          </h2>
          <p className="text-lg text-gray-700 mb-4">
            Reports Uploaded: {reportsUploaded}
          </p>
          <NavLink
            to="/report"
            onClick={() => setShowMenu(false)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-200 inline-block"
          >
            Upload New Report
          </NavLink>
        </div>

        <div className="bg-white shadow-lg rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Coin Management
          </h2>
          <p className="text-lg text-gray-700 mb-4">
            Total Coins: {totalCoins}
          </p>
          <p className="text-lg text-gray-700 mb-4">
            Coins Redeemed: {coinsRedeemed}
          </p>
          <p className="text-lg text-gray-700 mb-4">Coins Left: {coinsLeft}</p>
        </div>
      </div>

      {/* Rewards Section */}
      <div className="bg-white shadow-lg rounded-2xl p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          Available Rewards
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {availableRewards.map((reward, index) => (
            <div
              key={index}
              className="bg-gradient-to-r from-purple-500 via-indigo-600 to-blue-500 text-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <h3 className="text-lg font-semibold mb-2">{reward.title}</h3>
              <p className="text-sm">{reward.description}</p>
              <p className="font-semibold mt-2">
                Coins Required: {reward.coinsRequired}
              </p>
              <button
                onClick={() => handleRedeemReward(reward)}
                className="bg-white text-blue-600 hover:bg-gray-200 mt-4 py-2 px-6 rounded-lg"
              >
                Redeem
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Health Stats - Blood Pressure and Blood Sugar */}
        <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center justify-center">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Health Stats
          </h3>
          <div>
            <Doughnut data={healthStatsData} options={options} />
          </div>
          <div className="mt-4 text-gray-600">
            <p>
              <strong>Blood Pressure:</strong> 120/80 mmHg
            </p>
            <p>
              <strong>Blood Sugar:</strong> 90 mg/dL
            </p>
          </div>
        </div>

        {/* Reports Uploaded - Stacked Bar Chart */}
        <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center justify-center">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Reports Uploaded
          </h3>
          <Bar data={reportUploadsData} options={options} />
          <div className="mt-4 text-gray-600">
            <p>
              <strong>Total Reports Uploaded:</strong> {reportsUploaded}
            </p>
            <p>
              <strong>Total Reports Pending:</strong>{" "}
              {totalReports - reportsUploaded}
            </p>
            <p>
              <strong>Total Reports:</strong> {totalReports}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDash;
