import { ACTION_TYPE_MESSAGE } from '../../services/line';
import Action from './action';

class MessageAction extends Action {
  type = ACTION_TYPE_MESSAGE;

  label: string;

  text: string;

  constructor({ label, text }: { label: string; text: string }) {
    super();
    this.label = label;
    this.text = text;
  }
}

export default MessageAction;
