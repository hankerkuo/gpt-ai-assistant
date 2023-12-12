import {
  COMMAND_SYS_REPORT_FINISH,
  GENERAL_COMMANDS,
} from '../commands/index';
import Context from '../context';
import { updateHistory } from '../history/index';
import { getChatMode } from '../../db/service/chat-mode-service';
import { handleUserReport } from '../../db/service/report-service';
import logger from '../../utils/logger';

/**
 * @param {Context} context
 * @returns {boolean}
 */
const inReportMode = async (context: Context) =>{
  return (await getChatMode(context.id)) === 'REPORT';
}
  

/**
 * @param {Context} context
 * @returns {Promise<Context>}
 */
const exec = async (context: Context) => {
  let handlerResult: false | Context = false;
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
