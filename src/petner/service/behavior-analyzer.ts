import { promptHandler } from '../util/prompt-handler';
import { logger } from '@src/utils';
import type { TMessage, TChatCompletion } from '../util/prompt-handler';
import config from '@src/config';

class BehaviorAnalyzer {
  private _systemMessage: TMessage = {
    role: 'system',
    content: config.PROMPT_FOR_PETNER_ANALYZER,
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

  private async handleMessage(
    message: TMessage,
    type: 'chat' | 'single',
  ): Promise<TChatCompletion> {
    logger.info(
      `Handling the incoming message: ${JSON.stringify(
        message.content,
      )}, with type: ${type}`,
    );
    switch (type) {
      case 'chat':
        this.storeChat(message);
        const chatCompletion = await promptHandler(this.chats);
        this.storeChat(chatCompletion.choices[0].message);
        logger.info(`Current chat: ${JSON.stringify(this.chats)}`);
        return chatCompletion;
      case 'single':
        const singleCompletion = await promptHandler([
          this._systemMessage,
          message,
        ]);
        logger.info(
          `Current chat: ${JSON.stringify([
            this._systemMessage,
            singleCompletion.choices[0].message,
          ])}`,
        );
        return singleCompletion;
      default:
        throw new Error(`Unknown type: ${type}`);
    }
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
    const chatCompletion = await this.handleMessage(message, 'chat');
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
    const chatCompletion = await this.handleMessage(message, 'single');
    const [choice] = chatCompletion.choices;
    return choice.message.content;
  }
}

export default BehaviorAnalyzer;
