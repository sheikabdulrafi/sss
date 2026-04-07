const express = require('express');
const {
  listEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  exportEmployees
} = require('../controllers/employeeController');

const router = express.Router();

router.get('/', listEmployees);
router.get('/export/excel', exportEmployees);
router.post('/', createEmployee);
router.put('/:id', updateEmployee);
router.delete('/:id', deleteEmployee);

module.exports = router;
