const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const PORT = 3000;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage, fileFilter: (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type'), false);
  }
}});

app.post('/upload', upload.single('image'), (req, res) => {
  res.send({ file: req.file });
});

app.get('/uploads/:filename', (req, res) => {
  const filename = req.params.filename;
  res.sendFile(path.join(__dirname, 'uploads', filename));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
