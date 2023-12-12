import { t } from '../../locales/index';
import { fetchVersion, getVersion } from '../../utils/index';
import { COMMAND_SYS_VERSION, GENERAL_COMMANDS } from '../commands/index';
import Context from '../context';
import { updateHistory } from '../history/index';

/**
 * @param {Context} context
 * @returns {boolean}
 */
const check = (context: Context) => context.hasCommand(COMMAND_SYS_VERSION);

/**
 * @param {Context} context
 * @returns {Promise<Context>}
 */
const exec = (context: Context) => check(context) && (
  async () => {
    updateHistory(context.id, (history) => history.erase());
    const current = getVersion();
    const latest = await fetchVersion();
    const isLatest = current === latest;
    const text = t('__COMMAND_SYS_VERSION_REPLY')(current, isLatest);
    context.pushText(text, GENERAL_COMMANDS);
    if (!isLatest) context.pushText(t('__MESSAGE_NEW_VERSION_AVAILABLE')(latest));
    return context;
  }
)();

export default exec;
