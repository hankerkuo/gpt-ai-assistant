import {
  afterEach, beforeEach, expect, test,
} from '@jest/globals';
import { getPrompt, handleEvents, removePrompt } from '../app/index';
import { COMMAND_BOT_CONTINUE } from '../app/commands/index';
import {
  createEvents, TIMEOUT, MOCK_USER_01, MOCK_TEXT_OK,
} from './utils';

beforeEach(() => {
  //
});

afterEach(() => {
  removePrompt(MOCK_USER_01);
});

test('COMMAND_BOT_CONTINUE', async () => {
  const events = [
    ...createEvents([COMMAND_BOT_CONTINUE.text]),
  ];
  let results;
  try {
    results = await handleEvents(events);
  } catch (err) {
    console.error(err);
  }
  expect(getPrompt(MOCK_USER_01).messages.length).toEqual(3);
  const replies = results.map(({ messages }) => messages.map(({ text }) => text));
  expect(replies).toEqual(
    [
      [MOCK_TEXT_OK],
    ],
  );
}, TIMEOUT);
