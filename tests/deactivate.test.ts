import { afterEach, beforeEach, expect, jest, test } from '@jest/globals';
import { getPrompt, handleEvents, removePrompt } from '../src/app/index';
import {
  COMMAND_BOT_ACTIVATE,
  COMMAND_BOT_DEACTIVATE,
} from '../src/app/commands/index';
import { t } from '../src/locales/index';
import storage from '../src/storage/index';
import { createEvents, MOCK_TEXT_OK, MOCK_USER_01, TIMEOUT } from './utils';

jest.mock('../src/db/service/user-service', () => ({
  decreaseTrialPrompts: jest.fn(),
}));

jest.mock('../src/db/service/chat-mode-service', () => ({
  getChatMode: jest.fn().mockReturnValue('CHAT'),
}));

beforeEach(async () => {
  const events: any = [...createEvents([COMMAND_BOT_ACTIVATE.text])];
  await handleEvents(events);
});

afterEach(() => {
  removePrompt(MOCK_USER_01);
});

test(
  'COMMAND_BOT_DEACTIVATE',
  async () => {
    const events: any = [
      ...createEvents(['嗨！']),
      ...createEvents([COMMAND_BOT_DEACTIVATE.text]),
      ...createEvents(['嗨！']), // should be ignored
    ];
    let results;
    try {
      results = await handleEvents(events);
    } catch (err) {
      console.error(err);
    }
    console.log(getPrompt(MOCK_USER_01).messages);
    expect(getPrompt(MOCK_USER_01).messages.length).toEqual(5);
    const replies = results!.map(({ messages }) =>
      messages.map(({ text }) => text),
    );
    expect(replies).toEqual([
      [MOCK_TEXT_OK],
      [
        t('__ERROR_MISSING_ENV')('VERCEL_ACCESS_TOKEN'),
        COMMAND_BOT_DEACTIVATE.reply,
      ],
    ]);
  },
  TIMEOUT,
);
