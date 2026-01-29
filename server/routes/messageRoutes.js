const express = require('express');
const router = express.Router();
const { sendMessage, getMessages, getConversations, markAsRead } = require('../controllers/messageController');
const { protect } = require('../middleware/authMiddleware');

// Send message
router.post('/', protect, sendMessage);

// Get all conversations (MUST COME BEFORE /:userId route)
router.get('/conversations/list', protect, getConversations);

// Get messages between two users
router.get('/:userId', protect, getMessages);

// Mark message as read
router.put('/:messageId/read', protect, markAsRead);

module.exports = router;
