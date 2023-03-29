import { getPrisma } from '../prisma-client.js';

import { setChatMode } from './chat-mode-service.js';

export async function insertReport(userId, report) {
  const query = await getPrisma().user_issue_report.create({
    data: {
      USER_ID: userId,
      CONTENT: report,
    },
  });
  return query;
}

export async function handleUserReport(userId, report) {
  await getPrisma().$transaction(async (prisma) => {
    // set chat mode back to CHAT
    setChatMode(userId, 'CHAT');
    insertReport(userId, report);
  });
}