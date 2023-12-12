import { MESSAGE_TYPE_TEMPLATE, TEMPLATE_TYPE_BUTTONS } from '../../services/line';
import { MessageAction } from '../actions/index';
import Message from './message';

class TemplateMessage extends Message {
  type = MESSAGE_TYPE_TEMPLATE;

  altText;

  template;

  constructor({
    text,
    actions,
  }: {
    text: string,
    actions: any[],
  }) {
    super();
    this.altText = text;
    this.template = {
      type: TEMPLATE_TYPE_BUTTONS,
      text,
      actions: actions.map((action) => new MessageAction(action)),
    };
  }
}

export default TemplateMessage;
