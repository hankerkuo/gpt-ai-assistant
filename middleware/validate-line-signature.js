import config from '../config/index.js';
import { validateSignature } from '../utils/index.js';

const validateLineSignature = (req, res, next) => {
  if(config.APP_ENV !== 'production') {
    next();
    return;
  }
  const secret = config.LINE_CHANNEL_SECRET || '';
  const signature = req.header('x-line-signature');
  if (!validateSignature(req.rawBody, secret, signature)) {
    res.sendStatus(403);
    return;
  }
  next();
};

export default validateLineSignature;
