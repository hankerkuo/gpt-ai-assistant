import Prompt from './prompt';

const prompts = new Map();

/**
 * @param {string} userId
 * @returns {Prompt}
 */
const getPrompt = (userId: string) => prompts.get(userId) || new Prompt();

/**
 * @param {string} userId
 * @param {Prompt} prompt
 */
const setPrompt = (userId: string, prompt: string) => {
  prompts.set(userId, prompt);
};

/**
 * @param {string} userId
 */
const removePrompt = (userId: string) => {
  prompts.delete(userId);
};

const printPrompts = () => {
  if (Array.from(prompts.keys()).length < 1) return;
  const content = Array.from(prompts.keys()).map((userId) => `\n=== ${userId.slice(0, 6)} ===\n${getPrompt(userId)}\n`).join('');
  console.info(content);
};

export {
  Prompt,
  getPrompt,
  setPrompt,
  removePrompt,
  printPrompts,
};

export default prompts;
