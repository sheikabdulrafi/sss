const express = require('express');
const { saveTemplate, generateEmployeeDocument, generatePayslip } = require('../controllers/documentController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();
router.post('/templates', protect, saveTemplate);
router.get('/employee/:employeeId/:type', protect, generateEmployeeDocument);
router.get('/payslip/:runId/:employeeId', protect, generatePayslip);

module.exports = router;
