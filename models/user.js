const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    badges: { type: [String], default: [] },
    role: { type: String, enum: ['student', 'admin'], default: 'student' },
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
