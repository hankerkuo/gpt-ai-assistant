import { COMMAND_SYS_DOC, GENERAL_COMMANDS } from '../commands/index';
import Context from '../context';
import { updateHistory } from '../history/index';

/**
 * @param {Context} context
 * @returns {boolean}
 */
const check = (context: Context) => context.hasCommand(COMMAND_SYS_DOC);

/**
 * @param {Context} context
 * @returns {Promise<Context>}
 */
const exec = (context: Context) =>
  check(context) &&
  (async () => {
    updateHistory(context.id, (history) => history.erase());
    context.pushText(
      'https://github.com/memochou1993/gpt-ai-assistant',
      GENERAL_COMMANDS,
    );
    return context;
  })();

export default exec;
