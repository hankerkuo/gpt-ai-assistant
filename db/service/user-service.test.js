import { getTrialRemainingPrompts, hasTrialPrivilege } from './user-service';

jest.mock('../prisma-client.js', () => ({
  getPrisma: jest.fn().mockReturnValue({
    user_privilege: {
      findUnique: async (condition) => {
        switch (condition.where.USER_ID) {
          case 'trial_id':
            return {
              USER_ID: 'trial_id',
              TRIAL: 'Y',
              TRIAL_PROMPT_NUM: 5,
              TRIAL_PROMPT_LAST_RENEW: '2023-03-19T00:00:00.000Z',
            };
          case 'other_id':
            return {
              USER_ID: 'other_id',
              TRIAL: 'N',
              TRIAL_PROMPT_NUM: 0,
              TRIAL_PROMPT_LAST_RENEW: '2023-03-19T00:00:00.000Z',
            };
          default:
            return null;
        }
      },
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
});
