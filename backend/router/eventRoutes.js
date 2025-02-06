// routes/eventRoutes.js
import express from 'express';
import { protect } from '../middleware/authMiddleware.js';  // Changed to import named export
import {
  Birthday,
  Wedding,
  Camping,
  GameNight,
  Party
} from '../models/Event.js';

const router = express.Router();

// Generic function to handle CRUD operations for different event types
const createEventRoutes = (Model, eventType) => {
  // Get all events of a specific type
  router.get(`/admin/events/${eventType}`, protect, async (req, res) => {
    try {
      const events = await Model.find();
      res.json(events);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  // Create new event
  router.post(`/admin/events/${eventType}`, protect, async (req, res) => {
    const event = new Model({
      title: req.body.title,
      description: req.body.description,
      imageUrl: req.body.imageUrl,
      price: req.body.price,
      features: req.body.features
    });

    try {
      const newEvent = await event.save();
      res.status(201).json(newEvent);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  // Update event
  router.put(`/admin/events/${eventType}/:id`, protect, async (req, res) => {
    try {
      const event = await Model.findById(req.params.id);
      if (!event) {
        return res.status(404).json({ message: 'Event not found' });
      }

      Object.assign(event, req.body);
      const updatedEvent = await event.save();
      res.json(updatedEvent);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  // Delete event
  router.delete(`/admin/events/${eventType}/:id`, protect, async (req, res) => {
    try {
      const event = await Model.findById(req.params.id);
      if (!event) {
        return res.status(404).json({ message: 'Event not found' });
      }

      await event.deleteOne();
      res.json({ message: 'Event deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
};

// Create routes for each event type
createEventRoutes(Birthday, 'birthdays');
createEventRoutes(Wedding, 'weddings');
createEventRoutes(Camping, 'camping');
createEventRoutes(GameNight, 'gamenights');
createEventRoutes(Party, 'parties');

export default router;