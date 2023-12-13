import { TYPE_SUM } from '@src/constants/command';
import { t } from '@src/locales/index';
import Command from './command';

export default new Command({
  type: TYPE_SUM,
  label: t('__COMMAND_SUM_ENCOURAGE_LABEL'),
  text: t('__COMMAND_SUM_ENCOURAGE_TEXT'),
  prompt: t('__COMMAND_SUM_ENCOURAGE_PROMPT'),
  aliases: ['/encourage', 'Encourage'],
});
