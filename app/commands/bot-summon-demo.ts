import config from '../../config/index';
import { TYPE_SYSTEM } from '../../constants/command';
import { t } from '../../locales/index';
import Command from './command';

export default new Command({
  type: TYPE_SYSTEM,
  label: t('__COMMAND_BOT_SUMMON_DEMO_LABEL'),
  text: `${config.BOT_NAME} ${t('__COMMAND_BOT_SUMMON_DEMO_TEXT')}`,
});
