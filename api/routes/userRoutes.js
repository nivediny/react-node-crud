const express = require('express');
const userModel = require('../models/userModel');
const router = express.Router();

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await userModel.getAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Get user by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await userModel.getUserById(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

// Create a new user
router.post('/', async (req, res) => {
  try {
   
    const newUser = await userModel.createUser(req.body);
    res.status(201).json({ id: newUser });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create user' });
  }
});

// Update a user
router.put('/:id', async (req, res) => {
  try {
    await userModel.updateUser(req.params.id, req.body);
    res.json({ message: 'User updated successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update user' });
  }
});

// Delete a user
router.delete('/:id', async (req, res) => {
  try {
    await userModel.deleteUser(req.params.id);
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

module.exports = router;
