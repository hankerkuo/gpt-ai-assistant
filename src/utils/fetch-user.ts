import config from '../config/index';
import { mockUsers } from '../constants/mock';
import { t } from '../locales/index';
import { fetchProfile } from '../services/line';

class User {
  displayName: string;

  constructor({ displayName }: { displayName: string }) {
    this.displayName = displayName;
  }
}

/**
 * @param {string} userId
 * @returns {Promise<User>}
 */
const fetchUser = async (userId: string) => {
  if (config.APP_ENV !== 'production') return new User(mockUsers[userId]);
  try {
    const { data } = await fetchProfile({ userId });
    return new User(data);
  } catch {
    return new User({ displayName: t('__SOURCE_NAME_SOMEONE') });
  }
};

export default fetchUser;
