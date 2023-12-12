import config from '../config/index';
import { MOCK_TEXT_OK } from '../constants/mock';
import {
  createChatCompletion,
  createTextCompletion,
  FINISH_REASON_STOP,
  MODEL_GPT_3_5_TURBO,
} from '../services/openai';

class Completion {
  text: string;

  finishReason: string;

  constructor({ text, finishReason }: { text: string; finishReason?: string }) {
    this.text = text;
    this.finishReason = finishReason ?? '';
  }

  get isFinishReasonStop() {
    return this.finishReason === FINISH_REASON_STOP;
  }
}

/**
 * @param {Object} param
 * @param {Prompt} param.prompt
 * @returns {Promise<Completion>}
 */
const generateCompletion = async ({ prompt }: { prompt: any }) => {
  if (config.APP_ENV !== 'production')
    return new Completion({ text: MOCK_TEXT_OK });
  if (config.OPENAI_COMPLETION_MODEL === MODEL_GPT_3_5_TURBO) {
    const { data } = await createChatCompletion({ messages: prompt.messages });
    const [choice] = data.choices;
    return new Completion({
      text: choice.message.content.trim(),
      finishReason: choice.finish_reason,
    });
  }
  const { data } = await createTextCompletion({ prompt: prompt.toString() });
  const [choice] = data.choices;
  return new Completion({
    text: choice.text.trim(),
    finishReason: choice.finish_reason,
  });
};

export default generateCompletion;
