const express = require('express');
const { listApplications, listQueries, downloadResume } = require('../controllers/adminController');

const router = express.Router();

router.get('/applications', listApplications);
router.get('/applications/:id/resume', downloadResume);
router.get('/queries', listQueries);

module.exports = router;
