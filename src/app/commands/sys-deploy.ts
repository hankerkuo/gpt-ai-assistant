import { TYPE_SYSTEM } from '@src/constants/command';
import { t } from '@src/locales/index';
import Command from './command';

export default new Command({
  type: TYPE_SYSTEM,
  label: t('__COMMAND_SYS_DEPLOY_LABEL'),
  text: t('__COMMAND_SYS_DEPLOY_TEXT'),
  reply: t('__COMMAND_SYS_DEPLOY_REPLY'),
  aliases: ['/restart', 'Restart'],
});
