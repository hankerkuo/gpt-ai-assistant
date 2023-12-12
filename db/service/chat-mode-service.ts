import { getPrisma } from '../prisma-client';

export async function setChatMode(userId: string, mode: string) {
  const prismaClient = await getPrisma();
  const query = await prismaClient.user_info.update({
    where: {
      USER_ID: userId,
    },
    data: {
      CHAT_MODE: mode,
    },
  });
  return query;
}

export async function getChatMode(userId: string) {
  const prismaClient = await getPrisma();
  const query = await prismaClient.user_info.findUnique({
    where: {
      USER_ID: userId,
    },
  });
  return query ? query.CHAT_MODE: '';
}