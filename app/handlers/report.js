import { COMMAND_SYS_REPORT, GENERAL_COMMANDS } from '../commands/index.js';
import Context from '../context.js';
import { updateHistory } from '../history/index.js';
import { setChatMode } from '../../db/service/chat-mode-service.js';
import logger from '../../utils/logger.js';

/**
 * @param {Context} context
 * @returns {boolean}
 */
const enterReportMode = (context) => context.hasCommand(COMMAND_SYS_REPORT);

/**
 * @param {Context} context
 * @returns {Promise<Context>}
 */
const exec = (context) => {
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
