const express = require('express');
const { createCompany, getCompany, updateCompany } = require('../controllers/companyController');
const { protect, allowRoles, allowPermission } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

const router = express.Router();

router.post('/', protect, allowRoles('SUPER_ADMIN', 'ADMIN'), allowPermission('company', 'create'), upload.single('logo'), createCompany);
router.get('/', protect, allowPermission('company', 'read'), getCompany);
router.put('/', protect, allowRoles('SUPER_ADMIN', 'ADMIN'), allowPermission('company', 'update'), upload.single('logo'), updateCompany);

module.exports = router;
