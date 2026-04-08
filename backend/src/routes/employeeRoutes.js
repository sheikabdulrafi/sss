const express = require('express');
const { createEmployee, getEmployees, updateEmployee, deleteEmployee } = require('../controllers/employeeController');
const { protect, allowPermission } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, allowPermission('employees', 'create'), createEmployee);
router.get('/', protect, allowPermission('employees', 'read'), getEmployees);
router.put('/:id', protect, allowPermission('employees', 'update'), updateEmployee);
router.delete('/:id', protect, allowPermission('employees', 'delete'), deleteEmployee);

module.exports = router;
