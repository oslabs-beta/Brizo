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

export interface allTestInfoEKSType {
  workerNodeSecurity: sectionResultsInfo
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
  togglePods: (event: React.MouseEvent<HTMLDivElement>) => void
}

export interface podCardProps {
  nodeName?: string
  podName?: string
  uid?: string
  containers: V1Container[]
  hostIP?: string
  phase?: string
  podIPs: V1PodIP[]
  podsInNode?: any
}

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

export interface newDynamicPromObject {
  container?: string
  pod?: string
  queryName?: string
  name?: string
  value?: string
}

export interface dynamicPromQueryObject {
  metric: {
    __name__?: string
    alpha_eksctl_io_cluster_name?: string
    alpha_eksctl_io_nodegroup_name?: string
    beta_kubernetes_io_arch?: string
    beta_kubernetes_io_instance_type?: string
    beta_kubernetes_io_os?: string
    container?: string
    eks_amazonaws_com_capacityType?: string
    eks_amazonaws_com_nodegroup?: string
    eks_amazonaws_com_nodegroup_image?: string
    eks_amazonaws_com_sourceLaunchTemplateId?: string
    eks_amazonaws_com_sourceLaunchTemplateVersion?: string
    failure_domain_beta_kubernetes_io_region?: string
    failure_domain_beta_kubernetes_io_zone?: string
    id?: string
    image?: string
    instance?: string
    job?: string
    k8s_io_cloud_provider_aws?: string
    kubernetes_io_arch?: string
    kubernetes_io_hostname?: string
    kubernetes_io_os?: string
    name?: string
    namespace?: string
    node_kubernetes_io_instance_type?: string
    pod?: string
    topology_ebs_csi_aws_com_zone?: string
    topology_kubernetes_io_region?: string
    topology_kubernetes_io_zone?: string
  }
  value?: [number, string]
}

export interface staticPromQueryObject {
  metric: {
    __name__?: string
    alpha_eksctl_io_cluster_name?: string
    alpha_eksctl_io_nodegroup_name?: string
    beta_kubernetes_io_arch?: string
    beta_kubernetes_io_instance_type?: string
    beta_kubernetes_io_os?: string
    boot_id?: string
    eks_amazonaws_com_capacityType?: string
    eks_amazonaws_com_nodegroup?: string
    eks_amazonaws_com_nodegroup_image?: string
    eks_amazonaws_com_sourceLaunchTemplateId?: string
    eks_amazonaws_com_sourceLaunchTemplateVersion?: string
    failure_domain_beta_kubernetes_io_region?: string
    failure_domain_beta_kubernetes_io_zone?: string
    instance?: string
    job?: string
  }
  value?: [number, string]
}

export interface newStaticPromObject {
  queryName?: string
  value?: string
  instance?: string
}

export interface datasetsType {
  label: string
  data: string[]
  backgroundColor: string
  color?: string
}

export interface chartType {
  labels: string[]
  datasets: datasetsType[]
}
