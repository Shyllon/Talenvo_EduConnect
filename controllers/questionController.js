const asyncHandler = require('express-async-handler');
const Question = require('../models/question'); // Replace with your actual Question model

// Add a new question
const addQuestion = asyncHandler(async (req, res) => {
  const { title, content, category } = req.body;

  if (!title || !content || !category) {
    res.status(400);
    throw new Error('All fields are required');
  }

  const question = await Question.create({
    title,
    content,
    category,
    user: req.user.id, // Attach the user who created the question
  });

  res.status(201).json(question);
});

// Get all questions
const getQuestions = asyncHandler(async (req, res) => {
  const questions = await Question.find().populate('user', 'name').populate('category');
  res.json(questions);
});

// Get a specific question by ID
const getQuestionById = asyncHandler(async (req, res) => {
  const question = await Question.findById(req.params.id).populate('user', 'name').populate('category');

  if (!question) {
    res.status(404);
    throw new Error('Question not found');
  }

  res.json(question);
});

// Update a question
const updateQuestion = asyncHandler(async (req, res) => {
  const question = await Question.findById(req.params.id);

  if (!question) {
    res.status(404);
    throw new Error('Question not found');
  }

  // Ensure the user is the owner of the question
  if (question.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Not authorized to update this question');
  }

  const updatedFields = {
    title: req.body.title || question.title,
    content: req.body.content || question.content,
    category: req.body.category || question.category,
  };

  Object.assign(question, updatedFields);

  const updatedQuestion = await question.save();
  res.json(updatedQuestion);
});

// Delete a question
const deleteQuestion = asyncHandler(async (req, res) => {
  const question = await Question.findById(req.params.id);

  if (!question) {
    res.status(404);
    throw new Error('Question not found');
  }

  // Ensure the user is the owner of the question
  if (question.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Not authorized to delete this question');
  }

  await question.remove();
  res.json({ message: 'Question removed' });
});

module.exports = {
  addQuestion,
  getQuestions,
  getQuestionById,
  updateQuestion,
  deleteQuestion,
};
