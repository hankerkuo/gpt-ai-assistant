import { TYPE_TRANSLATE } from '../../constants/command';
import { t } from '../../locales/index';
import Command from './command';

export default new Command({
  type: TYPE_TRANSLATE,
  label: t('__COMMAND_TRANSLATE_TO_EN_LABEL'),
  text: t('__COMMAND_TRANSLATE_TO_EN_TEXT'),
  prompt: t('__COMMAND_TRANSLATE_TO_EN_PROMPT'),
  aliases: [
    '/translate-to-en',
    'Translate to English',
    'Translate to EN',
  ],
});
