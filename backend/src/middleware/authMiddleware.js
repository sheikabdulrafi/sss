const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    if (!user) return res.status(401).json({ message: 'Invalid token user' });
    req.user = user;
    req.companyId = user.companyId;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token verification failed' });
  }
};

const allowRoles = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ message: 'Forbidden' });
  }
  return next();
};

const allowPermission = (moduleKey, operation) => (req, res, next) => {
  if (req.user.role === 'SUPER_ADMIN') return next();
  const modulePerms = req.user.permissions?.[moduleKey] || [];
  if (!modulePerms.includes(operation)) {
    return res.status(403).json({ message: `Missing permission ${moduleKey}:${operation}` });
  }
  return next();
};

module.exports = { protect, allowRoles, allowPermission };
