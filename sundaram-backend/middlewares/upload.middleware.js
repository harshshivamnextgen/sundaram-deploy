const path = require('path');
const fs = require('fs');
const multer = require('multer');

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_MIMETYPES = ['image/jpeg', 'image/png', 'image/webp'];

const ensureDirectoryExists = (dirPath) => {
  if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });
};

const createUploadMiddleware = (subfolder) => {
  const destination = path.join(process.cwd(), 'uploads', subfolder);
  ensureDirectoryExists(destination);
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      ensureDirectoryExists(destination);
      cb(null, destination);
    },
    filename: (_req, file, cb) => {
      const ext = path.extname(file.originalname);
      cb(null, `${Date.now()}-${Math.round(Math.random() * 1e6)}${ext}`);
    },
  });
  const fileFilter = (_req, file, cb) => {
    if (!ALLOWED_MIMETYPES.includes(file.mimetype)) return cb(new Error('Only jpg, png, and webp images are allowed'));
    cb(null, true);
  };
  return multer({ storage, limits: { fileSize: MAX_FILE_SIZE }, fileFilter });
};

module.exports = { createUploadMiddleware };
