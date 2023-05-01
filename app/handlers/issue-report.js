import {
  COMMAND_SYS_REPORT_FINISH,
  GENERAL_COMMANDS,
} from '../commands/index.js';
import Context from '../context.js';
import { updateHistory } from '../history/index.js';
import { getChatMode } from '../../db/service/chat-mode-service.js';
import { handleUserReport } from '../../db/service/report-service.js';
import logger from '../../utils/logger.js';

/**
 * @param {Context} context
 * @returns {boolean}
 */
const inReportMode = async (context) =>{
  return (await getChatMode(context.id)) === 'REPORT';
}
  

/**
 * @param {Context} context
 * @returns {Promise<Context>}
 */
const exec = async (context) => {
  let handlerResult = false;
  if (await inReportMode(context)) {
    logger.info('user: ', context.id, ' issued report: ', context.event.text);
    updateHistory(context.id, (history) => history.erase());
    context.pushText(COMMAND_SYS_REPORT_FINISH.reply, GENERAL_COMMANDS);
    await handleUserReport(context.id, context.event.text);
    handlerResult = context;
  }
  return handlerResult;
};

export default exec;
