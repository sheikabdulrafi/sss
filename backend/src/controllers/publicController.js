const ContactQuery = require('../models/ContactQuery');
const JobApplication = require('../models/JobApplication');

const submitContactQuery = async (req, res) => {
  const query = await ContactQuery.create(req.body);
  res.status(201).json(query);
};

const submitJobApplication = async (req, res) => {
  const payload = {
    ...req.body,
    resumePath: req.file ? `/uploads/resumes/${req.file.filename}` : null
  };
  const application = await JobApplication.create(payload);
  res.status(201).json(application);
};

module.exports = { submitContactQuery, submitJobApplication };
