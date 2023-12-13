import { COMMAND_SYS_REPORT, GENERAL_COMMANDS } from '../commands/index';
import Context from '../context';
import { updateHistory } from '../history/index';
import { setChatMode } from '@src/db/service/chat-mode-service';
import logger from '@src/utils/logger';

/**
 * @param {Context} context
 * @returns {boolean}
 */
const enterReportMode = (context: Context) =>
  context.hasCommand(COMMAND_SYS_REPORT);

/**
 * @param {Context} context
 * @returns {Promise<Context>}
 */
const exec = (context: Context) => {
  let handlerResult =
    enterReportMode(context) &&
    (async () => {
      logger.info('user: ', context.id, ' entered report mode');
      updateHistory(context.id, (history) => history.erase());
      context.pushText(COMMAND_SYS_REPORT.reply, GENERAL_COMMANDS);
      await setChatMode(context.id, 'REPORT');
      return context;
    })();

  return handlerResult;
};

export default exec;
