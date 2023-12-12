import config from '../config/index';
import { MOCK_TEXT_OK } from '../constants/mock';
import { createImage } from '../services/openai';

class Image {
  url: string;

  constructor({
    url,
  }: {
    url: string;
  }) {
    this.url = url;
  }
}

/**
 * @param {Object} param
 * @param {string} param.prompt
 * @param {string} param.size
 * @returns {Promise<Image>}
 */
const generateImage = async ({
  prompt,
  size,
}: {
  prompt: string;
  size: string;
}) => {
  if (config.APP_ENV !== 'production') return new Image({ url: MOCK_TEXT_OK });
  const { data } = await createImage({ prompt, size });
  const [image] = data.data;
  return new Image(image);
};

export default generateImage;
