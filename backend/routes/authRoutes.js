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
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }
    const BASE_URL = process.env.BASE_URL || `http://localhost:${process.env.PORT || 5000}`;
const imageUrl = `${BASE_URL}/uploads/${req.file.filename}`;

    res.status(200).json({ imageUrl });
});

module.exports = router;

