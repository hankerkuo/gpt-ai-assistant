import {
  getTrialRemainingPrompts,
  hasTrialPrivilege,
  manageTrialPrompts,
  firstTimeGrantTrialPrompts,
} from './user-service';

import { mockUserPrivilege } from '../../tests/mock/user-privilege.mock';
import { mockUserInfo } from '../../tests/mock/user-info.mock';
import { getPrisma } from '../prisma-client';

const mockGetPrisma = getPrisma;
jest.mock('../prisma-client.js', () => ({
  getPrisma: jest.fn().mockReturnValue({
    user_privilege: {
      findUnique: async (condition) => {
        return mockUserPrivilege(condition.where.USER_ID);
      },
      update: jest.fn(),
      create: jest.fn(),
    },
    user_info: {
      findUnique: async (condition) => {
        return mockUserInfo(condition.where.USER_ID);
      },
      create: jest.fn(),
    },
    $transaction: jest.fn((...args) => {
      const [func, ...funcArgs] = args;
      return func(mockGetPrisma());
    }),
  }),
}));

describe('Test user service', () => {
  afterEach(() => {
    // required, it will clear the mock function call times
    jest.clearAllMocks();
  });

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
    console.log(
      await getPrisma().user_privilege.findUnique({
        where: {
          USER_ID: 'id_need_to_renew',
        },
      }),
    );
  });

  test('Test first time grant trial prompts', async () => {
    await firstTimeGrantTrialPrompts('id_not_exists', 10);
    expect(getPrisma().user_info.create).toHaveBeenCalledWith({
      data: {
        USER_ID: 'id_not_exists',
        USER_NAME: 'Unknown',
      },
    });
  });

  test('Test first time grant trial prompts with existing user', async () => {
    await firstTimeGrantTrialPrompts('trial_id', 10);
    expect(getPrisma().user_info.create).toHaveBeenCalledTimes(0);
  });
});
