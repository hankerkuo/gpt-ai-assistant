import { TYPE_ANALYZE } from '../../constants/command';
import { t } from '../../locales/index';
import Command from './command';

export default new Command({
  type: TYPE_ANALYZE,
  label: t('__COMMAND_ANALYZE_ANALYZE_LABEL'),
  text: t('__COMMAND_ANALYZE_ANALYZE_TEXT'),
  prompt: t('__COMMAND_ANALYZE_ANALYZE_PROMPT'),
  aliases: ['/analyze', 'Analyze'],
});
