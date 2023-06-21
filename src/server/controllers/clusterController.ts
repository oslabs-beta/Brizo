import { Request, Response, NextFunction } from 'express';
import { clusterControllerType, namespaceMapType, podObject, podListByNode, nodeObject, nodeObjectList, newNodeObject } from '../../../types';


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
      const podListByNode: podListByNode = {};

      // iterate over podList 
      podList.forEach(pod => {
        // decalre nodeName and podName
        const nodeName = pod.spec.nodeName;
        const podName = pod.metadata.name;

        // check if nodeName does not already exist on podListByNode object
        if (!podListByNode[nodeName]) {
          // assign empty object to the new node name
          podListByNode[nodeName] = {};
        }
        // assign pod object as value at key of podName for the given node
        podListByNode[nodeName][podName] = pod;
      });

      // save podListByNode to res.locals
      // this is an object with node names as keys 
        // each node name key is an object with pod names as keys
          // each pod name key is an object with the pod object info as its value 
      res.locals.podListByNode = podListByNode;

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

      const nodeObjectList: nodeObjectList = {};

      nodeList.forEach(node => {
        const uid = node.metadata.uid;
        const podCIDRs = node.spec.podCIDRs;
        const addresses = node.status.addresses;
        const allocatable = node.status.allocatable;
        const capacity = node.status.capacity;
        const images = node.status.images;

        const nodeObject: newNodeObject = {
          uid: uid,
          podCIDRs: podCIDRs,
          addresses: addresses,
          allocatable: allocatable,
          capacity: capacity,
          images: images
        };

        const nodeName = node.metadata.name;
          nodeObjectList[nodeName] = nodeObject;
      });
      // store node list on res.locals
      res.locals.nodeObjectList = nodeObjectList;

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
