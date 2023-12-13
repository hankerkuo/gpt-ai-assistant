export const mockUserPrivilege = (userId: string) => {
  switch (userId) {
    case 'trial_id':
      return {
        USER_ID: 'trial_id',
        TRIAL: 'Y',
        TRIAL_PROMPT_NUM: 5,
        TRIAL_PROMPT_LAST_RENEW: new Date(),
      };
    case 'other_id':
      return {
        USER_ID: 'other_id',
        TRIAL: 'N',
        TRIAL_PROMPT_NUM: 0,
        TRIAL_PROMPT_LAST_RENEW: new Date(),
      };
    case 'id_need_to_renew':
      const yesterday = new Date();
      yesterday.setTime(
        // subtract 25 hours
        new Date().getTime() - 1000 * 3600 * 25,
      );
      return {
        USER_ID: 'id_need_to_renew',
        TRIAL: 'Y',
        TRIAL_PROMPT_NUM: 0,
        TRIAL_PROMPT_LAST_RENEW: yesterday,
      };
    case 'id_no_need_to_renew':
      const halfDayBefore = new Date();
      halfDayBefore.setTime(
        // subtract 12 hours
        new Date().getTime() - 1000 * 3600 * 12,
      );
      return {
        USER_ID: 'id_no_need_to_renew',
        TRIAL: 'Y',
        TRIAL_PROMPT_NUM: 0,
        TRIAL_PROMPT_LAST_RENEW: halfDayBefore,
      };
    default:
      return null;
  }
};
