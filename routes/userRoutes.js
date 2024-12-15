const express = require('express');
const { check } = require('express-validator');
const {
  registerUser,
  getUsers,
  loginUser,
  getUserProfile,
  updateUserProfile,
  deleteUser, 
  changePassword
} = require('../controllers/userController');
const { protect, admin } = require('../middleware/authMiddleware'); // Middleware for authentication and role-based access

const router = express.Router();

/**
 * @route   POST /api/users/register
 * @desc    Register a new user
 * @access  Public
 */
router.post(
  '/register',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
  ],
  registerUser
);

/**
 * @route   POST /api/users/login
 * @desc    User login
 * @access  Public
 */
router.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  loginUser
);

/**
 * @route   GET /api/users/profile
 * @desc    Get user profile
 * @access  Private
 */
router.get('/profile', protect, getUserProfile);

/**
 * @route   PUT /api/users/profile
 * @desc    Update user profile
 * @access  Private
 */
router.put(
  '/profile',
  protect,
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be at least 6 characters').optional().isLength({ min: 6 }),
  ],
  updateUserProfile
);

/**
 * @route   GET /api/users
 * @desc    Get all users
 * @access  Private/Admin
 */
router.get('/', protect, admin, getUsers);

router.delete('/:id', protect, admin, deleteUser);

/**
 * @route   DELETE /api/users
 * @desc    Delete a user by ID
 * @access  Private/Admin
 */
router.delete('/:id', protect, admin, deleteUser); // Delete user (requires admin or self-deletion logic)

/**
 * @route   PUT /api/users/change-password
 * @desc    Change the user's password
 * @access  Private
 */
router.put('/change-password', protect,
  [
    check('oldPassword', 'Old password is required').not().isEmpty(),
    check('newPassword', 'New password must be at least 6 characters').isLength({ min: 6 }),
  ],
  changePassword
);

module.exports = router;
