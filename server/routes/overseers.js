const express = require('express');
const router = express.Router();
const Overseer = require('../models/Overseer');

// Register Overseer
router.post('/register', async (req, res) => {
  const { name, contact, email, address, familyCount, aadharImage, location } = req.body;
  try {
    const existing = await Overseer.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Already registered' });

    const overseer = new Overseer({
      name, contact, email, address, familyCount, aadharImage, location
    });
    await overseer.save();

    // TODO: Trigger approval email here

    res.status(201).json({ message: 'Overseer registered. Awaiting approval.' });
  } catch (err) {
    res.status(500).json({ message: 'Error registering overseer' });
  }
});

// Get approved overseers near location
router.post('/find', async (req, res) => {
  const { lat, lng } = req.body;

  try {
    const overseers = await Overseer.find({ approved: true });

    const sorted = overseers
      .filter(o => o.location && o.location.lat && o.location.lng)
      .map(o => ({
        ...o._doc,
        distance: Math.sqrt(
          Math.pow(lat - o.location.lat, 2) + Math.pow(lng - o.location.lng, 2)
        ),
      }))
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 3);

    res.json(sorted);
  } catch (err) {
    res.status(500).json({ message: 'Error finding overseers' });
  }
});

module.exports = router;
