import express from 'express';
import type { Request, Response } from 'express';
import prometheusController from '../controllers/prometheusController';

const router = express.Router();

// post request to grab static metrics
// use post request so we can set request body to an array of strings to query prometheus with
router.post(
  '/metrics/static',
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  prometheusController.getStaticMetrics,
  (req: Request, res: Response) => {
    res.status(200).json(res.locals.staticMetrics);
  }
);

router.post(
  '/metrics/dynamic',
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  prometheusController.getDynamicMetrics,
  (req: Request, res: Response) => {
    res.status(200).json(res.locals.dynamicMetrics);
  }
);

export default router;
