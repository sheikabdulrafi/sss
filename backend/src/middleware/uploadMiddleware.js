const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, path.join(__dirname, '..', 'uploads', 'resumes'));
  },
  filename(req, file, cb) {
    const stamp = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${stamp}-${file.originalname}`);
  }
});

const fileFilter = (req, file, cb) => {
  const allowed = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
  if (allowed.includes(file.mimetype)) return cb(null, true);
  cb(new Error('Only PDF and Word files are allowed'));
};

const uploadResume = multer({ storage, fileFilter, limits: { fileSize: 5 * 1024 * 1024 } });

module.exports = { uploadResume };
