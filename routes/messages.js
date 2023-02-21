const express = require('express');
const router = express.Router();
const Message = require('../models/message');

// Get all messages
router.get('/', async (req, res) => {
  try {
    const messages = await Message.find();
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get one message
router.get('/:id', getMessage, (req, res) => {
  res.json(res.message);
});

// Create one message
router.post('/', async (req, res) => {
  const message = new Message({
    text: req.body.text,
    category: req.body.category,
    rank: 0,
  });

  try {
    const newMessage = await message.save();
    res.status(201).json(newMessage);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update one message
router.patch('/:id', getMessage, async (req, res) => {
  if (req.body.text != null) {
    res.message.text = req.body.text;
  }
  if (req.body.category != null) {
    res.message.category = req.body.category;
  }

  try {
    const updatedMessage = await res.message.save();
    res.json(updatedMessage);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete one message
router.delete('/:id', getMessage, async (req, res) => {
  try {
    await res.message.remove();
    res.json({ message: 'Message deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getMessage(req, res, next) {
  let message;
  try {
    message = await Message.findById(req.params.id);
    if (message == null) {
      return res.status(404).json({ message: 'Cannot find message' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.message = message;
  next();
}

module.exports = router;
