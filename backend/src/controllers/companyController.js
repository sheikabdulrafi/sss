const Company = require('../models/Company');

const createCompany = async (req, res, next) => {
  try {
    const payload = req.body;
    if (req.file) payload.logoUrl = `/uploads/${req.file.filename}`;
    const company = await Company.create(payload);
    return res.status(201).json(company);
  } catch (error) {
    return next(error);
  }
};

const getCompany = async (req, res, next) => {
  try {
    const id = req.user.role === 'SUPER_ADMIN' ? req.query.companyId : req.companyId;
    const company = await Company.findById(id);
    return res.json(company);
  } catch (error) {
    return next(error);
  }
};

const updateCompany = async (req, res, next) => {
  try {
    const id = req.user.role === 'SUPER_ADMIN' ? req.body.companyId || req.query.companyId : req.companyId;
    const payload = req.body;
    if (req.file) payload.logoUrl = `/uploads/${req.file.filename}`;
    const company = await Company.findByIdAndUpdate(id, payload, { new: true });
    return res.json(company);
  } catch (error) {
    return next(error);
  }
};

module.exports = { createCompany, getCompany, updateCompany };
