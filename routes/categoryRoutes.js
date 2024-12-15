const express = require('express');
const { check } = require('express-validator');
const {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require('../controllers/categoryController');
const { protect } = require('../middleware/authMiddleware'); // Middleware for authentication

const router = express.Router();

/**
 * @route   POST /api/categories
 * @desc    Create a new category
 * @access  Private
 */
router.post(
  '/',
  protect,
  [check('name', 'Category name is required').not().isEmpty()],
  createCategory
);

/**
 * @route   GET /api/categories
 * @desc    Get all categories
 * @access  Public
 */
router.get('/', getCategories);

/**
 * @route   GET /api/categories/:id
 * @desc    Get a specific category by ID
 * @access  Public
 */
router.get('/:id', getCategoryById);

/**
 * @route   PUT /api/categories/:id
 * @desc    Update a category
 * @access  Private
 */
router.put(
  '/:id',
  protect,
  [check('name', 'Updated category name is required').not().isEmpty()],
  updateCategory
);

/**
 * @route   DELETE /api/categories/:id
 * @desc    Delete a category
 * @access  Private
 */
router.delete('/:id', protect, deleteCategory);

module.exports = router;
