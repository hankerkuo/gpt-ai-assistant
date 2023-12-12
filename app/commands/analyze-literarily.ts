import { TYPE_ANALYZE } from '../../constants/command';
import { t } from '../../locales/index';
import Command from './command';

export default new Command({
  type: TYPE_ANALYZE,
  label: t('__COMMAND_ANALYZE_LITERARILY_LABEL'),
  text: t('__COMMAND_ANALYZE_LITERARILY_TEXT'),
  prompt: t('__COMMAND_ANALYZE_LITERARILY_PROMPT'),
  aliases: ['/analyze-literarily', 'Analyze literarily'],
});
