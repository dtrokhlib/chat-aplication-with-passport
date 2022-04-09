import mongoose, { Schema } from 'mongoose';
import { isModifier } from 'typescript';
import { IUser, IUserDocument, IUserModel } from './interfaces/user.interface';
import bcrypt from 'bcrypt';

const ObjectId = mongoose.Types.ObjectId;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    passwordHashed: {
      type: String,
      required: true,
    },
    avatar: {
      type: Buffer,
      required: false,
    },
    token: [
      {
        token: String,
      },
    ],
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret.id;
        delete ret._id;
        delete ret.passwordHashed;
        delete ret.token;
      },
    },
  }
);

userSchema.statics.build = (data: IUser) => {
  return new User(data);
};

userSchema.methods.comparePasswords = async (
  password: string,
  hashedPassword: string
) => {
  const match = await bcrypt.compare(password, hashedPassword);
  return match;
};

userSchema.pre('save', async function (next) {
  const user = this;

  if (!user.isModified('passwordHashed')) {
    return next();
  }

  user.passwordHashed = await bcrypt.hash(
    user.passwordHashed,
    process.env.HASH_ROUNDS || 8
  );
});

export const User = mongoose.model<IUserDocument, IUserModel>(
  'User',
  userSchema
);
