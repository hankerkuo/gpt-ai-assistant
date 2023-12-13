import { TYPE_SYSTEM } from '@src/constants/command';
import { t } from '@src/locales/index';
import Command from './command';

export default new Command({
  type: TYPE_SYSTEM,
  label: t('__COMMAND_BOT_ACTIVATE_LABEL'),
  text: t('__COMMAND_BOT_ACTIVATE_TEXT'),
  reply: t('__COMMAND_BOT_ACTIVATE_REPLY'),
  aliases: [...t('__COMMAND_BOT_ACTIVATE_ALIASES'), '/activate', 'Activate'],
});
