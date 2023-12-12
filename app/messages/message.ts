import { QUICK_REPLY_TYPE_ACTION } from '../../services/line';
import { MessageAction } from '../actions/index';
import { Command } from '../commands/index';

class Message {
  type: any;

  quickReply: any;

  /**
   * @param {Array<Command>} actions
   */
  setQuickReply(actions: Command[] = []) {
    if (actions.length < 1) return;
    this.quickReply = {
      items: actions.map((action) => ({
        type: QUICK_REPLY_TYPE_ACTION,
        action: new MessageAction(action),
      })),
    };
  }
}

export default Message;
