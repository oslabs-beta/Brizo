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
  remediations: String[],
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

export type namespaceMapType = {
  metadata: {
    name: String,
    uid: String
  },
  status: {
    phase: String
  }
}

export type namespaceObject = {
  name: String,
  uid: String,
  status: String
}

export type podListByNode = {
  [nodeName: string] : {
    [podName: string]: podObject
  };
}

export type podObject = {
  metadata: {
    annotations: {
      [key: string]: string;
    };
    creationTimestamp: string;
    generateName: string;
    labels: {
      [key: string]: string;
    };
    managedFields: {
      apiVersion: string;
      fieldsType: string;
      fieldsV1: {
        [key: string]: any;
      };
      manager: string;
      operation: string;
      time: string;
      subresource?: string;
    }[];
    name: string;
    namespace: string;
    ownerReferences: {
      apiVersion: string;
      blockOwnerDeletion: boolean;
      controller: boolean;
      kind: string;
      name: string;
      uid: string;
    }[];
    resourceVersion: string;
    uid: string;
  };
  spec: {
    automountServiceAccountToken: boolean;
    containers: {
      env: {
        name: string;
        valueFrom?: {
          fieldRef?: {
            apiVersion: string;
            fieldPath: string;
          };
          secretKeyRef?: {
            key: string;
            name: string;
          };
        };
        value?: string;
      }[];
      image: string;
      imagePullPolicy: string;
      livenessProbe: {
        failureThreshold: number;
        httpGet: {
          path: string;
          port: number;
          scheme: string;
        };
        initialDelaySeconds: number;
        periodSeconds: number;
        successThreshold: number;
        timeoutSeconds: number;
      };
      name: string;
      ports: {
        containerPort: number;
        name: string;
        protocol: string;
      }[];
      readinessProbe: {
        failureThreshold: number;
        httpGet: {
          path: string;
          port: number;
          scheme: string;
        };
        periodSeconds: number;
        successThreshold: number;
        timeoutSeconds: number;
      };
      resources: any;
      securityContext: {
        allowPrivilegeEscalation: boolean;
        capabilities: {
          drop: string[];
        };
        seccompProfile: {
          type: string;
        };
      };
      terminationMessagePath: string;
      terminationMessagePolicy: string;
      volumeMounts: {
        mountPath: string;
        name: string;
        subPath?: string;
        readOnly?: boolean;
      }[];
    }[];
    dnsPolicy: string;
    enableServiceLinks: boolean;
    nodeName: string;
    preemptionPolicy: string;
    priority: number;
    restartPolicy: string;
    schedulerName: string;
    securityContext: {
      fsGroup: number;
      runAsGroup: number;
      runAsNonRoot: boolean;
      runAsUser: number;
    };
    serviceAccount: string;
    serviceAccountName: string;
    terminationGracePeriodSeconds: number;
    tolerations: {
      effect: string;
      key: string;
      operator: string;
      tolerationSeconds: number;
    }[];
    volumes: {
      configMap?: {
        defaultMode: number;
        name: string;
      };
      emptyDir?: {};
      name: string;
      projected?: {
        defaultMode: number;
        sources: {
          serviceAccountToken?: {
            expirationSeconds: number;
            path: string;
          };
          configMap?: {
            items: {
              key: string;
              path: string;
            }[];
          };
        }[];
      };
    }[];
  };
  status: {
    conditions: {
      lastProbeTime: string | null;
      lastTransitionTime: string;
      status: string;
      type: string;
    }[];
    containerStatuses: {
      containerID: string;
      image: string;
      imageID: string;
      lastState: {
        terminated: {
          containerID: string;
          exitCode: number;
          finishedAt: string;
          reason: string;
          startedAt: string;
        };
      };
      name: string;
      ready: boolean;
      restartCount: number;
      started: boolean;
      state: {
        running: {
          startedAt: string;
        };
      };
    }[];
    hostIP: string;
    phase: string;
    podIP: string;
    podIPs: {
      ip: string;
    }[];
    qosClass: string;
    startTime: string;
  };
};

