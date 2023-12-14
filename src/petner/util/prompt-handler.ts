import { createChatCompletion } from '@src/services/openai';

export type TMessage = {
  role: string;
  content: string;
};

export type TChatCompletion = {
  id: string;
  object: string;
  created: number;
  model: string;
  system_fingerprint: string;
  choices: {
    index: number;
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
};

const promptHandler = async (
  messages: TMessage[],
): Promise<TChatCompletion> => {
  const { data } = await createChatCompletion({ messages });
  return data;
};

export { promptHandler };
