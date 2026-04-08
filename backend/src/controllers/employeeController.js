const Employee = require('../models/Employee');

const createEmployee = async (req, res, next) => {
  try {
    const companyId = req.user.role === 'SUPER_ADMIN' ? req.body.companyId : req.companyId;
    const employee = await Employee.create({ ...req.body, companyId });
    return res.status(201).json(employee);
  } catch (error) {
    return next(error);
  }
};

const getEmployees = async (req, res, next) => {
  try {
    const companyId = req.user.role === 'SUPER_ADMIN' ? req.query.companyId : req.companyId;
    const employees = await Employee.find({ companyId }).sort({ createdAt: -1 });
    return res.json(employees);
  } catch (error) {
    return next(error);
  }
};

const updateEmployee = async (req, res, next) => {
  try {
    const companyId = req.user.role === 'SUPER_ADMIN' ? req.body.companyId || req.query.companyId : req.companyId;
    const employee = await Employee.findOneAndUpdate({ _id: req.params.id, companyId }, req.body, { new: true });
    return res.json(employee);
  } catch (error) {
    return next(error);
  }
};

const deleteEmployee = async (req, res, next) => {
  try {
    const companyId = req.user.role === 'SUPER_ADMIN' ? req.query.companyId : req.companyId;
    await Employee.findOneAndDelete({ _id: req.params.id, companyId });
    return res.json({ message: 'Employee deleted' });
  } catch (error) {
    return next(error);
  }
};

module.exports = { createEmployee, getEmployees, updateEmployee, deleteEmployee };
