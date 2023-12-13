import { getPrisma } from '../prisma-client';
import {
  isDifferenceGreaterThanOneDay,
  createToday8amDate,
} from '@src/utils/date-compare';
import { PrismaClient } from '@prisma/client';

export async function isUserExist(userId: string) {
  const prismaClient = await getPrisma();
  const query = await prismaClient.user_info.findUnique({
    where: {
      USER_ID: userId,
    },
  });
  return query !== null;
}

export async function getAllUsers() {
  const prismaClient = await getPrisma();
  return await prismaClient.user_info.findMany();
}

export async function hasTrialPrivilege(userId: string) {
  const prismaClient = await getPrisma();
  const query = await prismaClient.user_privilege.findUnique({
    where: {
      USER_ID: userId,
    },
  });
  return query !== null && query.TRIAL === 'Y';
}

export async function getTrialRemainingPrompts(userId: string) {
  const prismaClient = await getPrisma();
  const query = await prismaClient.user_privilege.findUnique({
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

export async function createUser(userId: string, name?: string) {
  const prismaClient = await getPrisma();
  const query = await prismaClient.user_info.create({
    data: {
      USER_ID: userId,
      USER_NAME: name ? name : 'Unknown',
    },
  });
  return query;
}

export async function firstTimeGrantTrialPrompts(userId: string, num: number) {
  const prismaClient = await getPrisma();
  await prismaClient.$transaction(async (prisma: PrismaClient) => {
    if (!(await isUserExist(userId))) {
      await createUser(userId);
    }
    return prisma.user_privilege.create({
      data: {
        USER_ID: userId,
        TRIAL: 'Y',
        TRIAL_PROMPT_NUM: num,
        PROMPT_GRANT_PER_DAY: num,
        TRIAL_PROMPT_LAST_RENEW: createToday8amDate(),
      },
    });
  });
}

async function updateTrialPrompts(userId: string, num: number) {
  const prismaClient = await getPrisma();
  const query = await prismaClient.user_privilege.update({
    where: {
      USER_ID: userId,
    },
    data: {
      TRIAL_PROMPT_NUM: num,
      TRIAL_PROMPT_LAST_RENEW: createToday8amDate(),
    },
  });
  return query;
}

export async function decreaseTrialPrompts(userId: string, num: number) {
  const prismaClient = await getPrisma();
  const query = await prismaClient.user_privilege.update({
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

export async function manageTrialPrompts(userId: string) {
  const prismaClient = await getPrisma();
  const query = await prismaClient.user_privilege.findUnique({
    where: {
      USER_ID: userId,
    },
  });
  if (!query) {
    return false;
  }
  // prompt renew every 8:00 am
  if (
    isDifferenceGreaterThanOneDay(
      new Date(),
      new Date(query.TRIAL_PROMPT_LAST_RENEW),
    )
  ) {
    await updateTrialPrompts(userId, query.PROMPT_GRANT_PER_DAY);
    return true;
  } else {
    return false;
  }
}
