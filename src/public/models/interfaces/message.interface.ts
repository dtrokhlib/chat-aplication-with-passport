import { Model, Document } from 'mongoose';

export interface IMessage {
  chatId: string;
  userId: string;
  message: string;
  date: Date;
  isDeleted?: boolean;
}

export interface IMessageDocument extends Document {
  chatId: string;
  userId: string;
  message: string;
  date: Date;
  isDeleted?: boolean;
}

export interface IMessageModel extends Model<IMessageDocument> {
  build: (data: IMessage) => any;
}
