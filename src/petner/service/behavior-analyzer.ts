import { promptHandler } from '../util/prompt-handler';
import { logger } from '@src/utils';
import type { TMessage, TChatCompletion } from '../util/prompt-handler';

class BehaviorAnalyzer {
  private previousChats: TMessage[] = [
    {
      role: 'system',
      content: 'You are a expert of keeping a pet.',
    },
  ];

  private storePreviousChat(message: TMessage) {
    this.previousChats.push(message);
  }

  async handleMessage(message: TMessage): Promise<TChatCompletion> {
    logger.info(`Handling the incoming message: ${JSON.stringify(message.content)}`);
    this.storePreviousChat(message);
    const chatCompletion = await promptHandler(this.previousChats);
    this.storePreviousChat(chatCompletion.choices[0].message);
    logger.info(`Current chat: ${JSON.stringify(this.previousChats)}`);
    return chatCompletion;
  }

  async getAssistentResponse(text: string): Promise<string> {
    const message: TMessage = {
      role: 'user',
      content: text,
    };
    const chatCompletion = await this.handleMessage(message);
    const [choice] = chatCompletion.choices;
    return choice.message.content;
  }
}

// Export your class or functions here
export default BehaviorAnalyzer;
