import config from '@src/config/index';
import { t } from '@src/locales/index';
import { deploy } from '@src/services/vercel';
import { COMMAND_SYS_DEPLOY } from '../commands/index';
import Context from '../context';
import { updateHistory } from '../history/index';

/**
 * @param {Context} context
 * @returns {boolean}
 */
const check = (context: Context) => context.hasCommand(COMMAND_SYS_DEPLOY);

/**
 * @param {Context} context
 * @returns {Promise<Context>}
 */
const exec = (context: Context) =>
  check(context) &&
  (async () => {
    updateHistory(context.id, (history) => history.erase());
    if (!config.VERCEL_DEPLOY_HOOK_URL)
      context.pushText(t('__ERROR_MISSING_ENV')('VERCEL_DEPLOY_HOOK_URL'));
    try {
      await deploy();
      context.pushText(COMMAND_SYS_DEPLOY.reply);
    } catch (err) {
      context.pushError(err);
    }
    return context;
  })();

export default exec;
