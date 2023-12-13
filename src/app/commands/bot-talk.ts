import { TYPE_SYSTEM } from '@src/constants/command';
import { t } from '@src/locales/index';
import Command from './command';

export default new Command({
  type: TYPE_SYSTEM,
  label: t('__COMMAND_BOT_TALK_LABEL'),
  text: t('__COMMAND_BOT_TALK_TEXT'),
  aliases: [...t('__COMMAND_BOT_TALK_ALIASES'), '/talk', 'Talk'],
});
