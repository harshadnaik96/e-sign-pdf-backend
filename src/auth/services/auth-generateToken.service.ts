import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';

export const generateToken = (user: { email: string; _id: Types.ObjectId }) => {
  return jwt.sign(
    {
      user,
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: '1d',
    }
  );
};
