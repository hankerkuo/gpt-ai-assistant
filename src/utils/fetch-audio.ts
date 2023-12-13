import { fetchContent } from '../services/line';

/**
 * @param {string} messageId
 * @returns {Promise<Buffer>}
 */
const fetchAudio = async (messageId: any) => {
  const { data } = await fetchContent({ messageId });
  return Buffer.from(data, 'binary');
};

export default fetchAudio;
