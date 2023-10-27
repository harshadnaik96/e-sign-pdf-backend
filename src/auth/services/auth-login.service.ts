import { Request, Response } from 'express';
import { User } from '../../models';
import bcrypt from 'bcryptjs';
import { generateToken } from './auth-generateToken.service';

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({
      email: email,
    }).lean();
    if (!user)
      return res.status(400).json({
        success: false,
        message: 'User does not exists.',
      });
    const checkPassword = await bcrypt.compare(password, user.password);
    if (checkPassword) {
      return res.json({
        success: true,
        message: 'Logged in successfully.',
        user: {
          email: user.email,
        },
        token: generateToken({
          _id: user._id,
          email: user.email,
        }),
      });
    } else {
      return res.status(400).json({
        success: false,
        message: 'Invalid credentials.',
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};
