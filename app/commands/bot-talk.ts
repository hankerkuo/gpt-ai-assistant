import { TYPE_SYSTEM } from '../../constants/command';
import { t } from '../../locales/index';
import Command from './command';

export default new Command({
  type: TYPE_SYSTEM,
  label: t('__COMMAND_BOT_TALK_LABEL'),
  text: t('__COMMAND_BOT_TALK_TEXT'),
  aliases: [...t('__COMMAND_BOT_TALK_ALIASES'), '/talk', 'Talk'],
});
