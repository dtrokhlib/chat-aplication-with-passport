import { Model, Document } from 'mongoose';
import { chatRole } from '../types/chat-role';
import { chatType } from '../types/chat-type';

export interface IChat {
  name: string;
  participants: [
    {
      userId: string;
      role: chatRole;
    }
  ];
  type: chatType;
  avatar?: Buffer;
  lastMessage?: {
    text: string;
    time: string;
  },
  isDeleted?: boolean;
}

export interface IChatDocument extends Document {
  name: string;
  participants: [
    {
      userId: string;
      role: chatRole;
    }
  ];
  type: chatType;
  avatar?: Buffer;
  lastMessage?: {
    text: string;
    time: string;
  };
  isDeleted?: boolean;
}

export interface IChatModel extends Model<IChatDocument> {
  build: (data: IChat) => any;
}