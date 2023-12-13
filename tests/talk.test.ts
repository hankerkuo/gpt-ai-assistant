import { afterEach, beforeEach, expect, test } from '@jest/globals';
import { getPrompt, handleEvents, removePrompt } from '../src/app/index';
import { COMMAND_BOT_TALK } from '../src/app/commands/index';
import { createEvents, TIMEOUT, MOCK_USER_01, MOCK_TEXT_OK } from './utils';

jest.mock('../src/db/service/user-service', () => ({
  decreaseTrialPrompts: jest.fn(),
}));

jest.mock('../src/db/service/chat-mode-service', () => ({
  getChatMode: jest.fn().mockReturnValue('CHAT'),
}));

beforeEach(() => {
  //
});

afterEach(() => {
  removePrompt(MOCK_USER_01);
});

test(
  'COMMAND_BOT_TALK',
  async () => {
    const events: any = [...createEvents([`${COMMAND_BOT_TALK.text}人工智慧`])];
    let results;
    try {
      results = await handleEvents(events);
    } catch (err) {
      console.error(err);
    }
    expect(getPrompt(MOCK_USER_01).messages.length).toEqual(5);
    const replies = results!.map(({ messages }) =>
      messages.map(({ text }) => text),
    );
    expect(replies).toEqual([[MOCK_TEXT_OK]]);
  },
  TIMEOUT,
);
