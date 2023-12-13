import { Command, ALL_COMMANDS } from '../app/commands/index';

/**
 * @param {string} text
 * @returns {Command}
 */
const getCommand = (text: string) =>
  Object.values(ALL_COMMANDS)
    .sort((a, b) => b.text.length - a.text.length)
    .find(
      (c) =>
        (c.aliases as string[]).includes(text) ||
        text.toLowerCase().includes(c.text.toLowerCase()),
    );

export default getCommand;
