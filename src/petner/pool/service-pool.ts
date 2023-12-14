import BehaviorAnalyzer from '../service/behavior-analyzer';
import { logger } from '@src/utils';
import { Request } from 'express';

class ServicePool {
  private static behaviorAnalyzerPool: Map<string, BehaviorAnalyzer> =
    new Map();

  static getBehaviorAnalyzer(req: Request): BehaviorAnalyzer {
    const session = req.headers['petner-session'];

    if (!session) {
      throw new Error('Session is undefined, cannot provide BehaviorAnalyzer');
    }

    logger.info(`Get BehaviorAnalyzer for session: ${session}`);

    if (!this.behaviorAnalyzerPool.has(session.toString())) {
      const behaviorAnalyzer = new BehaviorAnalyzer();
      ServicePool.behaviorAnalyzerPool.set(
        session.toString(),
        behaviorAnalyzer,
      );
    }

    return ServicePool.behaviorAnalyzerPool.get(session.toString())!;
  }
}

export default ServicePool;
