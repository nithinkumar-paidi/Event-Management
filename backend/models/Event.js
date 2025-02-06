// models/Event.js
import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  features: [{
    type: String
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create models for each event type
const Birthday = mongoose.model('Birthday', eventSchema);
const Wedding = mongoose.model('Wedding', eventSchema);
const Camping = mongoose.model('Camping', eventSchema);
const GameNight = mongoose.model('GameNight', eventSchema);
const Party = mongoose.model('Party', eventSchema);

export {
  Birthday,
  Wedding,
  Camping,
  GameNight,
  Party
};

export default mongoose.model('Event', eventSchema);