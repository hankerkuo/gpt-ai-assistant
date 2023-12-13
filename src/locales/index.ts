import config from '../config/index';
import en from './en';
import ja from './ja';
import zh from './zh';

const locales = {
  en,
  ja,
  zh,
} as any;

const t = (key: any) => locales[config.APP_LANG][key];

export { t };

export default null;
