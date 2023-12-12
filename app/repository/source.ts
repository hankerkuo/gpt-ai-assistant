import storage from '../../storage/index';
import { Source } from '../models/index';

const FIELD_KEY = 'sources';

/**
 * @returns {Object.<string, Source>}
 */
const getSources = () => storage.getItem(FIELD_KEY) || {};

/**
 * @param {Object.<string, Source>} sources
 */
const setSources = (sources: Record<string, Source>) =>
  storage.setItem(FIELD_KEY, sources);

/**
 * @param {string} contextId
 * @param {function(Source)} callback
 */
const updateSources = async (
  contextId: string,
  callback: (source: Source) => void,
) => {
  const sources = getSources();
  callback(sources[contextId]);
  await setSources(sources);
};

export { getSources, setSources, updateSources };
