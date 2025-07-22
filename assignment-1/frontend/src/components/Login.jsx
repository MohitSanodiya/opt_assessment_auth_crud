import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [role, setRole] = useState("client");

  //Login Handler
  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        mobile: data.mobile,
        password: data.password,
      });

      alert(response.data.message);

      // Store user info if needed
      localStorage.setItem("userData", JSON.stringify(response.data.user));

      // Navigate to userPage after login
      navigate("/userpage");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label className="log-mobile">Mobile Number</label>
          <input
            className="mo-input"
            type="text"
            {...register("mobile", {
              required: "Mobile number is required",
              pattern: {
                value: /^[6-9]\d{9}$/,
                message: "Enter valid 10-digit number",
              },
            })}
          />
          {errors.mobile && <span className="error">{errors.mobile.message}</span>}
        </div>

        <div className="form-group">
          <label className="log-psw">Password</label>
          <input
            className="psw-input"
            type="password"
            {...register("password", {
              required: "Password is required",
            })}
          />
          {errors.password && <span className="error">{errors.password.message}</span>}
        </div>
{/* 
        <div className="role-option">
          <label>
            <input
              type="radio"
              name="role"
              value="client"
              onChange={(e) => setRole(e.target.value)}
              checked={role === "client"}
            />
            <span>Client</span>
          </label>

          <label>
            <input
              type="radio"
              name="role"
              value="admin"
              onChange={(e) => setRole(e.target.value)}
              checked={role === "admin"}
            />
            <span>Admin</span>
          </label>
        </div> */}

        <button type="submit" className="btn1">
          Login
        </button>
      </form>

      <p className="register-link">
        New here? <Link to="/register">Register</Link>
      </p>
    </div>
  );
};

export default Login;
