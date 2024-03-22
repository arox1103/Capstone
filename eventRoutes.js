const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const auth = require('../middleware/auth');

// Create Event
router.post('/', auth, async (req, res) => {
    const {
        title,
        description,
        date,
        time,
        location,
        category,
        capacity,
        registrationDeadline
    } = req.body;

    try {
        const event = new Event({
            title,
            description,
            date,
            time,
            location,
            category,
            capacity,
            registrationDeadline,
            creator: req.user.id // Assuming user ID is stored in req.user.id after authentication
        });

        await event.save();
        res.json(event);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Get All Events
router.get('/', async (req, res) => {
    try {
        const events = await Event.find().populate('creator', 'email'); // Populate creator's email
        res.json(events);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Get Event by ID
router.get('/:id', async (req, res) => {
    try {
        const event = await Event.findById(req.params.id).populate('creator', 'email'); // Populate creator's email
        if (!event) {
            return res.status(404).json({ msg: 'Event not found' });
        }
        res.json(event);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Update Event
router.put('/:id', auth, async (req, res) => {
    // Check if user is the creator of the event
    try {
        let event = await Event.findById(req.params.id);

        if (!event) {
            return res.status(404).json({ msg: 'Event not found' });
        }

        if (event.creator.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        // Update fields
        event = await Event.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });

        res.json(event);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Delete Event
router.delete('/:id', auth, async (req, res) => {
    // Check if user is the creator of the event
    try {
        const event = await Event.findById(req.params.id);

        if (!event) {
            return res.status(404).json({ msg: 'Event not found' });
        }

        if (event.creator.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        await event.remove();
        res.json({ msg: 'Event removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
