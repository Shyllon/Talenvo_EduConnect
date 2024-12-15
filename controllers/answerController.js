const asyncHandler = require('express-async-handler');
const Answer = require('../models/answer'); // Replace with your actual Answer model

// Add an answer
const addAnswer = asyncHandler(async (req, res) => {
  const { content, questionId } = req.body;

  if (!content || !questionId) {
    res.status(400);
    throw new Error('Answer content and question ID are required');
  }

  const answer = await Answer.create({
    content,
    question: questionId,
    user: req.user.id, // Attach the user who created the answer
  });

  res.status(201).json(answer);
});

// Get all answers for a specific question
const getAnswers = asyncHandler(async (req, res) => {
  const answers = await Answer.find({ question: req.params.questionId }).populate('user', 'name');
  res.json(answers);
});

// Update an answer
const updateAnswer = asyncHandler(async (req, res) => {
  const answer = await Answer.findById(req.params.answerId);

  if (!answer) {
    res.status(404);
    throw new Error('Answer not found');
  }

  // Ensure the user is the owner of the answer
  if (answer.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Not authorized to update this answer');
  }

  answer.content = req.body.content || answer.content;

  const updatedAnswer = await answer.save();
  res.json(updatedAnswer);
});

// Delete an answer
const deleteAnswer = asyncHandler(async (req, res) => {
  const answer = await Answer.findById(req.params.answerId);

  if (!answer) {
    res.status(404);
    throw new Error('Answer not found');
  }

  // Ensure the user is the owner of the answer
  if (answer.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Not authorized to delete this answer');
  }

  await answer.remove();
  res.json({ message: 'Answer removed' });
});

module.exports = {
  addAnswer,
  getAnswers,
  updateAnswer,
  deleteAnswer,
};
