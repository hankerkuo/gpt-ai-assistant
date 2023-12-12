import config from '../../config/index';
import { t } from '../../locales/index';
import { ROLE_AI, ROLE_HUMAN } from '../../services/openai';
import { generateCompletion } from '../../utils/index';
import { COMMAND_BOT_CONTINUE, COMMAND_BOT_TALK } from '../commands/index';
import Context from '../context';
import { updateHistory } from '../history/index';
import { getPrompt, setPrompt } from '../prompt/index';
import { decreaseTrialPrompts } from '../../db/service/user-service';

/**
 * @param {Context} context
 * @returns {boolean}
 */
const check = (context: Context) => (
  context.hasCommand(COMMAND_BOT_TALK)
  || context.hasBotName
  || context.source!.bot.isActivated
);

/**
 * @param {Context} context
 * @returns {Promise<Context>}
 */
const exec = (context: Context) => check(context) && (
  async () => {
    const prompt = getPrompt(context.userId);
    prompt.write(ROLE_HUMAN, `${t('__COMPLETION_DEFAULT_AI_TONE')(config.BOT_TONE)}${context.trimmedText}`).write(ROLE_AI);
    try {
      const { text, isFinishReasonStop } = await generateCompletion({ prompt });
      await decreaseTrialPrompts(context.userId, 1);
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
