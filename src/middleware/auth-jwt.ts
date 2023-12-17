import { Request, Response, NextFunction } from 'express';
import { verifyJwtToken, TJwtData } from '@src/security/jwt';
import { logger } from '@src/utils';

export interface JwtRequest extends Request {
  jwt?: TJwtData;
}

const authJwt = (req: JwtRequest, res: Response, next: NextFunction) => {
  const token = req.headers?.authorization?.split(' ')[1];

  if (!token) {
    logger.info('No token provided');
    return res.status(401).json({ message: 'No token provided' });
  }

  const decodedJwt = verifyJwtToken(token);
  if (!decodedJwt) {
    logger.info('Invalid token');
    return res.status(403).json({ message: 'Invalid token' });
  }
  
  req.jwt = decodedJwt; // Add decoded attribute to the request
  
  // TODO: add authorization logic here
  
  next();
};

export default authJwt;
