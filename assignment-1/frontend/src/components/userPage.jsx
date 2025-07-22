import React, { useEffect, useState } from "react";
import axios from "axios";
import "./userPage.css";

const UserPage = () => {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);

  // Fetch data on View Data click
  const handleView = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/users/all');

      setUsers(res.data);
      console.log("Data fetched successfully:", res.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Select row (set selected user ID)
  const handleSelect = (id) => {
    setSelectedUserId(id);
    console.log("Selected User ID:", id);
  };

  // Delete selected user
  const handleDelete = async () => {
    if (!selectedUserId) {
      alert("Please select a user to delete.");
      return;
    }

    try {
      await axios.delete(`http://localhost:5000/api/users/delete/${selectedUserId}`);

      console.log("User deleted successfully:", selectedUserId);
      // Refresh table data
      handleView();
      setSelectedUserId(null);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // Placeholder update button
  const handleUpdate = () => {
    if (!selectedUserId) {
      alert("Please select a user to update.");
      return;
    }
    console.log("Update function called for User ID:", selectedUserId);
    // Navigate or open modal to update (future implementation)
  };

  return (
    <div className="user-page-container">
      <h2>Welcome to User Dashboard</h2>

      <div className="button-group">
        <button className="btn" onClick={handleView}>
          View Data
        </button>
        <button className="btn" onClick={handleUpdate}>
          Update Data
        </button>
        <button className="btn" onClick={handleDelete}>
          Delete Data
        </button>
      </div>

      {users.length > 0 && (
        <table className="data-table">
          <thead>
            <tr>
              <th>Select</th>
              <th>Full Name</th>
              <th>Mobile</th>
              <th>Email</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user._id}
                className={selectedUserId === user._id ? "selected-row" : ""}
                onClick={() => handleSelect(user._id)}
              >
                <td>
                  <input
                    type="radio"
                    name="selectedUser"
                    checked={selectedUserId === user._id}
                    onChange={() => handleSelect(user._id)}
                  />
                </td>
                <td>{user.fullName}</td>
                <td>{user.mobile}</td>
                <td>{user.email}</td>
                <td>{user.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserPage;
