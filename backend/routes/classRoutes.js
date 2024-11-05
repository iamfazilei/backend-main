const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const Class = require('../models/Class');
const User = require('../models/User');

const router = express.Router();

// Route to create a new class
router.post('/create-class', authMiddleware, async (req, res) => {
  const { name, description, type, students } = req.body;

  try {
    const newClass = new Class({
      name,
      description,
      type,
      students, // Assuming this contains student emails
      createdBy: req.user._id,
    });

    await newClass.save();
    res.status(201).json({ success: true, message: 'Class created successfully!', class: newClass });
  } catch (error) {
    console.error('Error creating class:', error);
    res.status(400).json({ error: 'Error creating class: ' + error.message });
  }
});

// Route to get all classes for the logged-in user
router.get('/classes', authMiddleware, async (req, res) => {
  try {
    const classes = await Class.find({ createdBy: req.user._id });
    res.status(200).json({ success: true, classes });
  } catch (error) {
    console.error('Error fetching classes:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Route to get class details by ID
router.get('/class/:id', authMiddleware, async (req, res) => {
  try {
    const classData = await Class.findById(req.params.id);
    if (!classData) {
      return res.status(404).json({ success: false, error: 'Class not found' });
    }

    // Find students based on emails stored in additionalInfo
    const students = await User.find({ email: { $in: classData.students } });
    
    res.json({ success: true, class: { ...classData._doc, students } });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// POST route to add multiple students to a class
router.post('/class/:id/add-students', authMiddleware, async (req, res) => {
  const classId = req.params.id;
  const { emails } = req.body;

  if (!Array.isArray(emails)) {
    return res.status(400).json({ success: false, error: 'Invalid input. Emails must be an array.' });
  }

  try {
    const classToUpdate = await Class.findById(classId);
    if (!classToUpdate) {
      return res.status(404).json({ success: false, error: 'Class not found' });
    }

    // Update the Class model
    await Class.updateOne(
      { _id: classId },
      { $addToSet: { students: { $each: emails } } }
    );

    // Update the User model for each student
    await User.updateMany(
      { email: { $in: emails } },
      { $addToSet: { registeredClasses: classId } }
    );

    const updatedClass = await Class.findById(classId).populate('students');
    return res.json({ success: true, class: updatedClass });
  } catch (error) {
    console.error('Error adding students:', error);
    return res.status(500).json({ success: false, error: 'An error occurred while adding students' });
  }
});

// Route to remove a student from a class
router.post('/class/:id/remove-student', authMiddleware, async (req, res) => {
  const classId = req.params.id;
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ success: false, error: 'Email is required.' });
  }

  try {
    const classToUpdate = await Class.findById(classId);
    if (!classToUpdate) {
      return res.status(404).json({ success: false, error: 'Class not found.' });
    }

    // Remove the student by filtering out the email
    classToUpdate.students = classToUpdate.students.filter(studentEmail => studentEmail !== email);

    // Save the updated class
    await classToUpdate.save();

    // Remove the class from the student's registeredClasses
    await User.updateOne(
      { email },
      { $pull: { registeredClasses: classId } }
    );

    // Fetch the updated class to return
    const updatedClass = await Class.findById(classId);
    
    return res.json({ success: true, class: updatedClass });
  } catch (error) {
    console.error('Error removing student:', error);
    return res.status(500).json({ success: false, error: 'An error occurred while removing the student.' });
  }
});

module.exports = router;