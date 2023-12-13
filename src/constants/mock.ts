export const MOCK_TEXT_OK = 'OK!';

export const MOCK_GROUP_01 = '000001';
export const MOCK_GROUP_02 = '000002';

export const MOCK_USER_01 = '000001';
export const MOCK_USER_02 = '000002';

type TMockGroup = {
  [group: string]: { groupName: string };
};

type TMockUsers = {
  [user: string]: { displayName: string };
};

const mockGroups: TMockGroup = {};
mockGroups[MOCK_GROUP_01] = { groupName: 'group' };
mockGroups[MOCK_USER_02] = { groupName: 'group 2' };

const mockUsers: TMockUsers = {};
mockUsers[MOCK_USER_01] = { displayName: 'user' };
mockUsers[MOCK_USER_02] = { displayName: 'user 2' };

export { mockGroups, mockUsers };
