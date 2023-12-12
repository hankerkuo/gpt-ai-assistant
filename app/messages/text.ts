import { MESSAGE_TYPE_TEXT } from '../../services/line';
import Message from './message';

class TextMessage extends Message {
  type = MESSAGE_TYPE_TEXT;

  text: string; // Add type annotation for 'text' property

  constructor({
    text, // Add type annotation for 'text' parameter
  }: { text: string }) {
    super();
    this.text = text;
  }
}

export default TextMessage;
