const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  rank: {
    type: Number,
    default: 0,
  },
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
