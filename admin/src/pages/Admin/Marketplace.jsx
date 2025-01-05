import React from "react";

const Marketplace = () => {
  const data = [
    { type: "Blood Report", count: 3 },
    { type: "X- Ray", count: 5 },
    { type: "MRI Scan", count: 2 },
  ];

  return (
    <div className="p-6">
      <table className="min-w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 border border-gray-300">Type</th>
            <th className="px-4 py-2 border border-gray-300">Count</th>
            <th className="px-4 py-2 border border-gray-300">Buy</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-4 py-2 border border-gray-300">{item.type}</td>
              <td className="px-4 py-2 border border-gray-300">{item.count}</td>
              <td className="px-4 py-2 border border-gray-300">
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
                  Buy
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Marketplace;
