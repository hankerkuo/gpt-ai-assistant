import config from '../config/index';
import { reply } from '../services/line';

interface ReplyMessageProps {
  replyToken: string;
  messages: any[]; // Replace 'any' with the appropriate type for messages
}

const replyMessage = ({
  replyToken,
  messages,
}: ReplyMessageProps) => {
  if (config.APP_ENV !== 'production') return { replyToken, messages };
  return reply({ replyToken, messages });
};

export default replyMessage;
