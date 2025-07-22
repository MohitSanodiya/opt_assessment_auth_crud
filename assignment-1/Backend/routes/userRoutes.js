// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/User'); // adjust path if needed

// GET all users
router.get('/all', async (req, res) => {
  try {
    const users = await User.find().select('-password'); // hide password
    res.status(200).json(users);
  } catch (err) {
    console.error('Error fetching users:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});


// DELETE user by ID
router.delete('/delete/:id', async (req, res) => {
    try {
      const userId = req.params.id;
      const deletedUser = await User.findByIdAndDelete(userId);
  
      if (!deletedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
      console.error('Error deleting user:', err.message);
      res.status(500).json({ message: 'Server error' });
    }
  });
  

module.exports = router;
