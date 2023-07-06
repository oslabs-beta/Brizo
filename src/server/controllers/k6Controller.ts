import type { Request, Response, NextFunction } from 'express';
import { exec } from 'child_process';

const k6Controller = {
  runScalingTest: async (req: Request, res: Response, next: NextFunction) => {
    try {
      // define command to run the k6 auto scaling test
      const command = 'k6 cloud k6/script.js';

      // run command with exec
      exec(command, (error) => {
        // error handling
        if (error !== null) {
          next(error);
        }
      });
      // move to next middleware
      next();
    } catch (error) {
      // error handling
      next(error);
    }
  }
};

export default k6Controller;
