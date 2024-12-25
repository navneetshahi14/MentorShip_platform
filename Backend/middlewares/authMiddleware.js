const jwt = require('jsonwebtoken');

const authenticateToken = async (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  console.log(token) 

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    // console.log(process.env.JWT_SECERT)
    const verified = jwt.verify(token, process.env.JWT_SECERT);
    console.log(verified)
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
