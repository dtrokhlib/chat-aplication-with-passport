import mongoose, { Schema } from 'mongoose';
import { isModifier } from 'typescript';
import { IUser, IUserDocument, IUserModel } from './interfaces/user.interface';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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
    password: {
      type: String,
      required: false,
    },
    avatar: {
      type: Buffer,
      required: false,
    },
    tokens: [
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

userSchema.statics.comparePasswords = async (
  password: string,
  passwordHashed: string | undefined
) => {
  const match = await bcrypt.compare(password, passwordHashed || '');
  return match;
};

userSchema.pre('save', async function () {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS || 10));
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
  }
});

userSchema.methods.tokenGenerate = async function () {
  const token = await jwt.sign(
    { id: this.id, email: this.email },
    process.env.JWT_SECRET!,
    { expiresIn: '1d' }
  );

  return token;
};

export const User = mongoose.model<IUserDocument, IUserModel>(
  'User',
  userSchema
);
