import config from '../../config/index';
import { MOCK_TEXT_OK } from '../../constants/mock';
import { ROLE_AI, ROLE_HUMAN } from '../../services/openai';
import { generateImage } from '../../utils/index';
import { COMMAND_BOT_DRAW } from '../commands/index';
import Context from '../context';
import { updateHistory } from '../history/index';
import { getPrompt, setPrompt } from '../prompt/index';

/**
 * @param {Context} context
 * @returns {boolean}
 */
const check = (context: Context) => context.hasCommand(COMMAND_BOT_DRAW);

/**
 * @param {Context} context
 * @returns {Promise<Context>}
 */
const exec = (context: Context) => check(context) && (
  async () => {
    const prompt = getPrompt(context.userId);
    prompt.write(ROLE_HUMAN, `${context.trimmedText}`).write(ROLE_AI);
    try {
      const trimmedText = context.trimmedText.replace(COMMAND_BOT_DRAW.text, '');
      const { url } = await generateImage({ prompt: trimmedText, size: config.OPENAI_IMAGE_GENERATION_SIZE });
      prompt.patch(MOCK_TEXT_OK);
      setPrompt(context.userId, prompt);
      updateHistory(context.id, (history) => history.write(config.BOT_NAME, MOCK_TEXT_OK));
      context.pushImage(url);
    } catch (err) {
      context.pushError(err);
    }
    return context;
  }
)();

export default exec;
