require('dotenv').config();
const connectDB = require('../config/db');
const Company = require('../models/Company');
const User = require('../models/User');
const PayrollConfig = require('../models/PayrollConfig');

const run = async () => {
  await connectDB();

  const company = await Company.findOneAndUpdate(
    { name: 'Acme Corp' },
    {
      name: 'Acme Corp',
      address: '101 Main Street, Austin, TX',
      industry: 'Technology',
      hrPolicies: { probationMonths: 6 },
      branding: {
        primaryColor: '#2563eb',
        secondaryColor: '#0f172a',
        emailTemplates: {
          offerLetter: 'Dear {{employeeName}}, welcome to {{companyName}}.',
          payslip: 'Please find attached your payslip for {{month}}.'
        }
      }
    },
    { upsert: true, new: true }
  );

  await User.findOneAndUpdate(
    { email: 'superadmin@hrms.com' },
    {
      name: 'Super Admin',
      email: 'superadmin@hrms.com',
      password: 'Admin@123',
      role: 'SUPER_ADMIN',
      permissions: {
        company: ['create', 'read', 'update', 'delete'],
        employees: ['create', 'read', 'update', 'delete'],
        payroll: ['create', 'read', 'update', 'delete'],
        attendance: ['create', 'read', 'update', 'delete'],
        config: ['create', 'read', 'update', 'delete']
      }
    },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  await User.findOneAndUpdate(
    { email: 'admin@acme.com' },
    {
      name: 'Acme Admin',
      companyId: company._id,
      email: 'admin@acme.com',
      password: 'Admin@123',
      role: 'ADMIN',
      permissions: {
        company: ['read', 'update'],
        employees: ['create', 'read', 'update', 'delete'],
        payroll: ['create', 'read'],
        attendance: ['create', 'read', 'update'],
        config: ['read', 'update']
      }
    },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  await PayrollConfig.findOneAndUpdate(
    { companyId: company._id },
    {
      companyId: company._id,
      salaryTemplate: { basicPercent: 40, hraPercent: 20, allowances: [{ name: 'Special', amount: 5000 }] },
      statutoryRules: { pfPercent: 12, esiPercent: 0.75, pt: 200 },
      taxSlabs: [{ from: 0, to: 300000, rate: 0 }, { from: 300001, to: 700000, rate: 10 }],
      customDeductions: [{ name: 'Food', amount: 750 }],
      dynamicEmployeeFields: [
        { key: 'skillLevel', label: 'Skill Level', type: 'select', options: ['Junior', 'Mid', 'Senior'] },
        { key: 'project', label: 'Project', type: 'text' },
        { key: 'clientName', label: 'Client Name', type: 'text' }
      ]
    },
    { upsert: true, new: true }
  );

  console.log('Seed complete');
  process.exit(0);
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
