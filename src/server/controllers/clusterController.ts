import { Request, Response, NextFunction } from 'express';
import {
  clusterControllerType,
  newPodObject,
  namespaceMapType,
  podObject,
  podListByNode,
  nodeObject,
  nodeObjectList,
  newNodeObject,
} from '../../../types';

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

      // extract list of pod objects from result
      const podList: podObject[] = result.body.items;

      // initialize pod list by node object as empty {}
      const filteredPodList: newPodObject[] = [];

      // iterate over podList
      podList.forEach((pod) => {
        // declare values for new filtered pod object
        const nodeName = pod.spec.nodeName;
        const podName = pod.metadata.name;
        const uid = pod.metadata.uid;
        const containers = pod.spec.containers;
        const hostIP = pod.status.hostIP;
        const phase = pod.status.phase;
        const podIPs = pod.status.podIPs;

        // create new filtered pod object
        const podObject: newPodObject = {
          nodeName: nodeName,
          podName: podName,
          uid: uid,
          containers: containers,
          hostIP: hostIP,
          phase: phase,
          podIPs: podIPs,
        };

        // push new filtered pod object to filtered pod list
        filteredPodList.push(podObject);
      });

      // save filteredPodList to res.locals
      res.locals.filteredPodList = filteredPodList;

      // move to next middleware
      return next();
    } catch (error) {
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
      const nodeList: nodeObject[] = result.body.items;

      // initialize filteredNodeList array
      const filteredNodeList: newNodeObject[] = [];

      // iterate over nodeList
      nodeList.forEach((node) => {
        // declare variables to be assigned to new filtered node object
        const name = node.metadata.name;
        const uid = node.metadata.uid;
        const podCIDRs = node.spec.podCIDRs;
        const addresses = node.status.addresses;
        const allocatable = node.status.allocatable;
        const capacity = node.status.capacity;
        const images = node.status.images;

        // create new filtered node object
        const nodeObject: newNodeObject = {
          name: name,
          uid: uid,
          podCIDRs: podCIDRs,
          addresses: addresses,
          allocatable: allocatable,
          capacity: capacity,
          images: images,
        };

        // push new filtered node object to filteredNodeList
        filteredNodeList.push(nodeObject);
      });

      // store filtered node list on res.locals
      res.locals.filteredNodeList = filteredNodeList;

      // move to next middleware
      return next();
    } catch (error) {
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
      const namespaceList = namespaceData.body.items.map(
        (namespace: namespaceMapType) => {
          return {
            name: namespace.metadata.name,
            uid: namespace.metadata.uid,
            status: namespace.status.phase,
          };
        }
      );

      // store namespace list on res.locals
      res.locals.namespaceList = namespaceList;

      // move to next middleware
      return next();
    } catch (error) {
      // error handling
      console.log('Error getting namespaces.');
      return next(error);
    }
  },
};

export default clusterController;
