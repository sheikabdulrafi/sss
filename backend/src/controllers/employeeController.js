const ExcelJS = require('exceljs');
const Employee = require('../models/Employee');

const listEmployees = async (req, res) => {
  const { search = '', department, employeeStatus } = req.query;
  const filter = {
    ...(department ? { department } : {}),
    ...(employeeStatus ? { employeeStatus } : {}),
    ...(search
      ? {
          $or: [
            { employeeName: { $regex: search, $options: 'i' } },
            { employeeNumber: { $regex: search, $options: 'i' } },
            { email: { $regex: search, $options: 'i' } }
          ]
        }
      : {})
  };
  const employees = await Employee.find(filter).sort({ createdAt: -1 });
  res.json(employees);
};

const createEmployee = async (req, res) => {
  const employee = await Employee.create(req.body);
  res.status(201).json(employee);
};

const updateEmployee = async (req, res) => {
  const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!employee) return res.status(404).json({ message: 'Employee not found' });
  res.json(employee);
};

const deleteEmployee = async (req, res) => {
  const employee = await Employee.findByIdAndDelete(req.params.id);
  if (!employee) return res.status(404).json({ message: 'Employee not found' });
  res.json({ message: 'Employee removed' });
};

const exportEmployees = async (req, res) => {
  const employees = await Employee.find().lean();
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Employees');

  const headers = Object.keys(employees[0] || { employeeNumber: '', employeeName: '' }).filter((h) => !['_id', '__v'].includes(h));
  worksheet.columns = headers.map((header) => ({ header, key: header, width: 20 }));
  employees.forEach((employee) => worksheet.addRow(employee));

  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.setHeader('Content-Disposition', 'attachment; filename=employees.xlsx');

  await workbook.xlsx.write(res);
  res.end();
};

module.exports = { listEmployees, createEmployee, updateEmployee, deleteEmployee, exportEmployees };
