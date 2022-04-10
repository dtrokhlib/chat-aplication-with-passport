import { Model, Document } from 'mongoose';

export interface IUser {
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  passwordHashed: string;
  avatar?: Buffer;
  tokens?: [{ token: string }];
}

export interface IUserDocument extends Document {
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  passwordHashed: string;
  avatar?: Buffer;
  tokens?: [{ token: string }];
}

export interface IUserModel extends Model<IUserDocument> {
  build: (data: IUser) => any;
  comparePasswords: (password: string, passwordHashed: string) => Promise<boolean>;
  tokenGenerate: () => any;
}
