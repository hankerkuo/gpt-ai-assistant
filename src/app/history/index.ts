import History from './history';

const histories = new Map();

/**
 * @param {string} contextId
 * @returns {History}
 */
const getHistory = (contextId: string) =>
  histories.get(contextId) || new History();

/**
 * @param {string} contextId
 * @param {History} history
 * @returns {History}
 */
const setHistory = (contextId: string, history: History) =>
  histories.set(contextId, history);

/**
 * @param {string} contextId
 * @param {function(History)} callback
 */
const updateHistory = (
  contextId: string,
  callback: (history: History) => History | void,
) => {
  const history = getHistory(contextId);
  callback(history);
  setHistory(contextId, history);
};

/**
 * @param {string} userId
 */
const removeHistory = (userId: string) => {
  histories.delete(userId);
};

const printHistories = () => {
  const messages = Array.from(histories.keys())
    .filter((contextId) => getHistory(contextId).messages.length > 0)
    .map(
      (contextId) =>
        `\n=== ${contextId.slice(0, 6)} ===\n\n${getHistory(
          contextId,
        ).toString()}\n`,
    );
  if (messages.length < 1) return;
  console.info(messages.join(''));
};

export { getHistory, setHistory, updateHistory, removeHistory, printHistories };

export default histories;
