import { TYPE_SYSTEM } from '../../constants/command';
import { t } from '../../locales/index';
import Command from './command';

export default new Command({
  type: TYPE_SYSTEM,
  label: t('__COMMAND_BOT_DRAW_LABEL'),
  text: t('__COMMAND_BOT_DRAW_TEXT'),
  prompt: t('__COMMAND_BOT_DRAW_PROMPT'),
  aliases: [
    ...t('__COMMAND_BOT_DRAW_ALIASES'),
    '/draw',
    'Draw',
  ],
});
