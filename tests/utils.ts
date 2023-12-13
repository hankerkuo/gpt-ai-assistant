import Event from '../src/app/models/event';
import { MOCK_TEXT_OK, MOCK_USER_01, MOCK_USER_02 } from '../src/constants/mock';
import {
  EVENT_TYPE_MESSAGE,
  MESSAGE_TYPE_TEXT,
  SOURCE_TYPE_GROUP,
  SOURCE_TYPE_USER,
} from '../services/line';

export const TIMEOUT = 9 * 1000;

const createEvents = (messages, groupId, userId = MOCK_USER_01) =>
  messages.map(
    (text) =>
      new Event({
        replyToken: '',
        type: EVENT_TYPE_MESSAGE,
        source: {
          type: groupId ? SOURCE_TYPE_GROUP : SOURCE_TYPE_USER,
          userId,
          groupId,
        },
        message: { type: MESSAGE_TYPE_TEXT, text },
      }),
  );

export { MOCK_TEXT_OK, MOCK_USER_01, MOCK_USER_02, createEvents };
