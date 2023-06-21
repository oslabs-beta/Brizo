import React from 'react'
import NamespaceComponent from './NamespaceComponent';
import { useOutletContext } from 'react-router-dom';
import { useNamespaces } from './MainContainer';
import useAsyncEffect from 'use-async-effect'
import { namespaceObject } from '../../../types';
import axios from 'axios';
// switch to carousel instead of static cards?
// TODO: add scrolling for multiple cards
// TODO: generate cards on # of namespaces
// TODO: define card width on # of namespaces

const ViewStructure = () => {
  const { namespaces, setNamespaces } = useNamespaces();
  const [namespaceButtons, setNamespaceButtons] = React.useState<JSX.Element[]>([]);

  useAsyncEffect(async () => fetchNamespaces(), [])

  // FETCH NAMESPACES
  const fetchNamespaces = async () => {
    try {
      const response = await axios.get('/api/cluster/namespaces'); 
      const namespacesData = response.data;
      setNamespaces(namespacesData);
      await createNamespaceComponents(namespacesData);
    } catch (error) {
      console.error(error);
    }
  };
  // FETCH POD INFO
  const fetchPod = async (selectedNamespace: String) => {
    try {
      const response = await axios.get(`/api/cluster/pod/${selectedNamespace}`); 
      const podsData = response.data;
      console.log(podsData);
      // await createPodComponents(podsData);
    } catch (error) {
      console.error(error);
    }
  }

  const fetchNode = async (selectedNamespace: String) => {
    try {
      const response = await axios.get(`/api/cluster/node/${selectedNamespace}`); 
      const unparsedNodeData = response.data;
      console.log(unparsedNodeData);
      // await createNodeComponents(nodesData);
    } catch (error) {
      console.error(error);
    }
   }
// name, uid, podCIDR, 
/**​​​​​
0: Object { address: "192.168.49.2", type: "InternalIP" }
​​​​​
1: Object { address: "minikube", type: "Hostname" }
​​​​​
length: 2
​​​​​
<prototype>: Array []
​​​​
allocatable: Object { cpu: "2", "ephemeral-storage": "45821796Ki", "hugepages-1Gi": "0", … }
​​​​​
cpu: "2"
​​​​​
"ephemeral-storage": "45821796Ki"
​​​​​
"hugepages-1Gi": "0"
​​​​​
"hugepages-2Mi": "0"
​​​​​
"hugepages-32Mi": "0"
​​​​​
"hugepages-64Ki": "0"
​​​​​
memory: "2037108Ki"
​​​​​
pods: "110"
​​​​​
<prototype>: Object { … }
​​​​
capacity: Object { cpu: "2", "ephemeral-storage": "45821796Ki", "hugepages-1Gi": "0", … }
​​​​​
cpu: "2"
​​​​​
"ephemeral-storage": "45821796Ki"
​​​​​
"hugepages-1Gi": "0"
​​​​​
"hugepages-2Mi": "0"
​​​​​
"hugepages-32Mi": "0"
​​​​​
"hugepages-64Ki": "0"
​​​​​
memory: "2037108Ki"
​​​​​
pods: "110"
​​​​​
<prototype>: Object { … }
​​​​
conditions: Array(4) [ {…}, {…}, {…}, … ]
​​​​
daemonEndpoints: Object { kubeletEndpoint: {…} }
​​​​
images: Array(8) [ {…}, {…}, {…}, … ]
​​​​​
0: Object { names: (2) […], sizeBytes: 180688846 }
​​​​​
1: Object { names: (2) […], sizeBytes: 129308863 }
​​​​​
2: Object { names: (2) […], sizeBytes: 119216599 }
​​​​​
3: Object { names: (2) […], sizeBytes: 61852994 }
​​​​​
4: Object { names: (2) […], sizeBytes: 54925783 }
​​​​​
5: Object { names: (2) […], sizeBytes: 47660771 }
​​​​​
6: Object { names: (2) […], sizeBytes: 29032448 }
​​​​​
7: Object { names: (2) […], sizeBytes: 514000 }
​​​​​
length: 8
​​​​​
<prototype>: Array []
 */
  // CREATE NAMESPACE COMPONENTS
  const createNamespaceComponents = (namespaceArray: namespaceObject[]) => {
    const buttons = namespaceArray.map((namespaceObject: namespaceObject, index) => (
      <button
        key={`${namespaceObject.name}`}
        style={{ backgroundColor: 'white' }}
        id={`${namespaceObject.name}`}
        onClick={() => {
          fetchNode(namespaceObject.name);
        }}
        >
        {namespaceObject.name}
      </button>
    ));
    setNamespaceButtons(buttons);
  };

  // const createPodComponents = () => {

  // }

  return (
    <>
      <div>
        <div className='namespace-button-container'>
          {namespaceButtons}
        </div>
      </div>
      <hr />
    <div className='main-info-container'>
        {/* generated panel components for namespace details */}
      <div className="card-container">
        {/* <NamespaceComponent /> */}
      </div>
      </div>
    </>
  )
}

export default ViewStructure
