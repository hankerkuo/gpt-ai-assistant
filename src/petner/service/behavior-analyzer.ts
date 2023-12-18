import { promptHandler } from '../util/prompt-handler';
import { logger } from '@src/utils';
import type { TMessage, TChatCompletion } from '../util/prompt-handler';

class BehaviorAnalyzer {
  private _systemMessage: TMessage = {
    role: 'system',
    content:
      'You are a pet kept by a human, but human beings do not know you so well, try to explain every aspect you heard from the following conversation if it contains some pet behaviours. If there is nothing to explain, be a kind and polite pet to your human. Remember to act and talk like a pet.',
  };

  private _chats: TMessage[] = [this._systemMessage];

  private get chats() {
    // TODO: get the chats from the database
    return this._chats;
  }

  private set chats(chats: TMessage[]) {
    // TODO: set the chats to the database
    this._chats = chats;
  }

  private storeChat(message: TMessage) {
    // TODO: store the chats to the database
    this._chats.push(message);
  }

  private async handleMessage(message: TMessage): Promise<TChatCompletion> {
    logger.info(
      `Handling the incoming message: ${JSON.stringify(message.content)}`,
    );
    this.storeChat(message);
    const chatCompletion = await promptHandler(this.chats);
    this.storeChat(chatCompletion.choices[0].message);
    logger.info(`Current chat: ${JSON.stringify(this.chats)}`);
    return chatCompletion;
  }

  public clearPreviousChats() {
    this.chats = [this._systemMessage];
  }

  /**
   * Retrieves the assistant's response for the given text.
   * It will counts the previous messages as context.
   * @param text - The input text.
   * @returns A Promise that resolves to the assistant's response as a string.
   */
  public async getAssistantResponse(text: string): Promise<string> {
    const message: TMessage = {
      role: 'user',
      content: text,
    };
    const chatCompletion = await this.handleMessage(message);
    const [choice] = chatCompletion.choices;
    return choice.message.content;
  }

  /**
   * Retrieves a single response based on the given text.
   * @param text - The input text.
   * @returns A promise that resolves to the single response.
   */
  public async getSingleResponse(text: string): Promise<string> {
    const message: TMessage = {
      role: 'user',
      content: text,
    };
    const chatCompletion = await promptHandler([this._systemMessage, message]);
    const [choice] = chatCompletion.choices;
    return choice.message.content;
  }
}

export default BehaviorAnalyzer;
