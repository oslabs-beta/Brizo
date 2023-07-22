import React from 'react';
import { render, screen } from '@testing-library/react';
import NavbarComponent from '../src/client/components/NavbarComponent';
import PodCard from '../src/client/components/PodCard';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';

describe('test Podcard', () => {

  const props = {
    "nodeName": "minikube",
    "podName": "kube-bench-pr6jc",
    "uid": "c0507dbe-6cee-4cbb-b842-190cc79cea5e",
    "containers": [
        {
            "command": [
                "kube-bench",
                "run",
                "--targets",
                "node",
                "--benchmark",
                "eks-1.2.0"
            ],
            "image": "979439831614.dkr.ecr.us-east-2.amazonaws.com/k8s/kube-bench:latest",
            "imagePullPolicy": "Always",
            "name": "kube-bench",
            "resources": {},
            "terminationMessagePath": "/dev/termination-log",
            "terminationMessagePolicy": "File",
            "volumeMounts": [
                {
                    "mountPath": "/var/lib/kubelet",
                    "name": "var-lib-kubelet",
                    "readOnly": true
                },
                {
                    "mountPath": "/etc/systemd",
                    "name": "etc-systemd",
                    "readOnly": true
                },
                {
                    "mountPath": "/etc/kubernetes",
                    "name": "etc-kubernetes",
                    "readOnly": true
                },
                {
                    "mountPath": "/var/run/secrets/kubernetes.io/serviceaccount",
                    "name": "kube-api-access-chcql",
                    "readOnly": true
                }
            ]
        }
    ],
    "hostIP": "192.168.49.2",
    "phase": "Pending",
    "podIPs": [
        {
            "ip": "10.244.0.8"
        }
    ]
}
  test('renders nodeName prop in component', () => {
    //Arrange: render a Podcard

    render(<MemoryRouter>
      <PodCard {...props} />
    </MemoryRouter>)

    //Act:

    const nodeName = screen.getByText('minikube')

    //Assert:

    expect(nodeName).toBeInTheDocument();
  })

  test('renders uid', () => {
    //Arrange
    render(<MemoryRouter>
      <PodCard {...props} />
    </MemoryRouter>)

    //Act

    const uid = screen.getByText('c0507dbe-6cee-4cbb-b842-190cc79cea5e')

    //Assert

    expect(uid).toBeInTheDocument();
  })
})