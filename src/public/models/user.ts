import mongoose, { Schema } from 'mongoose';

const ObjectId = mongoose.Types.ObjectId;

const userSchema = new Schema({
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
});

