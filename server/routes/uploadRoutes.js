const express = require('express');
const upload = require('../middleware/multer-config');
const router = express.Router();

router.post('/upload-profile', upload.single('profileImage'), (req, res) => {
  res.json({ imagePath: req.file.path });
});

module.exports = router;
