import express, { Express, Request, Response, ErrorRequestHandler, NextFunction } from 'express';
import securityController from '../controllers/securityController';

const router = express.Router();

router.get('/cis', 
  securityController.runKubeBench,
  (req: Request, res: Response) => {
    res.status(200).json(res.locals.cpsctArr);
  }
)


export default router;