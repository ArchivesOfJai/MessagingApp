const express = require('express');
const { sendMessage, getMessages } = require('../controllers/messageController');
const { verifyToken } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/message', verifyToken, sendMessage);
router.get('/messages', verifyToken, getMessages);

module.exports = router;
