import express, { Express, Request, Response, ErrorRequestHandler, NextFunction } from 'express';
import clusterController from '../controllers/clusterController';

const router = express.Router();

// get request for namespace list
router.get(
  '/namespaces', 
  clusterController.getNamespaces,
  (req: Request, res: Response) => {
    res.status(200).json(res.locals.namespaceList);
  }
);

// get request for pod list
router.get(
  '/pod/:namespace', 
  clusterController.getPods,
  (req: Request, res: Response) => {
    res.status(200).json(res.locals.podList);
  }
);


// get request for node list
router.get(
  '/node/:namespace', 
  clusterController.getNodes,
  (req: Request, res: Response) => {
    res.status(200).json(res.locals.nodeList);
  }
);

export default router;