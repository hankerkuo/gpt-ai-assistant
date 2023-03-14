import Event from '../app/models/event.js';
import Context from '../app/context.js';
import { logger } from '../utils/index.js';
import {
  isUserExist,
  getTrialRemainingPrompts,
  grantTrialPrompts,
  decreaseTrialPrompts
} from '../db/service/user-service.js';
import { replyMessage } from '../utils/index.js';

const authLineUser = async (req, res, next) => {
  const event = new Event(req.body.events[0]);
  const context = new Context(event);
  const userId = context.userId;
  logger.info(`Line user id access: ${userId}`);

  if (!(await isUserExist(userId))) {
    logger.info(`Line user: ${userId}, does not exist`);
    replyMessage({
      replyToken: context.replyToken,
      messages: [
        {
          type: 'text',
          text: 'Greetings! From now on you can use this bot for 10 questions every day!',
        },
      ],
    });
    await grantTrialPrompts(userId, 10);
    logger.info(`New user ${userId} Trial privilege granted`);
    res.status(200).send(`New user ${userId} Trial privilege granted`);
    return;
  }

  if ((await getTrialRemainingPrompts(userId)) === 0) {
    //TODO: add 10 prompts trial every day
    logger.info(`Line user: ${userId}, does not have enough trial prompts`);
    replyMessage({
      replyToken: context.replyToken,
      messages: [
        {
          type: 'text',
          text: 'You do not have enough questions to ask, \
            please register or wait until tomorrow!',
        },
      ],
    });
    res.status(403).send('Line user does not have enough trial prompts');
    return;
  }

  decreaseTrialPrompts(userId, 1);
  next();
};

export default authLineUser;
