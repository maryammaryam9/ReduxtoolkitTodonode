const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    todo: { type: String, required: true},
    todoBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    status:{type: String, default:'1'}
  },
  { timestamps: true },
)

module.exports = mongoose.model('TODO', schema);
