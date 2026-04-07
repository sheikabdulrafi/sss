const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !(await user.matchPassword(password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  res.json({
    token: generateToken(user._id),
    user: { id: user._id, email: user.email, name: user.name }
  });
};

module.exports = { login };
