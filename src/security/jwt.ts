import jwt from 'jsonwebtoken';
import crypto from 'crypto';

import config from '@src/config';

export type TJwtData = {
  deviceId: string;
  userId: string;
  username: string;
  roles: string[];
};

/**
 * Generates a JWT secret.
 * @returns {string} The generated JWT secret.
 */
const generateJwtSecret = (): string => {
  const secret = crypto.randomBytes(32).toString('hex');
  return secret;
};

/**
 * Retrieves the JWT secret from ENV.
 * @returns The JWT secret.
 * @throws {Error} If the JWT secret is not defined.
 */
const getJwtSecret = (): string => {
  const secret = config.JWT_SECRET;
  if (!secret) throw new Error('JWT secret is not defined');
  return secret;
}

const signJwtToken = (data: TJwtData): string => {
  const secret = getJwtSecret();
  const token = jwt.sign(data, secret, { expiresIn: config.JWT_EXPIRES_IN });
  return token;
};

const verifyJwtToken = (token: string): TJwtData | null => {
  const secret = getJwtSecret();
  try {
    const decoded = jwt.verify(token, secret) as TJwtData;
    return decoded;
  } catch (error) {
    return null;
  }
};

export { generateJwtSecret, signJwtToken, verifyJwtToken };
