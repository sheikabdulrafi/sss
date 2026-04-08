const PayrollConfig = require('../models/PayrollConfig');

const upsertPayrollConfig = async (req, res, next) => {
  try {
    const companyId = req.user.role === 'SUPER_ADMIN' ? req.body.companyId : req.companyId;
    const config = await PayrollConfig.findOneAndUpdate(
      { companyId },
      { ...req.body, companyId },
      { new: true, upsert: true }
    );
    return res.json(config);
  } catch (error) {
    return next(error);
  }
};

const getConfig = async (req, res, next) => {
  try {
    const companyId = req.user.role === 'SUPER_ADMIN' ? req.query.companyId : req.companyId;
    const config = await PayrollConfig.findOne({ companyId });
    return res.json(config);
  } catch (error) {
    return next(error);
  }
};

module.exports = { upsertPayrollConfig, getConfig };