export type containerObject = {
  env: {
    name: string;
    value?: string;
    valueFrom?: {
      fieldRef?: {
        apiVersion: string;
        fieldPath: string;
      };
      secretKeyRef?: {
        key: string;
        name: string;
      };
    };
  }[];
  image: string;
  imagePullPolicy: string;
  livenessProbe?: {
    failureThreshold: number;
    httpGet: {
      path: string;
      port: number;
      scheme: string;
    };
    initialDelaySeconds: number;
    periodSeconds: number;
    successThreshold: number;
    timeoutSeconds: number;
  };
  name: string;
  ports: {
    containerPort: number;
    name: string;
    protocol: string;
  }[];
  readinessProbe?: {
    failureThreshold: number;
    httpGet: {
      path: string;
      port: number;
      scheme: string;
    };
    periodSeconds: number;
    successThreshold: number;
    timeoutSeconds: number;
  };
  resources: {};
  securityContext: {
    allowPrivilegeEscalation: boolean;
    capabilities: {
      drop: string[];
    };
    seccompProfile: {
      type: string;
    };
  };
  terminationMessagePath: string;
  terminationMessagePolicy: string;
  volumeMounts: {
    mountPath: string;
    name: string;
    subPath?: string;
    readOnly?: boolean;
  }[];
};

export type newPodObject = {
  nodeName: string;
  podName: string;
  uid: string;
  containers: containerObject[];
  hostIP: string;
  phase: string;
  podIPs: {ip: string}[]
}

export type nodeObject = {
  metadata: {
    annotations: {
      [key: string]: string;
    };
    creationTimestamp: string;
    labels: {
      [key: string]: string;
    };
    managedFields: {
      apiVersion: string;
      fieldsType: string;
      fieldsV1: {
        [key: string]: {
          [key: string]: {
            [key: string]: {
              [key: string]: {
                [key: string]: {
                  [key: string]: {
                    [key: string]: {
                      [key: string]: string;
                    };
                  };
                };
              };
            };
          };
        };
      };
      manager: string;
      operation: string;
      time: string;
      subresource?: string;
    }[];
    name: string;
    resourceVersion: string;
    uid: string;
  };
  spec: {
    podCIDR: string;
    podCIDRs: string[];
  };
  status: {
    addresses: {
      address: string;
      type: string;
    }[];
    allocatable: allocatableObject[],
    capacity: capacityObject[];
    conditions: {
      lastHeartbeatTime: string;
      lastTransitionTime: string;
      message: string;
      reason: string;
      status: string;
      type: string;
    }[];
    daemonEndpoints: {
      kubeletEndpoint: {
        Port: number;
      };
    };
    images: {
      names: string[];
      sizeBytes: number;
    }[];
    nodeInfo: {
      bootID: string;
    };
  };
};

export type newNodeObject = {
  name: String,
  uid: String,
  podCIDRs: String[],
  addresses: addressObject[],
  allocatable: allocatableObject[],
  capacity: capacityObject[],
  images: {
    names: String[],
    sizeBytes: number
  }[]
}

export type nodeObjectList = {
  [nodeName: string] : newNodeObject
}

export type addressObject = {
  address: string;
  type: string;
}

export type allocatableObject = {
  cpu: String,
  'ephemeral-storage': String,
  'hugepages-1Gi': String,
  'hugepages-2Mi': String,
  'hugepages-32Mi': String,
  'hugepages-64Ki': String,
  memory: String,
  pods: String
}

export type capacityObject = {
  cpu: String,
  'ephemeral-storage': String,
  'hugepages-1Gi': String,
  'hugepages-2Mi': String,
  'hugepages-32Mi': String,
  'hugepages-64Ki': String,
  memory: String,
  pods: String
}

export type nodeCardProps = {
  key: string;
  name: string;
  uid: string;
  podCIDRs: String[];
  addresses: addressObject[];
  allocatable: allocatableObject[];
  capacity: capacityObject[];
  images: string;
}