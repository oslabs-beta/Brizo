import express from 'express';
import type { Request, Response } from 'express';
import prometheusController from '../controllers/prometheusController';

const router = express.Router();

// post request to grab default metrics
// use post request so we can set request body to an array of strings to query prometheus
router.post(
  '/metrics/default',
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  prometheusController.getDefaultMetrics,
  (req: Request, res: Response) => {
    res.status(200).json(res.locals.defaultMetrics);
  }
);

export default router;
