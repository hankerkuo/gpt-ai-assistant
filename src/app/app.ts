import { replyMessage } from '../utils/index';
import {
  activateHandler,
  commandHandler,
  continueHandler,
  deactivateHandler,
  deployHandler,
  docHandler,
  drawHandler,
  forgetHandler,
  enquireHandler,
  issueReportHandler,
  reportHandler,
  retryHandler,
  searchHandler,
  talkHandler,
  versionHandler,
} from './handlers/index';
import Context from './context';
import Event from './models/event';

/**
 * @param {Context} context
 * @returns {Promise<Context>}
 */
const handleContext = async (context: Context) =>
  activateHandler(context) ||
  commandHandler(context) ||
  continueHandler(context) ||
  deactivateHandler(context) ||
  deployHandler(context) ||
  docHandler(context) ||
  drawHandler(context) ||
  forgetHandler(context) ||
  enquireHandler(context) ||
  (await issueReportHandler(context)) ||
  reportHandler(context) ||
  retryHandler(context) ||
  searchHandler(context) ||
  versionHandler(context) ||
  talkHandler(context) ||
  context;

const handleEvents = async (events = []) => {
  const initializedContexts = await Promise.all(
    events
      .map((event) => new Event(event))
      .filter((event) => event.isMessage)
      .filter((event) => event.isText || event.isAudio)
      .map((event) => new Context(event))
      .map((context) => context.initialize()),
  );

  const handledContexts: Context[] = [];
  for (const context of initializedContexts) {
    handledContexts.push(await handleContext(context));
  }

  return Promise.all(
    handledContexts
      .filter((context) => context.messages.length > 0)
      .map((context) => replyMessage(context)),
  );
};

export default handleEvents;
