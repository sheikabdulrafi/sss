require('dotenv').config();
const connectDB = require('../config/db');
const User = require('../models/User');

const seedAdmin = async () => {
  await connectDB();

  const email = process.env.ADMIN_EMAIL || 'admin@staffex.com';
  const password = process.env.ADMIN_PASSWORD || 'Admin@123';

  const exists = await User.findOne({ email });
  if (exists) {
    console.log('Admin already exists');
    process.exit(0);
  }

  await User.create({ email, password, name: 'Staffex Admin' });
  console.log('Admin user created');
  process.exit(0);
};

seedAdmin().catch((error) => {
  console.error(error);
  process.exit(1);
});
