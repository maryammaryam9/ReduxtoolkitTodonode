const mongoose = require('mongoose');
const schema = new mongoose.Schema(
  {
    // image: { type: String, default: '' },
    username: { type: String, default: '' },
    email: { type: String, default: '' },
    password: { type: String, default: '' },
    role: { type: String, default: '' }, // admin , instructor , student
    status: { type: String, default: '1' },
  },
  { timestamps: true },
)

module.exports = mongoose.model('User', schema)
