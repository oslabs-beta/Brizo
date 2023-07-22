import React from 'react';
import { render, screen } from '@testing-library/react';
import NavbarComponent from '../src/client/components/NavbarComponent';
import NodeCard from '../src/client/components/NodeCard';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';

describe('test Nodecard', () => {

    const props = {
    "key": "1",
    "name": "minikube",
    "uid": "9190cf97-93bc-400e-bc2e-d435a1c193f1",
    "podCIDRs": [
        "10.244.0.0/24"
    ],
    "addresses": [
        {
            "address": "192.168.49.2",
            "type": "InternalIP"
        },
        {
            "address": "minikube",
            "type": "Hostname"
        }
    ],
    "allocatable": {
        "cpu": "4",
        "ephemeral-storage": "61202244Ki",
        "hugepages-1Gi": "0",
        "hugepages-2Mi": "0",
        "hugepages-32Mi": "0",
        "hugepages-64Ki": "0",
        "memory": "8039992Ki",
        "pods": "110"
    },
    "capacity": {
        "cpu": "4",
        "ephemeral-storage": "61202244Ki",
        "hugepages-1Gi": "0",
        "hugepages-2Mi": "0",
        "hugepages-32Mi": "0",
        "hugepages-64Ki": "0",
        "memory": "8039992Ki",
        "pods": "110"
    },
    "images": [
        {
            "names": [
                "registry.k8s.io/etcd@sha256:dd75ec974b0a2a6f6bb47001ba09207976e625db898d1b16735528c009cb171c",
                "registry.k8s.io/etcd:3.5.6-0"
            ],
            "sizeBytes": 180688846
        },
        {
            "names": [
                "registry.k8s.io/kube-apiserver@sha256:b8dda58b0c680898b6ab7fdbd035a75065d3607a70c3c4986bc1d8cfba5f0ec8",
                "registry.k8s.io/kube-apiserver:v1.26.3"
            ],
            "sizeBytes": 129308863
        },
        {
            "names": [
                "registry.k8s.io/kube-controller-manager@sha256:28c0deb96fd861af5560b7e24b989a5d61f4a4b8467852d6975bf2a3a5217840",
                "registry.k8s.io/kube-controller-manager:v1.26.3"
            ],
            "sizeBytes": 119216599
        },
        {
            "names": [
                "registry.k8s.io/kube-proxy@sha256:d89b6c6a8ecc920753df713b268b0d226f795135c4a0ecc5ce61660e623dd6da",
                "registry.k8s.io/kube-proxy:v1.26.3"
            ],
            "sizeBytes": 61852994
        },
        {
            "names": [
                "registry.k8s.io/kube-scheduler@sha256:ef87c0880906a21ba55392e4c28bb75a526dd1e295e423f73e67dfc48e0c345c",
                "registry.k8s.io/kube-scheduler:v1.26.3"
            ],
            "sizeBytes": 54925783
        },
        {
            "names": [
                "registry.k8s.io/coredns/coredns@sha256:8e352a029d304ca7431c6507b56800636c321cb52289686a581ab70aaa8a2e2a",
                "registry.k8s.io/coredns/coredns:v1.9.3"
            ],
            "sizeBytes": 47660771
        },
        {
            "names": [
                "gcr.io/k8s-minikube/storage-provisioner@sha256:18eb69d1418e854ad5a19e399310e52808a8321e4c441c1dddad8977a0d7a944",
                "gcr.io/k8s-minikube/storage-provisioner:v5"
            ],
            "sizeBytes": 29032448
        },
        {
            "names": [
                "registry.k8s.io/pause@sha256:7031c1b283388d2c2e09b57badb803c05ebed362dc88d84b480cc47f72a21097",
                "registry.k8s.io/pause:3.9"
            ],
            "sizeBytes": 514000
        },
        
      ],
    togglePods: jest.fn()
}
  test('renders nodeName prop in component', () => {
    //Arrange: render a Podcard

    render(<MemoryRouter>
      <NodeCard {...props} />
    </MemoryRouter>)

    //Act:

    const nodeName = screen.getAllByText('minikube')

    //Assert:

    expect(nodeName).not.toHaveLength(0);
  })
})