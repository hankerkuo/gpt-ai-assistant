import { getPrisma } from '../prisma-client.js';

export async function setChatMode(userId, mode) {
  const query = await getPrisma().user_info.update({
    where: {
      USER_ID: userId,
    },
    data: {
      CHAT_MODE: mode,
    },
  });
  return query;
}

export async function getChatMode(userId) {
  const query = await getPrisma().user_info.findUnique({
    where: {
      USER_ID: userId,
    },
  });
  return query.CHAT_MODE;
}