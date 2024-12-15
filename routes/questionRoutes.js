const express = require('express');
const { check } = require('express-validator');
const {
  addQuestion,
  getQuestions,
  getQuestionById,
  updateQuestion,
  deleteQuestion,
} = require('../controllers/questionController');
const { protect } = require('../middleware/authMiddleware'); // Middleware for authentication

const router = express.Router();

/**
 * @route   POST /api/questions
 * @desc    Add a new question
 * @access  Private
 */
router.post(
  '/',
  protect,
  [
    check('title', 'Question title is required').not().isEmpty(),
    check('content', 'Question content is required').not().isEmpty(),
    check('category', 'Category is required').not().isEmpty(),
  ],
  addQuestion
);

/**
 * @route   GET /api/questions
 * @desc    Get all questions
 * @access  Public
 */
router.get('/', getQuestions);

/**
 * @route   GET /api/questions/:id
 * @desc    Get a specific question by ID
 * @access  Public
 */
router.get('/:id', getQuestionById);

/**
 * @route   PUT /api/questions/:id
 * @desc    Update a question
 * @access  Private
 */
router.put(
  '/:id',
  protect,
  [
    check('title', 'Updated title is required').optional().not().isEmpty(),
    check('content', 'Updated content is required').optional().not().isEmpty(),
    check('category', 'Updated category is required').optional().not().isEmpty(),
  ],
  updateQuestion
);

/**
 * @route   DELETE /api/questions/:id
 * @desc    Delete a question
 * @access  Private
 */
router.delete('/:id', protect, deleteQuestion);

module.exports = router;
