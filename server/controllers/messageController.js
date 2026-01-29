const Message = require('../models/messageModel');
const mongoose = require('mongoose');

// @desc    Send a message
// @route   POST /api/messages
// @access  Private
const sendMessage = async (req, res) => {
  try {
    const { receiverId, caseId, text } = req.body;

    if (!receiverId || !text) {
      return res.status(400).json({ message: 'Please provide receiver and message text' });
    }

    const message = await Message.create({
      sender: req.user.id,
      receiver: receiverId,
      caseId: caseId || null,
      text,
    });

    // Populate sender and receiver data
    await message.populate('sender', 'name email');
    await message.populate('receiver', 'name email');

    res.status(201).json(message);
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ message: 'Server Error sending message' });
  }
};

// @desc    Get messages between two users
// @route   GET /api/messages/:userId
// @access  Private
const getMessages = async (req, res) => {
  try {
    const { userId } = req.params;
    const currentUserId = req.user.id;

    if (!userId) {
      return res.status(400).json({ message: 'Please provide user ID' });
    }

    // Get all messages between two users (bi-directional)
    const messages = await Message.find({
      $or: [
        { sender: currentUserId, receiver: userId },
        { sender: userId, receiver: currentUserId },
      ],
    })
      .populate('sender', 'name email')
      .populate('receiver', 'name email')
      .sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ message: 'Server Error fetching messages' });
  }
};

// @desc    Get all conversations for a user
// @route   GET /api/messages/conversations/list
// @access  Private
const getConversations = async (req, res) => {
  try {
    const userId = req.user.id;

    // Get unique conversations
    const conversations = await Message.aggregate([
      {
        $match: {
          $or: [{ sender: mongoose.Types.ObjectId(userId) }, { receiver: mongoose.Types.ObjectId(userId) }],
        },
      },
      {
        $group: {
          _id: {
            $cond: [
              { $eq: ['$sender', mongoose.Types.ObjectId(userId)] },
              '$receiver',
              '$sender',
            ],
          },
          lastMessage: { $last: '$text' },
          lastMessageTime: { $last: '$createdAt' },
        },
      },
      { $sort: { lastMessageTime: -1 } },
    ]);

    // Populate user details
    const populatedConversations = await Promise.all(
      conversations.map(async (conv) => {
        const user = await require('../models/userModel').findById(conv._id).select('name email');
        return {
          userId: conv._id,
          userName: user?.name,
          userEmail: user?.email,
          lastMessage: conv.lastMessage,
          lastMessageTime: conv.lastMessageTime,
        };
      })
    );

    res.status(200).json(populatedConversations);
  } catch (error) {
    console.error('Error fetching conversations:', error);
    res.status(500).json({ message: 'Server Error fetching conversations' });
  }
};

// @desc    Mark message as read
// @route   PUT /api/messages/:messageId/read
// @access  Private
const markAsRead = async (req, res) => {
  try {
    const { messageId } = req.params;

    const message = await Message.findByIdAndUpdate(
      messageId,
      { isRead: true },
      { new: true }
    );

    if (message) {
      res.status(200).json(message);
    } else {
      res.status(404).json({ message: 'Message not found' });
    }
  } catch (error) {
    console.error('Error marking message as read:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  sendMessage,
  getMessages,
  getConversations,
  markAsRead,
};
