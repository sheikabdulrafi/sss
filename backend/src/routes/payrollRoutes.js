const express = require('express');
const { runPayroll, getPayrollRuns, exportPayrollExcel } = require('../controllers/payrollController');
const { protect, allowPermission } = require('../middleware/authMiddleware');

const router = express.Router();
router.post('/run', protect, allowPermission('payroll', 'create'), runPayroll);
router.get('/', protect, allowPermission('payroll', 'read'), getPayrollRuns);
router.get('/export/:id', protect, allowPermission('payroll', 'read'), exportPayrollExcel);

module.exports = router;
