import { Request, Response, NextFunction } from 'express';
import { clusterControllerType } from '../../../types';

// file path import from .env
require('dotenv').config();
const KUBE_FILE_PATH = process.env.KUBE_FILE_PATH;

// declare k8s client node
const k8s = require('@kubernetes/client-node');

// create new kubeconfig class
const kc = new k8s.KubeConfig();

// load from kube config file 
kc.loadFromFile(KUBE_FILE_PATH);

// make api client
const k8sApi = kc.makeApiClient(k8s.CoreV1Api);

const clusterController: clusterControllerType = {

  getPods: async (req: Request, res: Response, next: NextFunction) => {
    
    // destructure namespace of interest from request params
    const { namespace } = req.params;
    
    try {
      // fetch pods from k8s api for given namespace
      const result = await k8sApi.listNamespacedPod(namespace);

      // extract list of pods from result
      const podList = result.body.items;

      // save list of pods on res.locals
      res.locals.podList = podList;

      // move to next middleware
      return next();
    } catch(error) {

      // error handling
      console.log('Error getting list of pods.');
      return next(error);
    }
  },

  getNodes: async (req: Request, res: Response, next: NextFunction) => {
    
    // destructure namespace from request params
    const { namespace } = req.params;

    try {

      // fetch nodes from k8s api for given namespace
      const result = await k8sApi.listNode(namespace);

      // extract list of nodes from result body
      const nodeList = result.body;

      // store node list on res.locals
      res.locals.nodeList = nodeList;

      // move to next middleware
      return next();
    } catch(error) {

      // error handling
      console.log('Error getting nodes.');
      return next(error);
    }
  },

  getNamespaces: async (req: Request, res: Response, next: NextFunction) => {
    
    try {

      // fetch list of namespaces from k8s api
      const namespaceList = await k8sApi.listNamespace();

      // store namespace list on res.locals
      res.locals.namespaceList = namespaceList;

      // move to next middleware
      return next();
    } catch(error) {

      // error handling
      console.log('Error getting namespaces.');
      return next(error);
    }
  }
};

export default clusterController;