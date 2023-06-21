import express from 'express';
import clusterRouter from './clusterRouter';
import securityRouter from './securityRouter';

const router = express.Router();

router.use('/cluster', clusterRouter);
router.use('/security', securityRouter);

export default router;
