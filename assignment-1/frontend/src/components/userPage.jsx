import React from 'react';
import { useNavigate } from 'react-router-dom';
import  './userPage.css';

const UserPage = () => {
  const navigate = useNavigate();

  const handleView = () => {
    navigate('/view');
  };

  const handleUpdate = () => {
    navigate('/update');
  };

  const handleDelete = () => {
    navigate('/delete');
  };

  return (
    <div className="user-page-container">
      <h2>Welcome to User Dashboard</h2>

      <div className="button-group">
        <button className="btn" onClick={handleView}>View Data</button>
        <button className="btn" onClick={handleUpdate}>Update Data</button>
        <button className="btn" onClick={handleDelete}>Delete Data</button>
      </div>
    </div>
  );
};

export default UserPage;
