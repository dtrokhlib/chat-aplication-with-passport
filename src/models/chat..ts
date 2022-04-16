import mongoose, { Schema } from 'mongoose';
import { IChat, IChatDocument, IChatModel } from './interfaces/chat.interface';
import { chatRole } from './types/chat-role';
import { chatType } from './types/chat-type';
const ObjectId = Schema.Types.ObjectId;

const chatSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    participants: [
      {
        userId: {
          type: ObjectId,
          ref: 'User',
          required: true,
        },
        role: {
          type: String,
          enum: chatRole,
        },
      },
    ],
    type: {
      type: String,
      enum: chatType,
    },
    isDeleted: Boolean,
  },
  { timestamps: true }
);

chatSchema.statics.build = (data: IChat) => {
  return new Chat(data);
};

export const Chat = mongoose.model<IChatDocument, IChatModel>(
  'Chat',
  chatSchema
);
