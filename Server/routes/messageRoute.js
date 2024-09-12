const express = require('express');
const { sendMessage, getMessages,getUsers } = require('../controllers/messageController');
const { verifyToken } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/sendmessages', verifyToken, sendMessage);
router.get('/getmessages', verifyToken, getMessages);
router.get('/users', verifyToken, getUsers);

module.exports = router;
