const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const Class = require('../models/Class');
const User = require('../models/User');

const router = express.Router();

// Route to fetch all public classes
router.get('/public-classes', async (req, res) => {
  try {
    const publicClasses = await Class.find({ type: 'public' }).populate('createdBy', 'fname lname');
    res.status(200).json({ success: true, classes: publicClasses });
  } catch (error) {
    console.error('Error fetching public classes:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Route to fetch all registered private classes for a student
router.get('/registered-classes', authMiddleware, async (req, res) => {
  const studentEmail = req.user.email; // Assuming req.user contains the authenticated student's email

  try {
    const registeredClasses = await Class.find({
      type: 'private',
      students: studentEmail, // Match classes where the student is enrolled
    }).populate('createdBy', 'fname lname'); // Populate createdBy with fname and lname
    
    res.status(200).json({ success: true, classes: registeredClasses });
  } catch (error) {
    console.error('Error fetching registered classes:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Route to register for a private class using the class code
router.post('/register-private-class', authMiddleware, async (req, res) => {
  const { classCode } = req.body;
  const studentEmail = req.user.email; // Assuming req.user contains the authenticated student's email

  try {
    // Find the private class by code
    const classToJoin = await Class.findOne({ code: classCode, type: 'private' });
    
    if (!classToJoin) {
      return res.status(404).json({ success: false, error: 'Class not found or invalid code.' });
    }

    // Add the student's email to the students array if it's not already included
    if (!classToJoin.students.includes(studentEmail)) {
      classToJoin.students.push(studentEmail);
      await classToJoin.save();
    }

    // Find the student by email
    const student = await User.findOne({ email: studentEmail });

    if (!student) {
      return res.status(404).json({ success: false, error: 'Student not found.' });
    }

    // Add the class ID to the student's registeredClasses array if it's not already included
    if (!student.registeredClasses.includes(classToJoin._id)) {
      student.registeredClasses.push(classToJoin._id);
      await student.save();
    }

    res.status(200).json({ success: true, message: 'Successfully registered for the private class.', class: classToJoin });
  } catch (error) {
    console.error('Error registering for class:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;