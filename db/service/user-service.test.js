import {
  getTrialRemainingPrompts,
  hasTrialPrivilege,
  manageTrialPrompts,
} from './user-service';

import { mockUserPrivilege } from '../../tests/mock/user-privilege.mock';
import { getPrisma } from '../prisma-client.js';

jest.mock('../prisma-client.js', () => ({
  getPrisma: jest.fn().mockReturnValue({
    user_privilege: {
      findUnique: async (condition) => {
        return mockUserPrivilege(condition.where.USER_ID);
      },
      update: jest.fn(),
    },
  }),
}));

describe('Test user service', () => {
  test('Test get trial remaining prompts', async () => {
    const result1 = await getTrialRemainingPrompts('trial_id');
    expect(result1).toBe(5);
    const result2 = await getTrialRemainingPrompts('other_id');
    expect(result2).toBe(0);
    const result3 = await getTrialRemainingPrompts('non_exist_id');
    expect(result3).toBe(0);
  });

  test('Test has trial privilege', async () => {
    const result1 = await hasTrialPrivilege('trial_id');
    expect(result1).toBe(true);
    const result2 = await hasTrialPrivilege('other_id');
    expect(result2).toBe(false);
    const result3 = await hasTrialPrivilege('non_exist_id');
    expect(result3).toBe(false);
  });
  //TODO: add the remaining tests
  test('Test manage trial prompts', async () => {
    const result = await manageTrialPrompts('id_need_to_renew');
    expect(result).toBe(true);
    const result2 = await manageTrialPrompts('id_no_need_to_renew');
    expect(result2).toBe(false);
    console.log(await getPrisma().user_privilege.findUnique({
      where: {
        USER_ID: 'id_need_to_renew',
      },
    }));
  });
});
