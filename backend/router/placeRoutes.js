
// backend/routes/placeRoutes.js
const express = require('express');
const router = express.Router();
const Place = require('../models/Place');
const { protect, adminOnly } = require('../Middleware/authMiddleware');

// Create new place - Admin only
router.post('/', protect, adminOnly, async (req, res) => {
  try {
    const place = new Place(req.body);
    const savedPlace = await place.save();
    res.status(201).json(savedPlace);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all places
router.get('/', async (req, res) => {
  try {
    const places = await Place.find({});
    res.json(places);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update place - Admin only
router.put('/:id', protect, adminOnly, async (req, res) => {
  try {
    const place = await Place.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!place) {
      return res.status(404).json({ message: 'Place not found' });
    }
    res.json(place);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete place - Admin only
router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    const place = await Place.findByIdAndDelete(req.params.id);
    if (!place) {
      return res.status(404).json({ message: 'Place not found' });
    }
    res.json({ message: 'Place deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
