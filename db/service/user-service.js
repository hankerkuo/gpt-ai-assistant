import getPrisma from '../prisma-client.js';

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