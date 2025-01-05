import React, { useState } from 'react';
import { Doughnut, Bar, Pie, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, PointElement, LineElement, Tooltip, Legend } from 'chart.js';

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

const ReportsDash = ({
  males = 60,
  females = 40,
  reportCount = 150,
  bloodGroups = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'],
  bloodGroupCounts = [35, 20, 25, 10, 30, 5, 15, 10],
  ageGroups = ['0-10', '11-20', '21-30', '31-40', '41-50', '51-60', '61+'],
  ageGroupCounts = [5, 10, 20, 25, 15, 10, 5],
}) => {

  // Gender Distribution Data
  const genderData = {
    labels: ['Males', 'Females'],
    datasets: [
      {
        data: [males, females],
        backgroundColor: ['#4F46E5', '#EC4899'],
        hoverOffset: 4,
      },
    ],
  };

  // Blood Group Pie Chart Data
  const bloodGroupData = {
    labels: bloodGroups,
    datasets: [
      {
        data: bloodGroupCounts,
        backgroundColor: ['#F59E0B', '#EF4444', '#3B82F6', '#34D399', '#A855F7', '#6366F1'],
        hoverOffset: 4,
      },
    ],
  };

  // Age Group Line Chart Data
  const ageGroupData = {
    labels: ageGroups,
    datasets: [
      {
        label: 'Number of People',
        data: ageGroupCounts,
        fill: false,
        backgroundColor: '#8B5CF6',
        borderColor: '#7C3AED',
        borderWidth: 2,
        pointBackgroundColor: '#6D28D9',
        pointBorderColor: '#4C1D95',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Healthcare Dashboard',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="bg-gray-50 min-h-screen px-8 pt-2 py-3 w-full">
      <h1 className="text-4xl font-bold text-gray-800 mb-5 text-center">Medical Reports Dashboard</h1>
      <div className="grid grid-cols-4 gap-4 p-4">
        {/* Registrations */}
        <div className="bg-blue-100 rounded-lg p-6 shadow-md flex flex-col items-start">
          <h3 className="text-sm font-medium text-gray-700">Total Reports</h3>
          <div className="flex items-center mt-2">
            <h2 className="text-2xl font-bold text-gray-800">32</h2>
          </div>
        </div>

        {/* Total Views */}
        <div className="bg-blue-50 rounded-lg p-6 shadow-md flex flex-col items-start">
          <h3 className="text-sm font-medium text-gray-700">Completed Appointments</h3>
          <div className="flex items-center mt-2">
            <h2 className="text-2xl font-bold text-gray-800">20</h2>
          </div>
        </div>

        {/* Rating / Reviews */}
        <div className="bg-pink-50 rounded-lg p-6 shadow-md flex flex-col items-start">
          <h3 className="text-sm font-medium text-gray-700">Rating / Reviews</h3>
          <div className="flex items-center mt-2">
            <h2 className="text-2xl font-bold text-gray-800">⭐⭐⭐⭐⭐</h2>
            {/* <span className="ml-2 text-green-500">+0</span> */}
          </div>
        </div>

        {/* Payments */}
        <div className="bg-yellow-100 rounded-lg p-6 shadow-md flex flex-col items-start">
          <h3 className="text-sm font-medium text-gray-700">Payments</h3>
          <div className="flex items-center mt-2">
            <h2 className="text-2xl font-bold text-gray-800">₹ 2,350</h2>
            {/* <span className="ml-2 text-green-500">+0</span> */}
          </div>
        </div>
      </div>

      {/* Dashboard Grid for Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-4">
        {/* Gender Distribution Ring Chart */}
        <div className="bg-white flex flex-col justify-center items-center shadow-lg h-96 rounded-lg py-12">
          <h2 className="text-xl font-semibold mb-4 text-center">Gender Distribution</h2>
          <Doughnut data={genderData} />
        </div>

        {/* Blood Group Pie Chart */}
        <div className="bg-white flex flex-col justify-center items-center shadow-lg h-96 rounded-lg py-12">
          <h2 className="text-xl font-semibold mb-4 text-center">Blood Group Distribution</h2>
          <Pie data={bloodGroupData} />
        </div>

        {/* Age Group Line Chart */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-center">People by Age Group</h2>
          <Line data={ageGroupData} options={options} />
        </div>
      </div>

    </div>
  );
};

export default ReportsDash;
