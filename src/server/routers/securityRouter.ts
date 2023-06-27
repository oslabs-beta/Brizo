import type { Request, Response } from 'express';
import express from 'express';
import localSecurityController from '../controllers/securityController';

const router = express.Router();

router.get(
  '/local/cis',
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  localSecurityController.runKubeBenchLocal,
  (req: Request, res: Response) => {
    res.status(200).json(res.locals.allTestInfo);
  }
);

router.get(
  '/eks/cis',
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  localSecurityController.runKubeBenchEKS,
  (req: Request, res: Response) => {
    res.status(200).json(res.locals.allTestInfoEKS);
  }
);

export default router;
