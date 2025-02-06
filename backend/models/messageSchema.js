// 2. Fix the messageSchema.js model export
import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
}, { timestamps: true });

export const Message = mongoose.model('Message', messageSchema);
export default Message;