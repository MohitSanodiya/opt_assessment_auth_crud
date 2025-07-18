import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.css';

function RegisterForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();

  const password = watch("password");

  const onSubmit = async (data) => {
    console.log("Data sending to backend:", data);
  
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: data.fullName,
          mobile: data.mobile,
          email: data.email,
          password: data.password,
          address: data.address
        })
      });
  
      const result = await response.json();
      console.log("Server response:", result);       // frontend console
  
      if (response.ok) {
        console.log("Registration successful!");
      } else {
        console.log("Registration failed: " + result.message);
      }
    } catch (error) {
      console.error("Registration error:", error);
      console.error("Something went wrong. Please try again.");
    }
  };
  

  return (
    <div className="form-container">
      <h2>Registration Form</h2>
      <form onSubmit={handleSubmit(onSubmit)}>

        {/* Full Name */}
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            {...register("fullName", {
              required: "Full name is required",
              minLength: { value: 3, message: "At least 3 characters" }
            })}
          />
          {errors.fullName && <span>{errors.fullName.message}</span>}
        </div>

        {/* Mobile */}
        <div className="form-group">
          <label>Mobile Number</label>
          <input
            type="text"
            {...register("mobile", {
              required: "Mobile number is required",
              pattern: {
                value: /^[6-9]\d{9}$/,
                message: "Enter valid 10-digit mobile number"
              }
            })}
          />
          {errors.mobile && <span>{errors.mobile.message}</span>}
        </div>

        {/* Email */}
        <div className="form-group">
          <label>Email ID</label>
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Enter a valid email"
              }
            })}
          />
          {errors.email && <span>{errors.email.message}</span>}
        </div>

        {/* Password */}
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "At least 6 characters required"
              }
            })}
          />
          {errors.password && <span>{errors.password.message}</span>}
        </div>

        {/* Confirm Password */}
        <div className="form-group">
          <label>Confirm Password</label>
          <input
            type="password"
            {...register("confirmPassword", {
              required: "Confirm password is required",
              validate: (value) =>
                value === password || "Passwords do not match"
            })}
          />
          {errors.confirmPassword && <span>{errors.confirmPassword.message}</span>}
        </div>

        {/* Address */}
        <div className="form-group">
          <label>Address</label>
          <textarea
            rows={3}
            {...register("address", {
              required: "Address is required",
              minLength: {
                value: 10,
                message: "Minimum 10 characters required"
              }
            })}
          />
          {errors.address && <span>{errors.address.message}</span>}
        </div>

        {/* Submit */}
        <div className="form-group">
          <button className="btn1" type="submit">Register</button>
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;
