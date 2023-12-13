import { t } from '@src/locales/index';
import { SOURCE_TYPE_GROUP } from '@src/services/line';

class Source {
  type;

  name;

  bot: any;

  createdAt: number;

  constructor({ type, name, bot }: { type: any; name: any; bot: any }) {
    this.type = type;
    this.name =
      name ||
      (type === SOURCE_TYPE_GROUP
        ? t('__SOURCE_NAME_SOME_GROUP')
        : t('__SOURCE_NAME_SOMEONE'));
    this.bot = bot;
    this.createdAt = Math.floor(Date.now() / 1000);
  }
}

export default Source;
