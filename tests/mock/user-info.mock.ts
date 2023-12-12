export const mockUserInfo = (userId) => {
  switch (userId) {
    case 'trial_id':
      return {
        USER_ID: 'trial_id',
        USER_NAME: 'trial_name',
      };
    default:
      return null;
  }
};
