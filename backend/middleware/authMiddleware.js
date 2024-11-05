const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  console.log('Received token:', token); // Log the received token
  if (!token) {
    console.log('No token provided.'); // Log when no token is present
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded token:', decoded); // Log the decoded token
    req.user = await User.findById(decoded.userId);
    console.log('Authenticated user:', req.user); // Log authenticated user
    next();
  } catch (error) {
    console.log('Invalid token:', error.message); // Log invalid token error
    res.status(400).json({ error: 'Invalid token.' });
  }
};

module.exports = authMiddleware;
