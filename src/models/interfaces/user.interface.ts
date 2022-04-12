import { Model, Document } from 'mongoose';

export interface IUser {
  username: string;
  firstName: string;
  lastName: string;
  password?: string;
  avatar?: string;
}

export interface IUserDocument extends Document {
  username: string;
  firstName: string;
  lastName: string;
  password?: string;
  avatar?: string;
}

export interface IUserModel extends Model<IUserDocument> {
  build: (data: IUser) => any;
  comparePasswords: (password: string, passwordHashed: string) => Promise<boolean>;
  tokenGenerate: () => any;
}
