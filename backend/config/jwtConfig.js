// backend/config/jwtConfig.js
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || 'event_management_secret_key_2024';

module.exports = {
  JWT_SECRET,
  JWT_EXPIRES_IN: '30d' // Token expires in 30 days
};