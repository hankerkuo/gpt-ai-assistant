import { TYPE_SUM } from '../../constants/command';
import { t } from '../../locales/index';
import Command from './command';

export default new Command({
  type: TYPE_SUM,
  label: t('__COMMAND_SUM_COMPLAIN_LABEL'),
  text: t('__COMMAND_SUM_COMPLAIN_TEXT'),
  prompt: t('__COMMAND_SUM_COMPLAIN_PROMPT'),
  aliases: ['/complain', 'Complain'],
});
