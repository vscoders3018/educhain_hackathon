import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaFileMedical, FaLock, FaCoins, FaChartBar, FaNetworkWired, FaPlus } from 'react-icons/fa';

const Header = () => {
    const [reports] = useState([]);
    const navigate = useNavigate();

    const FeatureCard = ({ icon: Icon, title, description, gradient }) => (
        <div className={`relative overflow-hidden rounded-2xl border border-gray-100 p-6 shadow-md transition-all duration-300 hover:shadow-xl ${gradient}`}>
            <div className="absolute top-0 right-0 opacity-10 text-9xl">
                <Icon />
            </div>
            <div className="relative z-10">
                <div className="flex items-center mb-4">
                    <Icon className="text-5xl text-blue-600 mr-4" />
                    <h3 className="text-xl font-bold text-gray-800">{title}</h3>
                </div>
                <p className="text-gray-600">{description}</p>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen">
            {/* Hero Section with Web3 Inspired Background */}
            <div className="relative bg-white overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="100%" 
                        height="100%" 
                        viewBox="0 0 1440 810" 
                        preserveAspectRatio="xMinYMin slice"
                    >
                        <g fill="none" stroke="#3B82F6" strokeWidth="1">
                            <path d="M0,270 Q720,540 1440,270" />
                            <path d="M0,360 Q720,90 1440,360" />
                            <path d="M0,450 Q720,720 1440,450" />
                        </g>
                    </svg>
                </div>
                
                <div className="relative container mx-auto px-6 pt-16 pb-24 text-center">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
                        Secure Medical Data Marketplace
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto mb-10">
                        Revolutionizing healthcare data sharing through blockchain, privacy, and personalized rewards
                    </p>
                    <button 
                        onClick={() => navigate('/login')} 
                        className="bg-blue-600 text-white px-10 py-4 rounded-full text-lg font-semibold 
                        hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                        Connect Wallet
                    </button>
                </div>
            </div>

            {/* Features Section */}
            <div className="container mx-auto px-6 py-16">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">How We Empower Your Health Data</h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Seamless, secure, and rewarding medical data sharing powered by Web3 technology
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <FeatureCard 
                        icon={FaFileMedical}
                        title="Upload Securely"
                        description="Share medical reports with end-to-end encryption"
                        gradient="bg-gradient-to-br from-blue-50 to-white"
                    />
                    <FeatureCard 
                        icon={FaLock}
                        title="Privacy First"
                        description="Anonymized data with blockchain verification"
                        gradient="bg-gradient-to-br from-green-50 to-white"
                    />
                    <FeatureCard 
                        icon={FaCoins}
                        title="Token Rewards"
                        description="Earn crypto tokens for valuable health insights"
                        gradient="bg-gradient-to-br from-purple-50 to-white"
                    />
                    <FeatureCard 
                        icon={FaChartBar}
                        title="Research Impact"
                        description="Contribute to groundbreaking medical research"
                        gradient="bg-gradient-to-br from-indigo-50 to-white"
                    />
                </div>
            </div>

            {/* Additional Web3 Health Section */}
            <div className="container mx-auto px-6 py-16 text-center">
                <h2 className="text-4xl font-bold text-gray-900 mb-8">
                    Transforming Healthcare Through Decentralization
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-white rounded-2xl p-8 shadow-md border border-gray-100">
                        <FaNetworkWired className="text-6xl text-blue-600 mx-auto mb-6" />
                        <h3 className="text-2xl font-semibold mb-4">Decentralized Health Network</h3>
                        <p className="text-gray-600">
                            Create a global, interconnected health ecosystem where data is a shared resource, not a controlled commodity.
                        </p>
                    </div>
                    <div className="bg-white rounded-2xl p-8 shadow-md border border-gray-100">
                        <FaPlus className="text-6xl text-green-600 mx-auto mb-6" />
                        <h3 className="text-2xl font-semibold mb-4">Personalized Health Insights</h3>
                        <p className="text-gray-600">
                            Leverage AI and blockchain to unlock personalized health recommendations and predictive analytics.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;