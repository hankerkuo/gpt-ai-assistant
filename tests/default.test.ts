import { afterEach, beforeEach, expect, test } from '@jest/globals';
import {
  getPrompt,
  handleEvents,
  removePrompt,
  printHistories,
} from '../app/index';
import config from '../config/index';
import { createEvents, TIMEOUT, MOCK_USER_01, MOCK_TEXT_OK } from './utils';

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

test(
  'DEFAULT',
  async () => {
    const events = [...createEvents(['嗨！'])];
    let results;
    try {
      results = await handleEvents(events);
    } catch (err) {
      console.error(err);
    }
    if (config.APP_DEBUG) printHistories();
    expect(getPrompt(MOCK_USER_01).messages.length).toEqual(5);
    const replies = results.map(({ messages }) =>
      messages.map(({ text }) => text),
    );
    expect(replies).toEqual([[MOCK_TEXT_OK]]);
  },
  TIMEOUT,
);
