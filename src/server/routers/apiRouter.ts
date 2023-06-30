import express from 'express';
import clusterRouter from './clusterRouter';
import securityRouter from './securityRouter';
import prometheusRouter from './prometheusRouter';

const router = express.Router();

router.use('/cluster', clusterRouter);
router.use('/security', securityRouter);
router.use('/prom', prometheusRouter);
export default router;
