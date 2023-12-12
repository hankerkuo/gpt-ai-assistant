import {
  TYPE_SUM,
  TYPE_ANALYZE,
  TYPE_TRANSLATE,
} from '../../constants/command';

class Message {
  role;

  content: string;

  constructor({ role, content }: { role: string; content: string }) {
    this.role = role;
    this.content = content;
  }

  get isEnquiring() {
    return (
      this.content === TYPE_SUM ||
      this.content === TYPE_ANALYZE ||
      this.content === TYPE_TRANSLATE
    );
  }

  toString() {
    return this.role ? `\n${this.role}: ${this.content}` : this.content;
  }
}

export default Message;
