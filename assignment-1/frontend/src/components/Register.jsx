import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Register.css";

function RegisterForm() {
  // const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  // Checking validation of email
  function isValidEmail(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  }

  const onSubmit = async (data) => {
    console.log("Data sending to backend : ", data);

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: data.fullName,
          mobile: data.mobile,
          email: data.email,
          password: data.password,
          address: data.address,
        }),
      });

      const result = await response.json();
      console.log("Server response:", result); // frontend console

      if (response.ok) {
        console.log("Registration successful");
        alert("Registration Successful");
      } else {
        console.log("Registration failed: " + result.message);
        alert("Registration Failed");
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert("Something went wrong. Please ty again.");
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
              minLength: { value: 3, message: "At least 3 characters" },
            })}
          />
          {errors.fullName && <p className="error-msg">{errors.fullName.message}</p>}
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
                message: "Enter valid 10-digit mobile number",
              },
            })}
          />
          {errors.mobile && <p className="error-msg">{errors.mobile.message}</p>}
        </div>

        <div className="form-group">
          <label>Email ID</label>
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Enter a valid email address",
              },
            })}
          />
          {/* Error message shown below the input box */}
          {errors.email && <p className="error-msg">{errors.email.message}</p>}
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
                message: "At least 6 characters required",
              },
            })}
          />
          {errors.password && <p className="error-msg">{errors.password.message}</p>}
        </div>

        {/* Address */}
        <div className="form-group">
          <label>Address</label>
          <textarea
            className="txt-ar"
            rows={3}
            {...register("address", {
              required: "Address is required",
              minLength: {
                value: 5,
                message: "Minimum 5 characters required",
              },
            })}
          />
          {errors.address && <p className="error-msg">{errors.address.message}</p>}
        </div>

        {/* Submit */}
        <div className="form-group">
          <button className="btn1" type="submit">
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;
