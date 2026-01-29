const express = require('express');
const router = express.Router();
// Import mein updateCaseStatus add kiya
const { createCase, getCases, updateCaseStatus } = require('../controllers/caseController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, createCase); // Case create
router.get('/', protect, getCases);    // Get all cases

// --- NEW ROUTE: Status update karne ke liye ---
router.put('/:id', protect, updateCaseStatus); 

module.exports = router;