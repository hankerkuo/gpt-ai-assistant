import { AxiosError } from 'axios';
import fs from 'fs';
import config from '../config/index';
import { t } from '../locales/index';
import {
  MESSAGE_TYPE_IMAGE, MESSAGE_TYPE_TEXT, SOURCE_TYPE_GROUP, SOURCE_TYPE_USER,
} from '../services/line';
import {
  addMark,
  convertText,
  fetchAudio,
  fetchGroup,
  fetchUser,
  generateTranscription,
  logger
} from '../utils/index';
import { Command, COMMAND_BOT_RETRY } from './commands/index';
import { updateHistory } from './history/index';
import {
  ImageMessage, Message, TemplateMessage, TextMessage,
} from './messages/index';
import { Bot, Event, Source } from './models/index';
import { getSources, setSources } from './repository/index';

class Context {
  /**
   * @type {Event}
   */
  event;

  /**
   * @type {Source}
   */
  source: Source | undefined;

  /**
   * @type {string}
   */
  transcription: string | undefined;

  /**
   * @type {Array<Message>}
   */
  messages: Message[] = [];

  /**
   * @param {Event} event
   */
  constructor(event: Event) {
    this.event = event;
  }

  get id() {
    if (this.event.isGroup) return this.event.source.groupId;
    return this.event.source.userId;
  }

  /**
   * @returns {string}
   */
  get replyToken() {
    return this.event.replyToken;
  }

  /**
   * @returns {string}
   */
  get groupId(): string {
    return this.event.groupId;
  }

  /**
   * @returns {string}
   */
  get userId() {
    return this.event.userId;
  }

  /**
   * @returns {string}
   */
  get trimmedText() {
    if (this.event.isText) {
      const text = this.event.text.replaceAll('　', ' ').replace(config.BOT_NAME, '').trim();
      return addMark(text);
    }
    if (this.event.isAudio) {
      const text = this.transcription!.replace(config.BOT_NAME, '').trim();
      return addMark(text);
    }
    return '?';
  }

  get hasBotName() {
    if (this.event.isText) {
      const text = this.event.text.replaceAll('　', ' ').trim().toLowerCase();
      return text.startsWith(config.BOT_NAME.toLowerCase());
    }
    if (this.event.isAudio) {
      const text = this.transcription!.toLowerCase();
      return text.startsWith(config.BOT_NAME.toLowerCase());
    }
    return false;
  }

  async initialize() {
    try {
      this.validate();
      await this.register();
    } catch (err) {
      return this.pushError(err);
    }
    if (this.event.isAudio) {
      try {
        await this.transcribe();
      } catch (err) {
        return this.pushError(err);
      }
    }
    updateHistory(this.id, (history) => history.write(this.source!.name, this.trimmedText));
    return this;
  }

  /**
   * @throws {Error}
   */
  validate() {
    const sources = getSources();
    const groups = Object.values(sources).filter((source: any) => source.type === SOURCE_TYPE_GROUP);
    const users = Object.values(sources).filter((source: any) => source.type === SOURCE_TYPE_USER);
    if (this.event.isGroup && !sources[this.groupId] && groups.length >= config.APP_MAX_GROUPS) {
      throw new Error(t('__ERROR_MAX_GROUPS_REACHED'));
    }
    if (!sources[this.userId] && users.length >= config.APP_MAX_USERS) {
      throw new Error(t('__ERROR_MAX_USERS_REACHED'));
    }
  }

  async register() {
    const sources = getSources();
    const newSources: {[key: string]: Source} = {};
    if (this.event.isGroup && !sources[this.groupId]) {
      const { groupName } = await fetchGroup(this.groupId);
      newSources[this.groupId] = new Source({
        type: SOURCE_TYPE_GROUP,
        name: groupName,
        bot: new Bot({
          isActivated: !config.BOT_DEACTIVATED,
        }),
      });
    }
    if (!sources[this.userId]) {
      const { displayName } = await fetchUser(this.userId);
      newSources[this.userId] = new Source({
        type: SOURCE_TYPE_USER,
        name: displayName,
        bot: new Bot({
          isActivated: !config.BOT_DEACTIVATED,
        }),
      });
    }
    Object.assign(sources, newSources);
    if (Object.keys(newSources).length > 0) await setSources(sources);
    this.source = new Source(sources[this.id]);
  }

  async transcribe() {
    const buffer = await fetchAudio(this.event.messageId);
    const file = `/tmp/${this.event.messageId}.m4a`;
    fs.writeFileSync(file, buffer);
    const { text } = await generateTranscription({ file, buffer });
    this.transcription = convertText(text);
  }

  /**
   * @param {Object} param
   * @param {string} param.text
   * @param {Array<string>} param.aliases
   * @returns {boolean}
   */
  hasCommand({
    text,
    aliases,
  }: {text: string, aliases: string[]}) {
    const content = this.trimmedText.toLowerCase();
    if (aliases.some((alias) => content.startsWith(alias.toLowerCase()))) return true;
    if (content.startsWith(text.toLowerCase())) return true;
    return false;
  }

  /**
   * @param {string} text
   * @param {Array<Command>} actions
   * @returns {Context}
   */
  pushText(text: string, actions: Command[] = []) {
    if (!text) return this;
    const message = new TextMessage({
      text: convertText(text),
    });
    message.setQuickReply(actions);
    this.messages.push(message);
    return this;
  }

  /**
   * @param {string} url
   * @param {Array<Command>} actions
   * @returns {Context}
   */
  pushImage(url: string, actions = []) {
    if (!url) return this;
    const message = new ImageMessage({
      originalContentUrl: url,
      previewImageUrl: url,
    });
    message.setQuickReply(actions);
    this.messages.push(message);
    return this;
  }

  /**
   * @param {string} text
   * @param {Array<Command>} buttons
   * @param {Array<Command>} actions
   * @returns {Context}
   */
  pushTemplate(text: string, buttons: Command[] = [], actions: Command[] = []) {
    if (!text) return this;
    const message = new TemplateMessage({
      text,
      actions: buttons,
    });
    message.setQuickReply(actions);
    this.messages.push(message);
    return this;
  }

  /**
   * @param {AxiosError} err
   * @returns {Context}
   */
  pushError(err: any) {
    logger.error(err.message);
    if (err.code === 'ECONNABORTED') {
      if (config.ERROR_TIMEOUT_DISABLED) return this;
      logger.error('Timed out');
      return this.pushText(t('__ERROR_SYSTEM_UNSTABLE'), [COMMAND_BOT_RETRY]);
    }
    if (err.config?.baseURL) {
      logger.error(`${err.config.method.toUpperCase()} ${err.config.baseURL}${err.config.url}`);
    }
    if (err.response) {
      logger.error(`Request failed with status code ${err.response.status}`);
    }
    logger.error(err.message);
    this.pushText(t('__ERROR_SYSTEM_UNSTABLE'));
    return this;
  }
}

export default Context;
