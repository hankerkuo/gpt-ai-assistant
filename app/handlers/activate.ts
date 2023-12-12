import config from '../../config/index';
import { t } from '../../locales/index';
import { COMMAND_BOT_ACTIVATE, GENERAL_COMMANDS } from '../commands/index';
import Context from '../context';
import { updateHistory } from '../history/index';
import { updateSources } from '../repository/index';

/**
 * @param {Context} context
 * @returns {boolean}
 */
const check = (context: Context) => context.hasCommand(COMMAND_BOT_ACTIVATE);

/**
 * @param {Context} context
 * @returns {Context}
 */
const exec = (context: Context) => check(context) && (
  async () => {
    updateHistory(context.id, (history) => history.erase());
    if (!config.VERCEL_ACCESS_TOKEN) context.pushText(t('__ERROR_MISSING_ENV')('VERCEL_ACCESS_TOKEN'));
    try {
      await updateSources(context.id, (source) => {
        source.bot.isActivated = true;
      });
      context.pushText(COMMAND_BOT_ACTIVATE.reply, GENERAL_COMMANDS);
    } catch (err) {
      context.pushError(err);
    }
    return context;
  }
)();

export default exec;
