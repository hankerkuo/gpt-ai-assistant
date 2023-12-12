import { TYPE_SYSTEM } from '../../constants/command';
import { t } from '../../locales/index';
import Command from './command';

export default new Command({
  type: TYPE_SYSTEM,
  label: t('__COMMAND_BOT_DEACTIVATE_LABEL'),
  text: t('__COMMAND_BOT_DEACTIVATE_TEXT'),
  reply: t('__COMMAND_BOT_DEACTIVATE_REPLY'),
  aliases: [
    ...t('__COMMAND_BOT_DEACTIVATE_ALIASES'),
    '/deactivate',
    'Deactivate',
  ],
});
