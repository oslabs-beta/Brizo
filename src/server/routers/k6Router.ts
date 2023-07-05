import express from 'express';
import type { Request, Response } from 'express';
import k6Controller from '../controllers/k6Controller';

const router = express.Router();

// get request to run autocaling test with k6
router.get(
  '/autoscale',
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  k6Controller.runScalingTest,
  (req: Request, res: Response) => {
    res.sendStatus(200);
  }
);

export default router;
