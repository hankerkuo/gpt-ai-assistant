class Command {
  type;

  label;

  text;

  reply;

  prompt;

  aliases;

  constructor({
    type,
    label,
    text,
    reply = '',
    prompt = '',
    aliases = [],
  }: {
    type: string;
    label: string;
    text: string;
    reply?: string;
    prompt?: string;
    aliases?: string[];
  }) {
    this.type = type;
    this.label = label;
    this.text = text;
    this.reply = reply;
    this.prompt = prompt;
    this.aliases = aliases;
  }
}

export default Command;
