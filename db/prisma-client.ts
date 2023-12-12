import { PrismaClient } from '@prisma/client';
import { logger } from '../utils/index';

let prisma: PrismaClient | null = null;

async function getPrisma(): Promise<PrismaClient> {
  if (!prisma) {
    await synchronized(async () => {
      if (!prisma) {
        logger.info('Creating new PrismaClient');
        prisma = new PrismaClient();
      }
    });
  }
  return prisma as PrismaClient;
}

/**
 * Implements a simple lock to prevent multiple instances of PrismaClient
 * especially under high concurrency.
 * @param {function} task 
 * @returns 
 */

let lock: boolean = false;

async function synchronized(task: () => Promise<any>): Promise<any> {
  if (!lock) {
    lock = true;
    const result = await task();
    lock = false;
    return result;
  } else {
    return new Promise(resolve => setImmediate(() => resolve(synchronized(task))));
  }
}

// TODO: Add a function to close the PrismaClient

export { getPrisma };