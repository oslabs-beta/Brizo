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
};

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
    allocatable: {
      cpu: string;
      "ephemeral-storage": string;
      "hugepages-1Gi": string;
      "hugepages-2Mi": string;
      "hugepages-32Mi": string;
      "hugepages-64Ki": string;
      memory: string;
      pods: string;
    };
    capacity: {
      cpu: string;
      "ephemeral-storage": string;
      "hugepages-1Gi": string;
      "hugepages-2Mi": string;
      "hugepages-32Mi": string;
      "hugepages-64Ki": string;
      memory: string;
      pods: string;
    };
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
  uid: string,
  podCIDRs: string[],
  addresses: object[],
  allocatable: {
    cpu: string,
    'ephemeral-storage': string,
    'hugepages-1Gi': string,
    'hugepages-2Mi': string,
    'hugepages-32Mi': string,
    'hugepages-64Ki': string,
    memory: string,
    pods: string
  },
  capacity: {
    cpu: string,
    'ephemeral-storage': string,
    'hugepages-1Gi': string,
    'hugepages-2Mi': string,
    'hugepages-32Mi': string,
    'hugepages-64Ki': string,
    memory: string,
    pods: string
  },
  images: {
    names: string[],
    sizeBytes: number
  }[]
}

export type nodeObjectList = {
  [nodeName: string] : newNodeObject
}