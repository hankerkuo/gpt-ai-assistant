import config from '../config/index';
if (config.APP_ENV === 'production') {
  require('module-alias/register');
}
import express from 'express';
import { handleEvents, printPrompts } from '@src/app/index';
import { validateLineSignature, authLineUser } from '@src/middleware/index';
import storage from '@src/storage/index';
import { fetchVersion, getVersion } from '@src/utils/index';
import { IncomingMessage, ServerResponse } from 'http';

import { ServicePool } from '@src/petner';

const app = express();

interface CustomIncomingMessage extends IncomingMessage {
  rawBody?: string;
}

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
        console.error(err.message);
      } else {
        console.error(err);
      }
      res.sendStatus(500);
    }
    if (config.APP_DEBUG) printPrompts();
  },
);

app.post('/petner', async (req, res) => {
  try {
    const behaviorAnalyzer = ServicePool.getBehaviorAnalyzer(req);
    // TODO: type the request body
    console.log(req.body);
    const { message } = req.body;

    const { text } = message;
    const response = await behaviorAnalyzer.getAssistentResponse(text);
    res.status(200).send({ response });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

if (config.APP_PORT) {
  app.listen(config.APP_PORT);
}

export default app;
