import * as OpenCC from 'opencc-js';
import config from '../config/index';

const convertText = (text: string) => {
  if (config.APP_LANG !== 'zh') return text;
  const converter = OpenCC.Converter({ from: 'cn', to: 'tw' });
  return converter(text);
};

export default convertText;
