const path = require('path');
const JobApplication = require('../models/JobApplication');
const ContactQuery = require('../models/ContactQuery');

const listApplications = async (req, res) => {
  const apps = await JobApplication.find().sort({ createdAt: -1 });
  res.json(apps);
};

const downloadResume = async (req, res) => {
  const app = await JobApplication.findById(req.params.id);
  if (!app?.resumePath) return res.status(404).json({ message: 'Resume not found' });
  const filePath = path.join(__dirname, '..', app.resumePath.replace(/^\//, ''));
  res.download(filePath);
};

const listQueries = async (req, res) => {
  const queries = await ContactQuery.find().sort({ createdAt: -1 });
  res.json(queries);
};

module.exports = { listApplications, downloadResume, listQueries };
