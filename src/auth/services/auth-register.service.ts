import { Request, Response } from 'express';
import { User } from '../../models';
import bcrypt from 'bcryptjs';
import { generateToken } from './auth-generateToken.service';

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({
      email: email,
    }).lean();
    if (user)
      return res.status(400).json({
        success: false,
        message: 'User already exists.',
      });
    const encryptedPassword = await bcrypt.hash(password, 1);
    const createdUser = await User.create({
      email,
      password: encryptedPassword,
    });
    return res.json({
      success: true,
      message: 'User created successfully.',
      token: generateToken({
        _id: createdUser._id,
        email: createdUser.email,
      }),
      user: {
        email,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};
