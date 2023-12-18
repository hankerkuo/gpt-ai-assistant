import config from '../config/index';
if (config.APP_ENV === 'production') {
  require('module-alias/register');
}
import express from 'express';
import { handleEvents, printPrompts } from '@src/app/index';
import {
  validateLineSignature,
  authLineUser,
  authJwt,
} from '@src/middleware/index';
import storage from '@src/storage/index';
import { fetchVersion, getVersion, logger } from '@src/utils/index';
import { IncomingMessage, ServerResponse } from 'http';

import { ServicePool } from '@src/petner';

const app = express();

interface CustomIncomingMessage extends IncomingMessage {
  rawBody?: string;
}

type TPetnerReqBody = {
  message: {
    text: string;
  };
};

app.use(
  express.json({
    verify: (req: CustomIncomingMessage, res: ServerResponse, buf: Buffer) => {
      req.rawBody = buf.toString();
    },
  }),
);

app.get('/', (req, res) => {
  if (config.APP_URL) {
    res.redirect(config.APP_URL);
    return;
  }
  res.sendStatus(200);
});

app.get('/info', async (req, res) => {
  const currentVersion = getVersion();
  const latestVersion = await fetchVersion();
  res.status(200).send({ currentVersion, latestVersion });
});

app.post(
  config.APP_WEBHOOK_PATH,
  validateLineSignature,
  authLineUser,
  async (req, res) => {
    try {
      await storage.initialize();
      await handleEvents(req.body.events);
      res.sendStatus(200);
    } catch (err) {
      if (err instanceof Error) {
        logger.error(err.message);
      } else {
        logger.error(err);
      }
      res.sendStatus(500);
    }
    if (config.APP_DEBUG) printPrompts();
  },
);

app.post('/petner', authJwt, async (req, res) => {
  try {
    const behaviorAnalyzer = ServicePool.getBehaviorAnalyzer(req);
    const body: TPetnerReqBody = req.body;
    const response = await behaviorAnalyzer.getAssistantResponse(
      body.message.text,
    );
    res.status(200).send({ response });
  } catch (error) {
    logger.error(error);
    res.sendStatus(500);
  }
});

if (config.APP_PORT) {
  app.listen(config.APP_PORT);
}

export default app;
