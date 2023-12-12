import {
  afterEach, beforeEach, expect, test,
} from '@jest/globals';
import { getPrompt, handleEvents, removePrompt } from '../app/index';
import config from '../config/index';
import {
  createEvents, MOCK_TEXT_OK, MOCK_USER_01, TIMEOUT,
} from './utils';

jest.mock('../db/service/user-service.js', () => ({
  decreaseTrialPrompts: jest.fn(),
}));

jest.mock('../db/service/chat-mode-service.js', () => ({
  getChatMode: jest.fn().mockReturnValue('CHAT'),
}));

beforeEach(() => {
  //
});

afterEach(() => {
  removePrompt(MOCK_USER_01);
});

test('COMMAND_BOT_SUMMON', async () => {
  const events = [
    ...createEvents([`${config.BOT_NAME} 你好`]),
  ];
  let results;
  try {
    results = await handleEvents(events);
  } catch (err) {
    console.error(err);
  }
  expect(getPrompt(MOCK_USER_01).messages.length).toEqual(5);
  const replies = results.map(({ messages }) => messages.map(({ text }) => text));
  expect(replies).toEqual(
    [
      [MOCK_TEXT_OK],
    ],
  );
}, TIMEOUT);
