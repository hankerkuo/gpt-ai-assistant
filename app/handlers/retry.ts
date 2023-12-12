import config from '../../config/index';
import { ROLE_AI } from '../../services/openai';
import { generateCompletion } from '../../utils/index';
import { COMMAND_BOT_CONTINUE, COMMAND_BOT_RETRY, GENERAL_COMMANDS } from '../commands/index';
import Context from '../context';
import { updateHistory } from '../history/index';
import { getPrompt, setPrompt } from '../prompt/index';

/**
 * @param {Context} context
 * @returns {boolean}
 */
const check = (context: Context) => context.hasCommand(COMMAND_BOT_RETRY);

/**
 * @param {Context} context
 * @returns {Promise<Context>}
 */
const exec = (context: Context) => check(context) && (
  async () => {
    updateHistory(context.id, (history) => history.erase());
    const prompt = getPrompt(context.userId);
    prompt.erase().write(ROLE_AI);
    try {
      const { text, isFinishReasonStop } = await generateCompletion({ prompt });
      prompt.patch(text);
      setPrompt(context.userId, prompt);
      updateHistory(context.id, (history) => history.write(config.BOT_NAME, text));
      const actions = isFinishReasonStop ? [] : [COMMAND_BOT_CONTINUE];
      context.pushText(text, actions);
    } catch (err) {
      context.pushError(err);
    }
    return context;
  }
)();

export default exec;
