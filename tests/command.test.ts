import {
  afterEach,
  beforeEach,
  expect,
  test,
} from '@jest/globals';
import { getPrompt, handleEvents, removePrompt } from '../app/index';
import { COMMAND_SYS_COMMAND } from '../app/commands/index';
import { createEvents, TIMEOUT, MOCK_USER_01 } from './utils';

beforeEach(() => {
  //
});

afterEach(() => {
  removePrompt(MOCK_USER_01);
});

test('COMMAND_SYS_COMMAND', async () => {
  const events = [
    ...createEvents([`${COMMAND_SYS_COMMAND.text}`]),
  ];
  let results;
  try {
    results = await handleEvents(events);
  } catch (err) {
    console.error(err);
  }
  expect(getPrompt(MOCK_USER_01).messages.length).toEqual(3);
  const replies = results.map(({ messages }) => messages.map(({ altText }) => altText));
  expect(replies).toEqual(
    [
      [COMMAND_SYS_COMMAND.label],
    ],
  );
}, TIMEOUT);
