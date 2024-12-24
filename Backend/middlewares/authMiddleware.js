const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; 

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET); 
    req.user = verified; 
    next(); 
  } catch (err) {
    res.status(403).json({ error: 'Invalid token.' });
  }
};

const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Access forbidden: insufficient permissions.' });
    }
    next();
  };
};

module.exports = { authenticateToken, restrictTo };
