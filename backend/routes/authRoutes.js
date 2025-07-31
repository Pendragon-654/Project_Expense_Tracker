const express = require('express');
const { protect } = require('../middleware/authMiddleware');

const {
    registerUser,
    loginUser,
    getUserInfo
} = require('../controllers/authController');
const upload = require('../middleware/uploadmiddleware');

const router = express.Router();

router.post('/register', registerUser);

router.post('/login', loginUser);

router.get('/getuser',protect, getUserInfo);

router.post("/upload-image", upload.single('image'), (req, res) => {
  if (!req.file || !req.file.path) {
    return res.status(400).json({ message: 'Upload failed' });
  }

  res.status(200).json({ imageUrl: req.file.path }); // Cloudinary gives direct URL
});


module.exports = router;

