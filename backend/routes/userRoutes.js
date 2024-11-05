const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Registration Route
router.post('/register', async (req, res) => {
  const { role, fname, lname, email, password, confirmPassword } = req.body;

  // Validate that passwords match
  if (password !== confirmPassword) {
    return res.status(400).json({ error: 'Passwords do not match.' });
  }

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists with this email.' });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Hashed password:', hashedPassword); // Debugging statement

    // Create new user with hashed password
    const newUser = new User({ role, fname, lname, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
    console.error('Registration error:', error); // Log error for debugging
    res.status(400).json({ error: 'Error registering user: ' + error.message });
  }
});
// Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    console.log('User found:', user); // Log found user

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    console.log('Entered Password:', password);
    console.log('Stored Hashed Password:', user.password);

    // Compare the entered password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Password match:', isMatch); // Log password match result

    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(200).json({ message: 'Login successful', token, role: user.role });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



// Route to get the logged-in user's details
router.get('/user', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password'); // Exclude password
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({ success: false, error: 'Error fetching user details' });
  }
});


// Route to fetch registered students
router.get('/students', async (req, res) => {
  try {
    const students = await User.find({ role: 'student' }).select('fname lname email'); // Fetch students with selected fields
    res.json({ success: true, students });
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch students.' });
  }
});




module.exports = router;
