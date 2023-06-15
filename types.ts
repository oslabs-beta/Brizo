import { Request, Response, NextFunction } from 'express';

export type ServerError = {
  err: '400';
};

export type clusterControllerType = {
  getPods: (req: Request, res: Response, next: NextFunction) => void;
  getNodes: (req: Request, res: Response, next: NextFunction) => void;
  getNamespaces: (req: Request, res: Response, next: NextFunction) => void;
}