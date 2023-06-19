import { Request, Response, NextFunction } from 'express';
import { clusterControllerType } from '../../../types';
import { namespaceMapObjectType } from '../../../types';

const os = require('os');


const KUBE_FILE_PATH = `${os.homedir()}/.kube/config`;

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
    console.log(req.params);
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
      const namespaceData = await k8sApi.listNamespace();

      // iterate through data and isolate namespace name, uid, and status for each namespace
      const namespaceList = namespaceData.body.items.map((namespace: namespaceMapObjectType) => {
        return {
          name: namespace.metadata.name,
          uid: namespace.metadata.uid,
          status: namespace.status.phase
        }
      });


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