import React from 'react';

const Store = ({ rewards }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {rewards.map((reward, index) => (
        <div
          key={index}
          className="bg-white rounded-lg shadow-md overflow-hidden"
        >
<div
  className="h-40 bg-cover bg-center bg-red-300"
  style={{ backgroundImage: `url('${reward.bgImage}')` }}
></div>
          <div className="p-6">
            <h3 className="text-2xl font-bold mb-4">{reward.title}</h3>
            <p className="text-gray-600 mb-6">{reward.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-blue-500 font-bold">
                {reward.rewardAmount} 🪙
              </span>
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                Redeem
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Store;