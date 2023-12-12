import { getPrisma } from '../prisma-client';
import { setChatMode } from './chat-mode-service';

export async function insertReport(userId: string, report: string) {
  const prismaClient = await getPrisma();
  const query = await prismaClient.user_issue_report.create({
    data: {
      USER_ID: userId,
      CONTENT: report,
    },
  });
  return query;
}



export async function handleUserReport(userId: string, report: string) {
  const prismaClient = await getPrisma();
  await prismaClient.$transaction(async (tx) => {
    // set chat mode back to CHAT
    setChatMode(userId, 'CHAT');
    insertReport(userId, report);
  });
}