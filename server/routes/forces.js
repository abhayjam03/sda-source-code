const express = require('express');
const router = express.Router();
const Force = require('../models/Force');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// Get all forces
router.get('/', async (req, res) => {
  try {
    const forces = await Force.find().sort('name');
    res.json(forces);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single force
router.get('/:id', async (req, res) => {
  try {
    const force = await Force.findById(req.params.id);
    if (!force) return res.status(404).json({ message: 'Force not found' });
    res.json(force);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create force (admin only)
router.post('/', [auth, admin], async (req, res) => {
  try {
    const force = new Force({
      ...req.body,
      updatedBy: req.user._id
    });
    const newForce = await force.save();
    res.status(201).json(newForce);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update force (admin only)
router.put('/:id', [auth, admin], async (req, res) => {
  try {
    const force = await Force.findById(req.params.id);
    if (!force) return res.status(404).json({ message: 'Force not found' });

    Object.assign(force, {
      ...req.body,
      updatedBy: req.user._id,
      lastUpdated: Date.now()
    });

    const updatedForce = await force.save();
    res.json(updatedForce);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete force (admin only)
router.delete('/:id', [auth, admin], async (req, res) => {
  try {
    const force = await Force.findById(req.params.id);
    if (!force) return res.status(404).json({ message: 'Force not found' });

    await force.deleteOne();
    res.json({ message: 'Force deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 