const express = require('express');
const { submitContactQuery, submitJobApplication } = require('../controllers/publicController');
const { uploadResume } = require('../middleware/uploadMiddleware');

const router = express.Router();

router.post('/contact', submitContactQuery);
router.post('/careers/apply', uploadResume.single('resume'), submitJobApplication);

module.exports = router;
