import Event from '../app/models/event';
import Context from '../app/context';
import { logger } from '../utils/index';
import {
  isUserExist,
  getTrialRemainingPrompts,
  firstTimeGrantTrialPrompts,
  manageTrialPrompts
} from '../db/service/user-service';
import { replyMessage } from '../utils/index';
import { t } from '../locales/index';
import { Request, Response, NextFunction } from 'express';

const authLineUser = async (req: Request, res: Response, next: NextFunction) => {
  let context: Context | null = null;
  await Promise.all(
    req.body.events
      .map((event: {
        type: string,
        replyToken: string,
        source: any,
        message: any,
      }) => new Event(event))
      .filter((event: Event) => event.isMessage)
      .filter((event: Event) => event.isText || event.isAudio)
      .map((event: Event) => new Context(event))
      .map((ctx: Context) => {ctx.initialize(); context=ctx}),
  )
  if (!context) {
    next();
    return;
  }

  const userId = (context as Context).userId;

  logger.info(`Line user id access: ${userId}`);

  if (!(await isUserExist(userId))) {
    logger.info(`Line user: ${userId}, does not exist`);
    replyMessage({
      replyToken: (context as Context).replyToken,
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
      replyToken: (context as Context).replyToken,
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
