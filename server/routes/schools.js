const express = require('express');
const router = express.Router();
const School = require('../models/School');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// Get all schools
router.get('/', async (req, res) => {
  try {
    const schools = await School.find().sort('name');
    res.json(schools);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single school
router.get('/:id', async (req, res) => {
  try {
    const school = await School.findById(req.params.id);
    if (!school) return res.status(404).json({ message: 'School not found' });
    res.json(school);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create school (admin only)
router.post('/', [auth, admin], async (req, res) => {
  try {
    const school = new School({
      ...req.body,
      updatedBy: req.user._id
    });
    const newSchool = await school.save();
    res.status(201).json(newSchool);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update school (admin only)
router.put('/:id', [auth, admin], async (req, res) => {
  try {
    const school = await School.findById(req.params.id);
    if (!school) return res.status(404).json({ message: 'School not found' });

    Object.assign(school, {
      ...req.body,
      updatedBy: req.user._id,
      lastUpdated: Date.now()
    });

    const updatedSchool = await school.save();
    res.json(updatedSchool);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete school (admin only)
router.delete('/:id', [auth, admin], async (req, res) => {
  try {
    const school = await School.findById(req.params.id);
    if (!school) return res.status(404).json({ message: 'School not found' });

    await school.deleteOne();
    res.json({ message: 'School deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 