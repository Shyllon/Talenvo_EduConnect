const mongoose = require('mongoose');

const AnswerSchema = new mongoose.Schema({
    question: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    body: { type: String, required: true },
    upvotes: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Answer', AnswerSchema);
