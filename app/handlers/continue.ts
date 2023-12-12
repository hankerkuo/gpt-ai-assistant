import { generateCompletion } from '../../utils/index';
import { ALL_COMMANDS, COMMAND_BOT_CONTINUE } from '../commands/index';
import Context from '../context';
import { updateHistory } from '../history/index';
import { getPrompt, setPrompt } from '../prompt/index';

/**
 * @param {Context} context
 * @returns {boolean}
 */
const check = (context: Context) => context.hasCommand(COMMAND_BOT_CONTINUE);

/**
 * @param {Context} context
 * @returns {Promise<Context>}
 */
const exec = (context: Context) =>
  check(context) &&
  (async () => {
    updateHistory(context.id, (history) => history.erase());
    const prompt = getPrompt(context.userId);
    const { lastMessage } = prompt;
    if (lastMessage.isEnquiring) prompt.erase();
    try {
      const { text, isFinishReasonStop } = await generateCompletion({ prompt });
      prompt.patch(text);
      if (lastMessage.isEnquiring && !isFinishReasonStop)
        prompt.write('', lastMessage.content);
      setPrompt(context.userId, prompt);
      if (!lastMessage.isEnquiring)
        updateHistory(context.id, (history) => history.patch(text));
      const defaultActions = ALL_COMMANDS.filter(
        ({ type }) => type === lastMessage.content,
      );
      const actions = isFinishReasonStop
        ? defaultActions
        : [COMMAND_BOT_CONTINUE];
      context.pushText(text, actions);
    } catch (err) {
      context.pushError(err);
    }
    return context;
  })();

export default exec;
