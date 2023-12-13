import axios from 'axios';
import config from '../config/index';
import { handleFulfilled, handleRejected, handleRequest } from './utils/index';

export const EVENT_TYPE_MESSAGE = 'message';
export const EVENT_TYPE_POSTBACK = 'postback';

export const SOURCE_TYPE_USER = 'user';
export const SOURCE_TYPE_GROUP = 'group';

export const MESSAGE_TYPE_TEXT = 'text';
export const MESSAGE_TYPE_STICKER = 'sticker';
export const MESSAGE_TYPE_AUDIO = 'audio';
export const MESSAGE_TYPE_IMAGE = 'image';
export const MESSAGE_TYPE_TEMPLATE = 'template';

export const TEMPLATE_TYPE_BUTTONS = 'buttons';

export const ACTION_TYPE_MESSAGE = 'message';
export const ACTION_TYPE_POSTBACK = 'postback';

export const QUICK_REPLY_TYPE_ACTION = 'action';

type TReplyParam = {
  replyToken: any;
  messages: any;
};

const client = axios.create({
  baseURL: 'https://api.line.me',
  timeout: Number(config.LINE_TIMEOUT),
  headers: {
    'Accept-Encoding': 'gzip, deflate, compress',
  },
});

client.interceptors.request.use((c) => {
  c.headers = c.headers ?? {}; // Add this line to provide a default value for c.headers
  c.headers.Authorization = `Bearer ${config.LINE_CHANNEL_ACCESS_TOKEN}`;
  return handleRequest(c);
});

client.interceptors.response.use(handleFulfilled, (err) => {
  if (err.response?.data?.message) {
    err.message = err.response.data.message;
  }
  return handleRejected(err);
});

const reply = ({
  replyToken,
  messages,
}: TReplyParam): Promise<{
  replyToken: string;
  messages: any[];
}> =>
  client.post('/v2/bot/message/reply', {
    replyToken,
    messages,
  });

const fetchGroupSummary = ({ groupId }: { groupId: string }) =>
  client.get(`/v2/bot/group/${groupId}/summary`);

const fetchProfile = ({ userId }: { userId: string }) =>
  client.get(`/v2/bot/profile/${userId}`);

const dataClient = axios.create({
  baseURL: 'https://api-data.line.me',
  timeout: Number(config.LINE_TIMEOUT),
  headers: {
    'Accept-Encoding': 'gzip, deflate, compress',
  },
});

dataClient.interceptors.request.use((c) => {
  c.headers = c.headers ?? {};
  c.headers.Authorization = `Bearer ${config.LINE_CHANNEL_ACCESS_TOKEN}`;
  return handleRequest(c);
});

dataClient.interceptors.response.use(handleFulfilled, (err) => {
  if (err.response?.data?.message) {
    err.message = err.response.data.message;
  }
  return handleRejected(err);
});

const fetchContent = ({ messageId }: { messageId: string }) =>
  dataClient.get(`/v2/bot/message/${messageId}/content`, {
    responseType: 'arraybuffer',
  });

export { reply, fetchGroupSummary, fetchProfile, fetchContent };
