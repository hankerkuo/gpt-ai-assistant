import { PrismaClient } from '@prisma/client';
import { logger } from '../utils/index.js';

let prisma = null;

function getPrisma() {
  if (!prisma) {
    synchronized(() => {
      if (!prisma) {
        logger.info('Creating new PrismaClient');
        prisma = new PrismaClient();
      }
    });
  }
  return prisma;
}

/**
 * Implements a simple lock to prevent multiple instances of PrismaClient
 * especially under high concurrency.
 * @param {function} task 
 * @returns 
 */
async function synchronized(task) {
  if (!synchronized.lock) {
    synchronized.lock = true;
    const result = await task();
    synchronized.lock = false;
    return result;
  } else {
    // function calls after the lock is released
    return new Promise(resolve => setImmediate(() => resolve(synchronized(task))));
  }
}

// TODO: Add a function to close the PrismaClient

export { getPrisma };