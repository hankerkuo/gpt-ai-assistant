import { createAudioTranscriptions } from '../services/openai';

class Transcription {
  text: string;

  constructor({ text }: { text: string }) {
    this.text = text;
  }
}

/**
 * @param {Object} param
 * @param {Buffer} param.buffer
 * @param {string} param.file
 * @returns {Promise<Image>}
 */
const generateTranscription = async ({
  buffer,
  file,
}: {
  buffer: Buffer;
  file: string;
}) => {
  const { data } = await createAudioTranscriptions({ buffer, file });
  return new Transcription(data);
};

export default generateTranscription;
