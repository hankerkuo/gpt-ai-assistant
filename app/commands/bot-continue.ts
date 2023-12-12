import { TYPE_SYSTEM } from '../../constants/command';
import { t } from '../../locales/index';
import Command from './command';

export default new Command({
  type: TYPE_SYSTEM,
  label: t('__COMMAND_BOT_CONTINUE_LABEL'),
  text: t('__COMMAND_BOT_CONTINUE_TEXT'),
  aliases: [
    ...t('__COMMAND_BOT_CONTINUE_ALIASES'),
    '/continue',
    'Continue',
  ],
});
