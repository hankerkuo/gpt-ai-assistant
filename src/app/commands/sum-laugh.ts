import { TYPE_SUM } from '@src/constants/command';
import { t } from '@src/locales/index';
import Command from './command';

export default new Command({
  type: TYPE_SUM,
  label: t('__COMMAND_SUM_LAUGH_LABEL'),
  text: t('__COMMAND_SUM_LAUGH_TEXT'),
  prompt: t('__COMMAND_SUM_LAUGH_PROMPT'),
  aliases: ['/laugh', 'Laugh'],
});
