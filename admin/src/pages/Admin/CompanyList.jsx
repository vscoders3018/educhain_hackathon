import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AllCompanies = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/admin/all-companies');
        setCompanies(response.data.compenies || []);
      } catch (err) {
        setError(err.message || 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };
    fetchCompanies();
  }, []);

  const handleVerify = async (id) => {
    try {
      const response = await axios.patch(`http://localhost:4000/api/admin/verify/${id}`);
      alert(response.data.message); // Success or not-found message
      // Optionally update the company's verification status in the UI
      setCompanies((prev) =>
        prev.map((company) =>
          company._id === id ? { ...company, isverified: true } : company
        )
      );
    } catch (error) {
      alert(error.response?.data?.message || 'Error verifying company');
    }
  };

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (error) return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">All Companies</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {companies.map(company => (
          <div
            key={company._id}
            className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center"
          >
            <img
              src={company.image}
              alt={company.name}
              className="w-24 h-24 rounded-full mb-4 border border-gray-300"
            />
            <h2 className="text-xl font-semibold">{company.name}</h2>
            <p className="text-gray-600">{company.email}</p>
            <span
              className={`mt-2 px-4 py-1 rounded-full text-sm font-medium ${
                company.isverified ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}
            >
              {company.isverified ? 'Verified' : 'Not Verified'}
            </span>
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() => handleVerify(company._id)}
            >
              {company.isverified ? 'Re-Verify' : 'Verify'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllCompanies;
