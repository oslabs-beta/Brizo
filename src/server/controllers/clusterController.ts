import type { Request, Response, NextFunction } from 'express';
import type {
  clusterControllerType,
  newPodObject,
  newNodeObject
} from '../../../types';
import os from 'os';
import * as k8s from '@kubernetes/client-node';

// declare kube file path
const KUBE_FILE_PATH = `${os.homedir()}/.kube/config`;

// create new kubeconfig class
const kc = new k8s.KubeConfig();

// load from kube config file
kc.loadFromFile(KUBE_FILE_PATH);

// make api client
const k8sApi = kc.makeApiClient(k8s.CoreV1Api);

const clusterController: clusterControllerType = {
  getPods: async (req: Request, res: Response, next: NextFunction) => {
    // destructure namespace of interest from request params
    const { nodeName } = req.params;

    try {
      // fetch pods from k8s api for given namespace
      const result = await k8sApi.listPodForAllNamespaces(undefined, undefined, `spec.nodeName=${nodeName}`);

      // extract list of pod objects from result
      const podList = result.body.items;

      // initialize filtered pod list as empty array
      const filteredPodList: newPodObject[] = [];

      // iterate over podList
      podList.forEach((pod) => {
        // declare pod object info variables
        const nodeName = pod.spec?.nodeName;
        const podName = pod.metadata?.name;
        const uid = pod.metadata?.uid;
        const containers = pod.spec?.containers;
        const hostIP = pod.status?.hostIP;
        const phase = pod.status?.phase;
        const podIPs = pod.status?.podIPs;

        // create pod object
        const podObject: newPodObject = {
          nodeName,
          podName,
          uid,
          containers,
          hostIP,
          phase,
          podIPs
        };

        // push pod object to filtered list
        filteredPodList.push(podObject);
      });

      // save podListByNode to res.locals
      res.locals.filteredPodList = filteredPodList;

      // move to next middleware
      next();
    } catch (error) {
      // error handling
      console.log('Error getting list of pods.');
      next(error);
    }
  },

  getNodes: async (req: Request, res: Response, next: NextFunction) => {
    // destructure namespace from request params
    const { namespace } = req.params;

    try {
      // fetch nodes from k8s api for given namespace
      const result = await k8sApi.listNode(namespace);

      // extract list of nodes from result body
      const nodeList = result.body.items;

      // initialize filtered node list as empty array
      const filteredNodeList: newNodeObject[] = [];

      // iterate over node list
      nodeList.forEach((node) => {
        // declare node object info variables
        const name = node.metadata?.name;
        const uid = node.metadata?.uid;
        const podCIDRs = node.spec?.podCIDRs;
        const addresses = node.status?.addresses;
        const allocatable = node.status?.allocatable;
        const capacity = node.status?.capacity;
        const images = node.status?.images;

        // create node object
        const nodeObject: newNodeObject = {
          name,
          uid,
          podCIDRs,
          addresses,
          allocatable,
          capacity,
          images
        };

        // push node object to filtered node list
        filteredNodeList.push(nodeObject);
      });
      // store node list on res.locals
      res.locals.filteredNodeList = filteredNodeList;

      // move to next middleware
      next();
    } catch (error) {
      // error handling
      console.log('Error getting nodes.');
      next(error);
    }
  },

  getNamespaces: async (req: Request, res: Response, next: NextFunction) => {
    try {
      // fetch list of namespaces from k8s api
      const namespaceData = await k8sApi.listNamespace();

      // iterate through data and isolate namespace name, uid, and status for each namespace
      const namespaceList = namespaceData.body.items.map(
        (namespace) => {
          return {
            name: namespace.metadata?.name,
            uid: namespace.metadata?.uid,
            status: namespace.status?.phase
          };
        }
      );

      // store namespace list on res.locals
      res.locals.namespaceList = namespaceList;
      // move to next middleware
      next();
    } catch (error) {
      // error handling
      console.log('Error getting namespaces.');
      next(error);
    }
  }
};

export default clusterController;
