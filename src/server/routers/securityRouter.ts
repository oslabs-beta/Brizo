import express, { Request, Response } from 'express';
import securityController from '../controllers/securityController';

const router = express.Router();

router.get(
  '/cis',
  securityController.runKubeBench,
  (req: Request, res: Response) => {
    res.status(200).json(res.locals.allTestInfo);
  }
);

export default router;
