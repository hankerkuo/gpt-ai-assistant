import getPrisma from '../prisma-client.js';

export async function isUserExist(userId) {
  const query = await getPrisma().user_info.findUnique({
    where: {
      USER_ID: userId,
    },
  });
  return query !== null;
}

export async function getAllUsers() {
  return await getPrisma().user_info.findMany();
}

export async function hasTrialPrivilege(userId) {
  const query = await getPrisma().user_privilege.findUnique({
    where: {
      USER_ID: userId,
    },
  });
  return query !== null && query.TRIAL === 'Y';
}

export async function getTrialRemainingPrompts(userId) {
  const query = await getPrisma().user_privilege.findUnique({
    where: {
      USER_ID: userId,
    },
  });
  if (!query) {
    return 0;
  }
  return query.TRIAL_PROMPT_NUM;
}

// =========== Creat/Edit ===========

export async function createUser(userId, name) {
  const query = await getPrisma().user_info.create({
    data: {
      USER_ID: userId,
      USER_NAME: name? name : 'Unknown',
    },
  });
  return query;
}

export async function grantTrialPrompts(userId, num) {
  if (!(await isUserExist(userId))) {
    await createUser(userId);
  }
  const query = await getPrisma().user_privilege.create({
    data: {
      USER_ID: userId,
      TRIAL: 'Y',
      TRIAL_PROMPT_NUM: num,
    },
  });
  return query;
}

export async function decreaseTrialPrompts(userId, num) {
  const query = await getPrisma().user_privilege.update({
    where: {
      USER_ID: userId,
    },
    data: {
      TRIAL_PROMPT_NUM: {
        decrement: num,
      },
    },
  });
  return query;
}