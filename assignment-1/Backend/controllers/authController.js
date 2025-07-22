const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Register
const registerUser = async (req, res) => {
  const { fullName, mobile, email, password, address } = req.body;

  console.log("Register Request Data:", req.body);

  try {
    // Validate input
    if (!fullName || !mobile || !email || !password || !address) {
      return res.status(400).json({ message: "All fields are required" });
    }
    
    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      console.log("User already exists with this email");
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const newUser = new User({
      fullName,
      mobile,
      email,
      password: hashedPassword,
      address
    });

    await newUser.save();

    console.log("New user registered:", newUser);

    res.status(201).json({ message: "User registered successfully", userId: newUser._id });
  } catch (error) {
    console.error("Registration Error:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

// Login 
const loginUser = async (req, res) => {
  const { mobile, password } = req.body;

  console.log("Login Attempt:", req.body);

  try {
    // Validate input
    if (!mobile || !password) {
      return res.status(400).json({ message: "Mobile and password are required" });
    }

    // Find user by mobile number
    const user = await User.findOne({ mobile });
    if (!user) {
      console.log("No user found with this mobile number");
      return res.status(404).json({ message: "User not found" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Invalid password");
      return res.status(401).json({ message: "Invalid credentials" });
    }

    console.log("Login successful:", user.fullName);

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        mobile: user.mobile,
        address: user.address
      }
    });
  } catch (error) {
    console.error("Login Error:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { registerUser, loginUser };
