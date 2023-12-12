import { afterEach, beforeEach, expect, test } from '@jest/globals';
import { getPrompt, handleEvents, removePrompt } from '../app/index';
import {
  COMMAND_BOT_ACTIVATE,
  COMMAND_BOT_DEACTIVATE,
} from '../app/commands/index';
import { t } from '../locales/index';
import { createEvents, MOCK_TEXT_OK, MOCK_USER_01, TIMEOUT } from './utils';

jest.mock('../db/service/user-service.js', () => ({
  decreaseTrialPrompts: jest.fn(),
}));

jest.mock('../db/service/chat-mode-service.js', () => ({
  getChatMode: jest.fn().mockReturnValue('CHAT'),
}));

beforeEach(async () => {
  const events = [...createEvents([COMMAND_BOT_DEACTIVATE.text])];
  await handleEvents(events);
});

afterEach(() => {
  removePrompt(MOCK_USER_01);
});

test(
  'COMMAND_BOT_ACTIVATE',
  async () => {
    const events = [
      ...createEvents(['嗨！']), // should be ignored
      ...createEvents([COMMAND_BOT_ACTIVATE.text]),
      ...createEvents(['嗨！']),
    ];
    let results;
    try {
      results = await handleEvents(events);
    } catch (err) {
      console.error(err);
    }
    expect(getPrompt(MOCK_USER_01).messages.length).toEqual(5);
    const replies = results.map(({ messages }) =>
      messages.map(({ text }) => text),
    );
    expect(replies).toEqual([
      [
        t('__ERROR_MISSING_ENV')('VERCEL_ACCESS_TOKEN'),
        COMMAND_BOT_ACTIVATE.reply,
      ],
      [MOCK_TEXT_OK],
    ]);
  },
  TIMEOUT,
);
