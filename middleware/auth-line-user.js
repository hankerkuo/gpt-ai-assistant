import Event from '../app/models/event.js';
import Context from '../app/context.js';
import { logger } from '../utils/index.js';
import {
  isUserExist,
  getTrialRemainingPrompts,
  firstTimeGrantTrialPrompts,
  manageTrialPrompts
} from '../db/service/user-service.js';
import { replyMessage } from '../utils/index.js';
import { t } from '../locales/index.js';

const authLineUser = async (req, res, next) => {
  let context = null;
  await Promise.all(
    req.body.events
      .map((event) => new Event(event))
      .filter((event) => event.isMessage)
      .filter((event) => event.isText || event.isAudio)
      .map((event) => new Context(event))
      .map((ctx) => {ctx.initialize(); context=ctx}),
  )
  if (!context) {
    next();
    return;
  }

  const userId = context.userId;
  logger.info(`Line user id access: ${userId}`);

  if (!(await isUserExist(userId))) {
    logger.info(`Line user: ${userId}, does not exist`);
    replyMessage({
      replyToken: context.replyToken,
      messages: [
        {
          type: 'text',
          text: t('__MESSAGE_GREETING_WORDS'),
        },
      ],
    });
    await firstTimeGrantTrialPrompts(userId, 10);
    logger.info(`New user ${userId} Trial privilege granted`);
    res.status(200).send(`New user ${userId} Trial privilege granted`);
    return;
  }

  await manageTrialPrompts(userId);

  if ((await getTrialRemainingPrompts(userId)) === 0) {
    logger.info(`Line user: ${userId}, does not have enough trial prompts`);
    replyMessage({
      replyToken: context.replyToken,
      messages: [
        {
          type: 'text',
          text: t('__MESSAGE_QUOTA_EXCEEDED'),
        },
      ],
    });
    res.status(403).send('Line user does not have enough trial prompts');
    return;
  }

  next();
};

export default authLineUser;
