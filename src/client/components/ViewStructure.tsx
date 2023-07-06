import React from 'react';
import NodeCard from './NodeCard';
import PodCard from './PodCard';
import { useNamespaces } from './MainContainer';
import useAsyncEffect from 'use-async-effect';
import type { namespaceObject, newNodeObject, newPodObject, nodeCardProps } from '../../../types';
import axios from 'axios';

/**
 * ViewStructure: Responsible for the "homepage" or structure button.
 * Creates and displays the Node and Pod card components based on the returned data from our GET requests.
 */

const ViewStructure = () => {
  const { namespaces, setNamespaces } = useNamespaces();
  const [namespaceButtons, setNamespaceButtons] = React.useState<JSX.Element[]>([]);
  const [nodeCards, setNodeCards] = React.useState<JSX.Element[]>([]);
  const [podComponents, setPodComponents] = React.useState<JSX.Element[]>([]);
  const [podsInNode, setPodsInNode] = React.useState({});

  useAsyncEffect(async () => {
    await fetchNamespaces();
  }, []);

  /**
   * GET request to '/api/cluster/namespaces', retrieves the list of namespaces, sets namespaces state with retrieved data, and calls the createNamespaceComponents function with the namespaces data.
   * If an error occurs, it is logged to the console.
 */
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

  /**
   * GET request to '/api/cluster/node/${selectedNamespace}', passing in the  name of the namespace button clicked on, retrieves the list of nodes that belong to the namespace, and calls the createNodeComponents function with the node data.
   * @param {string} selectedNamespace - The `selectedNamespace` parameter is a string that represents the namespace that is clicked on.
   */
  const fetchNode = async (selectedNamespace: string): Promise<void> => {
    try {
      const response = await axios.get(`/api/cluster/node/${selectedNamespace}`);
      const nodesData: nodeCardProps[] = response.data;
      createNodeComponents(nodesData);
      await fetchPod(selectedNamespace);
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * GET request to '/api/cluster/pod/${selectedNamespace}', passing in the  the name of the namespace provided by the fetchNode function, and then creates pod components based on the retrieved data.
   * @param {string} selectedNamespace - The `selectedNamespace` parameter is a string that represents the namespace that is passed in from the fetchNode function.
   */
  const fetchPod = async (selectedNamespace: string) => {
    try {
      const response = await axios.get(`/api/cluster/pod/${selectedNamespace}`);
      const podsData = response.data;
      createPodComponents(podsData);
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * Takes an array of `namespaceObject` and creates buttons for each object in the array. The button array is returned.
   * @param {namespaceObject[]} namespaceArray - An array of objects representing namespaces. Each object should have a "name" property.
  */
  const createNamespaceComponents = (namespaceArray: namespaceObject[]) => {
    const buttons = namespaceArray.map((namespaceObject: namespaceObject, index) => (
      <button
        key={`${namespaceObject.name}${index}`}
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

  /** Takes an array of `newNodeObject` and creates NodeCard components based on the data in each object. The created NodeCard component array is returned.
   * @param {newNodeObject[]} nodeData - An array of objects representing nodes.
  */
  const createNodeComponents = (nodeData: newNodeObject[]) => {
    const mappedNodes = nodeData.map((node, index) => {
      return (
        <NodeCard
          key={`NodeCard${node.uid ?? ''}`}
          name={node.name ?? ''}
          uid={node.uid ?? ''}
          podCIDRs={node.podCIDRs ?? []}
          addresses={node.addresses ?? []}
          allocatable={node.allocatable}
          capacity={node.capacity}
          images={node.images ?? []}
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          togglePods={togglePods}
        />);
    });
    setNodeCards(mappedNodes);
  };

  /** Takes an array of `newPodObject` and creates PodCard components based on the data in each object. The created PodCard component array is returned.
   * @param {newPodObject[]} podData - An array of objects representing pods.
  */
  const createPodComponents = (podData: newPodObject[]) => {
    const mappedPods: JSX.Element[] = podData.map((newPodObject, index) => {
      return (
        <PodCard
          key={`${newPodObject.uid ?? ''}${index}`}
          containers={newPodObject.containers ?? []}
          hostIP={newPodObject.hostIP}
          nodeName={newPodObject.nodeName}
          phase={newPodObject.phase}
          podIPs={newPodObject.podIPs ?? []}
          podName={newPodObject.podName}
          uid={newPodObject.uid}
          podsInNode={podsInNode}
        />
      );
    });
    setPodComponents([]);
    setPodComponents(mappedPods);
  };

  const togglePods = async (event: React.MouseEvent<HTMLDivElement>) => {
    try {
      const nodeName = event.currentTarget.getAttribute('data-node-name');
      const response = await axios.get(`/api/cluster/pod/${nodeName!}`);
      const podsInNode = response.data;
      setPodsInNode(podsInNode);
      createPodComponents(podsInNode);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className='namespace-button-container'>
        {namespaceButtons}
      </div>
      <hr />
      <div className="main-info-container">
      {nodeCards.length > 0 && <><h1 style={{ margin: 0 }}>Nodes</h1><hr /></>}
        <div className="card-container">
          {nodeCards}
        </div>
        {podComponents.length > 0 && <><h1 style={{ margin: 0 }}>Pods</h1><hr /></>}
        <div className="pod-container">
          {podComponents}
        </div>
      </div>
    </>
  );
};

export default ViewStructure;
