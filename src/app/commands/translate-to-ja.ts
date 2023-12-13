import { TYPE_TRANSLATE } from '@src/constants/command';
import { t } from '@src/locales/index';
import Command from './command';

export default new Command({
  type: TYPE_TRANSLATE,
  label: t('__COMMAND_TRANSLATE_TO_JA_LABEL'),
  text: t('__COMMAND_TRANSLATE_TO_JA_TEXT'),
  prompt: t('__COMMAND_TRANSLATE_TO_JA_PROMPT'),
  aliases: ['/translate-to-ja', 'Translate to Japanese', 'Translate to JA'],
});
