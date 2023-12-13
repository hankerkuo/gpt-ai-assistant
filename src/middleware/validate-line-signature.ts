import config from '../config/index';
import { validateSignature } from '../utils/index';
import { Request, Response, NextFunction } from 'express';

interface CustomRequest extends Request {
  rawBody?: string;
}

const validateLineSignature = (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  if (config.APP_ENV !== 'production') {
    next();
    return;
  }
  const secret = config.LINE_CHANNEL_SECRET || '';
  const signature = req.header('x-line-signature');
  if (
    !req.rawBody ||
    !signature ||
    !validateSignature(req.rawBody, secret, signature)
  ) {
    res.sendStatus(403);
    return;
  }
  next();
};

export default validateLineSignature;
