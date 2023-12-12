import config from '../config/index';
import { mockGroups } from '../constants/mock';
import { t } from '../locales/index';
import { fetchGroupSummary } from '../services/line';

class Group {
  groupName: string;

  constructor({ groupName }: { groupName: string }) {
    this.groupName = groupName;
  }
}

/**
 * @param {string} groupId
 * @returns {Promise<Group>}
 */
const fetchGroup = async (groupId: string) => {
  if (config.APP_ENV !== 'production') return new Group(mockGroups[groupId]);
  try {
    const { data } = await fetchGroupSummary({ groupId });
    return new Group(data);
  } catch {
    return new Group({ groupName: t('__SOURCE_NAME_SOME_GROUP') });
  }
};

export default fetchGroup;
