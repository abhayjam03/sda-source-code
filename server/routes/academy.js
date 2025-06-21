const express = require('express');
const Academy = require('../models/Academy');
const { auth, adminAuth } = require('../middleware/auth');

const router = express.Router();

// Get academy information (public)
router.get('/', async (req, res) => {
  try {
    const academy = await Academy.findOne();
    res.json(academy);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching academy information' });
  }
});

// Update academy information (admin only)
router.put('/', adminAuth, async (req, res) => {
  try {
    const updates = req.body;
    updates.lastUpdated = new Date();
    updates.updatedBy = req.user._id;

    const academy = await Academy.findOneAndUpdate(
      {},
      updates,
      { new: true, runValidators: true }
    );

    if (!academy) {
      return res.status(404).json({ message: 'Academy information not found' });
    }

    res.json(academy);
  } catch (error) {
    res.status(500).json({ message: 'Error updating academy information' });
  }
});

// Create initial academy information (admin only)
router.post('/', adminAuth, async (req, res) => {
  try {
    const existingAcademy = await Academy.findOne();
    if (existingAcademy) {
      return res.status(400).json({ message: 'Academy information already exists' });
    }

    const academy = new Academy({
      ...req.body,
      updatedBy: req.user._id
    });

    await academy.save();
    res.status(201).json(academy);
  } catch (error) {
    res.status(500).json({ message: 'Error creating academy information' });
  }
});

module.exports = router; 