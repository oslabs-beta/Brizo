import express from 'express';
import clusterRouter from './clusterRouter';
import securityRouter from './securityRouter';
import prometheusRouter from './prometheusRouter';
import k6Router from './k6Router';

// declare express router
const router = express.Router();

// set up routes to sub-routers for specific use cases
router.use('/cluster', clusterRouter);
router.use('/security', securityRouter);
router.use('/prom', prometheusRouter);
router.use('/k6', k6Router);

export default router;
