import { MESSAGE_TYPE_IMAGE } from '@src/services/line';
import Message from './message';

class ImageMessage extends Message {
  type = MESSAGE_TYPE_IMAGE;

  originalContentUrl: string;

  previewImageUrl: string;

  constructor({
    originalContentUrl,
    previewImageUrl,
  }: {
    originalContentUrl: string;
    previewImageUrl: string;
  }) {
    super();
    this.originalContentUrl = originalContentUrl;
    this.previewImageUrl = previewImageUrl;
  }
}

export default ImageMessage;
