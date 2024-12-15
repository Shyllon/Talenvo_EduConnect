const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    subject: { type: String, required: true },
    title: { type: String, required: true },
    body: { type: String, required: true },
    answers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Answer' }],
}, { timestamps: true });

module.exports = mongoose.model('Question', QuestionSchema);
