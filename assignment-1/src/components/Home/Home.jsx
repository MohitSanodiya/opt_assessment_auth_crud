import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [userType, setUserType] = useState('client'); // Default selected
  const navigate = useNavigate();

  const handleContinue = () => {
    if (userType === 'admin') {
      navigate('/admin-auth'); // redirect to Admin Login/Register
    } else {
      navigate('/client-auth'); // redirect to Client Login/Register
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center px-4">
      {/* App Logo */}
      <img
        src="/apk-logo.png" // Replace with actual path
        alt="App Logo"
        className="w-24 h-24 mb-4"
      />

      {/* App Name */}
      <h1 className="text-3xl font-bold mb-8">APK App</h1>

      {/* Toggle User Type */}
      <div className="flex items-center space-x-6 mb-6">
        <button
          className={`px-6 py-2 rounded-full border ${
            userType === 'client' ? 'bg-blue-600 text-white' : 'bg-white text-gray-800'
          }`}
          onClick={() => setUserType('client')}
        >
          Client
        </button>
        <button
          className={`px-6 py-2 rounded-full border ${
            userType === 'admin' ? 'bg-blue-600 text-white' : 'bg-white text-gray-800'
          }`}
          onClick={() => setUserType('admin')}
        >
          Admin
        </button>
      </div>

      {/* Continue Button */}
      <button
        onClick={handleContinue}
        className="bg-green-600 text-white px-8 py-3 rounded-full shadow-md hover:bg-green-700 transition duration-300"
      >
        Continue
      </button>
    </div>
  );
};

export default Home;
