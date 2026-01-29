const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getMe, updateProfile, getAllUsers, getUserById } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware'); 

// --- 1. MULTER SETUP (Ye naya hai) ---
const multer = require('multer');
const path = require('path');

// File kahan save hogi aur uska naam kya hoga
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Absolute path use kar rahe hain taaki server kahan se bhi chalaye, kaam kare
    const uploadDir = path.join(__dirname, '../uploads');
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // File ka naam unique banayenge (Time + Extension)
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });
// --------------------------------------

// --- ROUTES ---

// Middleware to handle multer errors
const multerErrorHandler = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        return res.status(400).json({ message: 'File upload error: ' + err.message });
    } else if (err) {
        return res.status(400).json({ message: 'Error: ' + err.message });
    }
    next();
};

// UPDATE: Yahan 'upload.single' lagaya hai taaki wo 'license' file ko pakad sake
// POST registration route
router.post('/', (req, res, next) => {
    upload.single('license')(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({ message: 'File upload error: ' + err.message });
        } else if (err) {
            return res.status(400).json({ message: 'Error: ' + err.message });
        }
        next();
    });
}, registerUser);

// Login route
router.post('/login', loginUser);

// Get logged-in user route (MUST be before /:id route to avoid conflict)
router.get('/me', protect, getMe);

// Get all users route (PUBLIC - no auth needed)
router.get('/', getAllUsers);

// Get user by ID route (PUBLIC - no auth needed)
router.get('/:id', getUserById);

// Update profile route
router.put('/me', protect, updateProfile);

module.exports = router;