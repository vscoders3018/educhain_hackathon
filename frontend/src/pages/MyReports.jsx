import React, { useEffect, useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import axios from "axios";

const MyReports = () => {
    const [reports, setReports] = useState([]);
    const [selectedReport, setSelectedReport] = useState(null);
    const { token, backendUrl } = useContext(AppContext);

    // Fetch all reports on component mount
    useEffect(() => {
        const fetchReports = async () => {
            try {
                const response = await axios.get(backendUrl + `/api/user/reports`, { headers: { token } });
                if (response) {
                    const data = await response.data.reports
                    setReports(data);
                    console.log("data" + data)
                } else {
                    console.error('Error fetching reports:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching reports:', error);
            }
        };

        fetchReports();
    }, []);

    const handleViewCustomData = (customData) => {
        alert(JSON.stringify(customData, null, 2));
    };


    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1>Medical Reports</h1>

            {/* List of all reports */}
            <div>
                <h2>Reports List</h2>
                {reports.length > 0 ? (
                    <ul>
                        {reports.map((report) => (
                            <table className="table-auto w-full text-left" key={report._id}>
                                <tbody>
                                    <tr>
                                        <th className="px-4 py-2 text-gray-600 border-b">ID</th>
                                        <td className="px-4 py-2 border-b">{report._id}</td>
                                    </tr>
                                    <tr>
                                        <th className="px-4 py-2 text-gray-600 border-b">Image</th>
                                        <td className="px-4 py-2 border-b">
                                            <a
                                                href={report.imageLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-500 hover:underline"
                                            >
                                                View Image
                                            </a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th className="px-4 py-2 text-gray-600 border-b">Test Type</th>
                                        <td className="px-4 py-2 border-b">{report.testType}</td>
                                    </tr>
                                    <tr>
                                        <th className="px-4 py-2 text-gray-600 border-b">Custom Data</th>
                                        <td className="px-4 py-2 border-b">
                                            <button
                                                onClick={() => handleViewCustomData(report.customData)}
                                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                            >
                                                View
                                            </button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th className="px-4 py-2 text-gray-600 border-b">Created At</th>
                                        <td className="px-4 py-2 border-b">
                                            {new Date(report.createdAt).toLocaleString()}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th className="px-4 py-2 text-gray-600 border-b">Updated At</th>
                                        <td className="px-4 py-2 border-b">
                                            {new Date(report.updatedAt).toLocaleString()}
                                        </td>
                                    </tr>
                                    <tr className=''>
                                        <th className="px-4 py-8 text-gray-600 border-b"></th>
                                        <td className="px-4 py-8 border-b">
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        ))}
                    </ul>
                ) : (
                    <p>No Reports Found.</p>
                )}
            </div>

        </div>
    );
};

export default MyReports;
