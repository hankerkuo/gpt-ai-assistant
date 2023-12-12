import { TYPE_SYSTEM } from '../../constants/command';
import { t } from '../../locales/index';
import Command from './command';

export default new Command({
  type: TYPE_SYSTEM,
  label: t('__COMMAND_SYS_DOC_LABEL'),
  text: t('__COMMAND_SYS_DOC_TEXT'),
  reply: t('__COMMAND_SYS_DOC_REPLY'),
  aliases: ['/doc', 'Doc'],
});
