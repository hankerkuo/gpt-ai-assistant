import { COMMAND_BOT_FORGET } from '../commands/index';
import Context from '../context';
import { removeHistory } from '../history/index';
import { removePrompt } from '../prompt/index';

/**
 * @param {Context} context
 * @returns {boolean}
 */
const check = (context: Context) => context.hasCommand(COMMAND_BOT_FORGET);

/**
 * @param {Context} context
 * @returns {Promise<Context>}
 */
const exec = (context: Context) =>
  check(context) &&
  (async () => {
    removePrompt(context.userId);
    removeHistory(context.userId);
    context.pushText(COMMAND_BOT_FORGET.reply);
    return context;
  })();

export default exec;
