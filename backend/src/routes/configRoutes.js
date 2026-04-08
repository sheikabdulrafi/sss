const express = require('express');
const { upsertPayrollConfig, getConfig } = require('../controllers/configController');
const { protect, allowPermission } = require('../middleware/authMiddleware');

const router = express.Router();
router.post('/payroll', protect, allowPermission('config', 'update'), upsertPayrollConfig);
router.get('/', protect, allowPermission('config', 'read'), getConfig);

module.exports = router;
