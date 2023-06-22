import React from 'react';
import NodeCard from './NodeCard';
import PodCard from './PodCard';
import { useNamespaces } from './MainContainer';
import useAsyncEffect from 'use-async-effect';
import type { namespaceObject, newNodeObject, newPodObject } from '../../../types';
import axios from 'axios';

const ViewStructure = () => {
  const { namespaces, setNamespaces } = useNamespaces();
  const [namespaceButtons, setNamespaceButtons] = React.useState<JSX.Element[]>([]);
  const [nodeCards, setNodeCards] = React.useState<JSX.Element[]>([]);
  const [podComponents, setPodComponents] = React.useState<JSX.Element[]>([]);

  useAsyncEffect(async () => {
    await fetchNamespaces();
  }, []);

  // FETCH NAMESPACES
  const fetchNamespaces = async () => {
    try {
      const response = await axios.get('/api/cluster/namespaces');
      const namespacesData = response.data;
      setNamespaces(namespacesData);
      createNamespaceComponents(namespacesData);
    } catch (error) {
      console.error(error);
    }
  };
  // FETCH POD INFO
  const fetchPod = async (selectedNamespace: string) => {
    try {
      const response = await axios.get(`/api/cluster/pod/${selectedNamespace}`);
      const podsData = response.data;
      console.log(podsData);
      createPodComponents(podsData);
    } catch (error) {
      console.error(error);
    }
  };
  // FETCH NODE INFO
  const fetchNode = async (selectedNamespace: string): Promise<void> => {
    try {
      const response = await axios.get(`/api/cluster/node/${selectedNamespace}`);
      const nodesData = response.data;
      createNodeComponents(nodesData);
      await fetchPod(selectedNamespace);
    } catch (error) {
      console.error(error);
    }
  };
  // CREATE NAMESPACE COMPONENTS
  const createNamespaceComponents = (namespaceArray: namespaceObject[]) => {
    const buttons = namespaceArray.map((namespaceObject: namespaceObject, index) => (
      <button
        key={`${namespaceObject.name}`}
        style={{ backgroundColor: 'white' }}
        id={`${namespaceObject.name}`}
        onClick={() => {
          void fetchNode(namespaceObject.name);
        }}
        >
        {namespaceObject.name}
      </button>
    ));
    setNamespaceButtons(buttons);
  };
  // CREATE NODE COMPONENTS
  const createNodeComponents = (nodeData: newNodeObject[]) => {
    const mappedNodes = nodeData.map((node) => {
      return (
        <NodeCard
        key={`${node.name}`}
        name={`${node.name}`}
        uid={`${node.uid}`}
        podCIDRs={node.podCIDRs}
        addresses={node.addresses}
        allocatable={node.allocatable}
        capacity={node.capacity}
        images={node.images}
       />);
    });
    setNodeCards(mappedNodes);
  };

  const createPodComponents = (podData: newPodObject[]) => {
    const mappedPods: JSX.Element[] = [];
    for (let key in podData) {
      const currPod = podData[key];
      mappedPods.push(
        <PodCard
          key={`${key}${currPod.nodeName}`}
          containers={currPod.containers}
          hostIP={currPod.hostIP}
          nodeName={currPod.nodeName}
          phase={currPod.phase}
          podIPs={currPod.podIPs}
          podName={currPod.podName}
          uid={currPod.uid}
        />
      )
    }
    setPodComponents(mappedPods);
  };

  return (
    <>
      <div className='namespace-button-container'>
        {namespaceButtons}
      </div>
      <hr />
      <div className="main-info-container">
        <div className="card-container">
          {nodeCards}
        </div>
        <div className="pod-container">
          {podComponents}
        </div>
      </div>
    </>
  );
};

export default ViewStructure;
