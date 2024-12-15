const Category = require('../models/category'); // Import your Category model
const asyncHandler = require('express-async-handler'); // Async handler for async route functions

// @desc    Create a new category
// @route   POST /api/categories
// @access  Private
const createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;

  // Check if category already exists
  const categoryExists = await Category.findOne({ name });
  if (categoryExists) {
    res.status(400);
    throw new Error('Category already exists');
  }

  // Create new category
  const category = await Category.create({
    name,
  });

  if (category) {
    res.status(201).json({
      message: 'Category created successfully',
      category,
    });
  } else {
    res.status(400);
    throw new Error('Invalid category data');
  }
});

// @desc    Get all categories
// @route   GET /api/categories
// @access  Public
const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find();

  if (categories) {
    res.status(200).json(categories);
  } else {
    res.status(404);
    throw new Error('No categories found');
  }
});

// @desc    Get a category by ID
// @route   GET /api/categories/:id
// @access  Public
const getCategoryById = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (category) {
    res.status(200).json(category);
  } else {
    res.status(404);
    throw new Error('Category not found');
  }
});

// @desc    Update a category
// @route   PUT /api/categories/:id
// @access  Private
const updateCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;

  // Find the category by ID
  const category = await Category.findById(req.params.id);

  if (category) {
    // Update category
    category.name = name || category.name;

    const updatedCategory = await category.save();
    res.status(200).json(updatedCategory);
  } else {
    res.status(404);
    throw new Error('Category not found');
  }
});

// @desc    Delete a category
// @route   DELETE /api/categories/:id
// @access  Private
const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (category) {
    await category.remove();
    res.status(200).json({ message: 'Category removed' });
  } else {
    res.status(404);
    throw new Error('Category not found');
  }
});

module.exports = {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
