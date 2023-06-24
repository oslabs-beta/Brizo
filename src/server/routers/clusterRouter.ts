import express from 'express';
import type { Request, Response } from 'express';
import clusterController from '../controllers/clusterController';

const router = express.Router();

// get request for namespace list
router.get(
  '/namespaces',
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  clusterController.getNamespaces,
  (req: Request, res: Response) => {
    res.status(200).json(res.locals.namespaceList);
  }
);

// get request for node list
router.get(
  '/node/:namespace',
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  clusterController.getNodes,
  (req: Request, res: Response) => {
    res.status(200).json(res.locals.filteredNodeList);
  }
);

// get request for pod list
router.get(
  '/pod/:namespace',
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  clusterController.getPods,
  (req: Request, res: Response) => {
    res.status(200).json(res.locals.filteredPodList);
  }
);

export default router;
