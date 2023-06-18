import { Request, Response, NextFunction } from 'express';

export type ServerError = {
  err: '400';
};

export type clusterControllerType = {
  getPods: (req: Request, res: Response, next: NextFunction) => void;
  getNodes: (req: Request, res: Response, next: NextFunction) => void;
  getNamespaces: (req: Request, res: Response, next: NextFunction) => void;
}

export type indexObjectType = {
  position: number,
  assigned: boolean
}

export type sectionResultsInfo = {
  testResults: String[],
  // remediations: String[][],
  summary: String[]
}

export type testResultsObjectType = {
  controlPlaneSecurityConfiguration: sectionResultsInfo,
  etcdNodeConfiguration: sectionResultsInfo,
  controlPlaneConfiguration: sectionResultsInfo,
  workerNodeSecurity: sectionResultsInfo,
  kubernetesPolicies: sectionResultsInfo,
  totalSummary: String[]
}