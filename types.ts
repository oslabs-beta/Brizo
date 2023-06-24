import type { V1Container, V1ContainerImage, V1PodIP } from '@kubernetes/client-node';
import type { Request, Response, NextFunction } from 'express';
export interface ServerError {
  err: '400'
}

export interface clusterControllerType {
  getPods: (req: Request, res: Response, next: NextFunction) => Promise<void>
  getNodes: (req: Request, res: Response, next: NextFunction) => Promise<void>
  getNamespaces: (req: Request, res: Response, next: NextFunction) => Promise<void>
}

export interface indexObjectType {
  position: number
  assigned: boolean
}

export interface sectionResultsInfo {
  testResults: string[]
  remediations: string[]
  summary: string[]
}

export interface allTestInfoType {
  controlPlaneSecurityConfiguration: sectionResultsInfo
  etcdNodeConfiguration: sectionResultsInfo
  controlPlaneConfiguration: sectionResultsInfo
  workerNodeSecurity: sectionResultsInfo
  kubernetesPolicies: sectionResultsInfo
  totalSummary: string[]
}

export interface namespaceObject {
  name: string
  uid: string
  status: string
}

export interface containerObject {
  env?: Array<{
    name?: string
    value?: string
    valueFrom?: {
      fieldRef?: {
        apiVersion?: string
        fieldPath?: string
      }
      secretKeyRef?: {
        key?: string
        name?: string
      }
    }
  }>
  image?: string
  imagePullPolicy?: string
  livenessProbe?: {
    failureThreshold: number
    httpGet: {
      path: string
      port: number
      scheme: string
    }
    initialDelaySeconds: number
    periodSeconds: number
    successThreshold: number
    timeoutSeconds: number
  }
  name?: string
  ports?: Array<{
    containerPort?: number
    name?: string
    protocol?: string
  }>
  readinessProbe?: {
    failureThreshold?: number
    httpGet?: {
      path: string
      port: number
      scheme: string
    }
    periodSeconds?: number
    successThreshold?: number
    timeoutSeconds?: number
  }
  resources?: Record<string, unknown> // -> ???
  securityContext?: {
    allowPrivilegeEscalation: boolean
    capabilities: {
      drop: string[]
    }
    seccompProfile: {
      type: string
    }
  }
  terminationMessagePath?: string
  terminationMessagePolicy?: string
  volumeMounts?: Array<{
    mountPath: string
    name: string
    subPath?: string
    readOnly?: boolean
  }>
}

export interface newPodObject {
  nodeName: string | undefined
  podName: string | undefined
  uid: string | undefined
  containers: V1Container[] | undefined
  hostIP: string | undefined
  phase: string | undefined
  podIPs: V1PodIP[] | undefined
}

export interface newNodeObject {
  name: string | undefined
  uid: string | undefined
  podCIDRs: string[] | undefined
  addresses: addressObject[] | undefined
  allocatable: Record<string, string> | undefined
  // allocatable: allocatableObject
  capacity: Record<string, string> | undefined
  // capacity: capacityObject
  images: V1ContainerImage[] | undefined
}

export type nodeObjectList = Record<string, newNodeObject>

export interface addressObject {
  address: string
  type: string
}

// eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
export interface allocatableObject {
  cpu: string
  'ephemeral-storage': string
  'hugepages-1Gi': string
  'hugepages-2Mi': string
  'hugepages-32Mi': string
  'hugepages-64Ki': string
  memory: string
  pods: string
}

// export type allocatableObject = Record<string, string>

export interface capacityObject {
  cpu: string
  'ephemeral-storage': string
  'hugepages-1Gi': string
  'hugepages-2Mi': string
  'hugepages-32Mi': string
  'hugepages-64Ki': string
  memory: string
  pods: string
}

export interface nodeCardProps {
  key: string
  name: string
  uid: string
  podCIDRs: string[]
  addresses: addressObject[]
  allocatable: Record<string, string> | undefined
  capacity: Record<string, string> | undefined
  images: V1ContainerImage[]
}

export interface podCardProps {
  nodeName?: string
  podName?: string
  uid?: string
  containers: V1Container[]
  hostIP?: string
  phase?: string
  podIPs: V1PodIP[]
}

// export interface imagesObject {
//   names: string[]
//   sizeBytes: number
// }

export interface livenessProbeObject {
  failureThreshold?: number
  httpGet?: {
    path: string
    port: number
    scheme: string
  }
  initialDelaySeconds?: number
  periodSeconds?: number
  successThreshold?: number
  timeoutSeconds?: number
}

export interface volumeMount {
  mountPath: string
  name: string
  subPath?: string
  readOnly?: boolean
}
