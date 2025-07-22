import React, { act, useState } from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  const handleAction = (action) => {
    if (!role) {
      alert("Please select a role first");
      return;
    }

    console.log("Role Selected:", role);

    console.log("Button Clicked:", action);

    //Save to localStorage
    localStorage.setItem("selectedRole", role.charAt(0).toUpperCase() + role.slice(1));


    // Redirecting based on role + action
    if (action === 'login') {
      navigate(`/login`);
    } else if (action === 'register') {
      navigate(`/register`);
    }
  };

  return (

    <div className='home1'>
      <h1>Welcome to Our Website</h1>

      <img
        className='img1'
        src="https://plus.unsplash.com/premium_photo-1673326630896-73aee8b9eefc?w=600&auto=format&fit=crop&q=60"
        alt="Home"
      />

      <h2>Vehicle on Demand</h2>

      <div className="option">
        <label>
          <input
            type="radio"
            name="role"
            value="client"
            onChange={(e) => setRole(e.target.value)}
            checked={role === 'client'}
          />
          <span>Client</span>
        </label>

        <label>
          <input
            type="radio"
            name="role"
            value="admin"
            onChange={(e) => setRole(e.target.value)}
            checked={role === 'admin'}
          />
          <span>Admin</span>
        </label>
      </div>

      <div className="btn">
        <button onClick={() => handleAction('login')}>Login</button>
        <button onClick={() => handleAction('register')}>Register</button>
      </div>
    </div>
  );
};

export default Home;
