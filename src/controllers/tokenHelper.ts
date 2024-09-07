import jwt from 'jsonwebtoken';
import { User } from '@prisma/client';

const generateTokenPayload = (user: User) => ({
  id: user.id,
  email: user.email,
  username:
    `${user.firstName}${user.middleName ? ' ' + user.middleName + ' ' : ' '}${user.lastName}`.trim(),
});

export const generateAccessToken = (user: User) =>
  jwt.sign(generateTokenPayload(user), process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

export const generateRefreshToken = (user: User) =>
  jwt.sign(generateTokenPayload(user), process.env.REFRESH_JWT_SECRET!, {
    expiresIn: process.env.REFRESH_JWT_EXPIRES_IN,
  });
