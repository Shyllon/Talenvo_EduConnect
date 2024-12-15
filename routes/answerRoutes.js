const express = require('express');
const { check } = require('express-validator');
const {
  addAnswer,
  getAnswers,
  updateAnswer,
  deleteAnswer,
} = require('../controllers/answerController');
const { protect } = require('../middleware/authMiddleware'); // Middleware for authentication

const router = express.Router();

/**
 * @route   POST /api/answers
 * @desc    Add an answer to a specific question
 * @access  Private
 */
router.post(
  '/',
  protect,
  [check('content', 'Answer content is required').not().isEmpty()],
  addAnswer
);

/**
 * @route   GET /api/answers/:questionId
 * @desc    Get all answers for a specific question
 * @access  Public
 */
router.get('/:questionId', getAnswers);

/**
 * @route   PUT /api/answers/:answerId
 * @desc    Update an answer
 * @access  Private
 */
router.put(
  '/:answerId',
  protect,
  [check('content', 'Updated content is required').not().isEmpty()],
  updateAnswer
);

/**
 * @route   DELETE /api/answers/:answerId
 * @desc    Delete an answer
 * @access  Private
 */
router.delete('/:answerId', protect, deleteAnswer);

module.exports = router;
