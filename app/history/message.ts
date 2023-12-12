class Message {
  role: string;
  content: string;

  constructor({ role, content }: { role: string; content: string }) {
    this.role = role;
    this.content = content;
  }

  toString() {
    return `${this.role}: ${this.content}`;
  }
}

export default Message;
