import mongoose, { Schema } from 'mongoose';
import {
  IMessage,
  IMessageDocument,
  IMessageModel,
} from './interfaces/message.interface';

const ObjectId = Schema.Types.ObjectId;

const messageSchema = new Schema({
  chatId: {
    type: ObjectId,
    ref: 'Chat',
    required: true,
  },
  userId: {
    type: ObjectId,
    ref: 'User',
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  isDeleted: Boolean,
});

messageSchema.statics.build = (data: IMessage) => {
  return new Message(data);
};

export const Message = mongoose.model<IMessageDocument, IMessageModel>(
  'Message',
  messageSchema
);
