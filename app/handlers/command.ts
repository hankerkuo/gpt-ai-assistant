import {
  COMMAND_BOT_ACTIVATE,
  COMMAND_SYS_COMMAND,
  COMMAND_BOT_DEACTIVATE,
  GENERAL_COMMANDS,
  INFO_COMMANDS,
} from '../commands/index';
import Context from '../context';
import { updateHistory } from '../history/index';

/**
 * @param {Context} context
 * @returns {boolean}
 */
const check = (context: Context) => context.hasCommand(COMMAND_SYS_COMMAND);

/**
 * @param {Context} context
 * @returns {Context}
 */
const exec = (context: Context) => check(context) && (
  async () => {
    updateHistory(context.id, (history) => history.erase());
    try {
      const buttons = [...INFO_COMMANDS];
      buttons.splice(2, 0, context.source!.bot.isActivated ? COMMAND_BOT_DEACTIVATE : COMMAND_BOT_ACTIVATE);
      context.pushTemplate(COMMAND_SYS_COMMAND.label, buttons, GENERAL_COMMANDS);
    } catch (err) {
      context.pushError(err);
    }
    return context;
  }
)();

export default exec;
