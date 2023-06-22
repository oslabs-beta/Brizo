import type { Request, Response } from 'express';
import express from 'express';
import securityController from '../controllers/securityController';

const router = express.Router();

router.get(
  '/cis',
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  securityController.runKubeBench,
  (req: Request, res: Response) => {
    res.status(200).json(res.locals.allTestInfo);
  }
);

export default router;
