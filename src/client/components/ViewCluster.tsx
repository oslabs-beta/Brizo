import React from 'react'
import axios from 'axios';
import GrandCISResults from './GrandCISResults';
import CISConfigResult from './CISConfigResult';

function ViewCluster() {
  const [totalCISResults, setTotalCISResults] = React.useState<JSX.Element>();
  const [controlPlaneConfiguration, setControlPlaneConfiguration] = React.useState<JSX.Element>();
  const [controlPlaneSecurityConfiguration, setControlPlaneSecurityConfiguration] = React.useState<JSX.Element>();
  const [etcdNodeConfiguration, setEtcdNodeConfiguration] = React.useState<JSX.Element>();
  const [kubernetesPolicies, setKubernetesPolicies] = React.useState<JSX.Element>();
  const [workerNodeSecurity, setWorkerNodeSecurity] = React.useState<JSX.Element>();

  const fetchCISTest = async () => {
    try {
      const response = await axios.get('/api/security/cis'); 
      const data = response.data;
      setTotalCISResults(<GrandCISResults data={data.totalSummary}/>);
      setControlPlaneConfiguration(<CISConfigResult data={data.controlPlaneConfiguration} testName={'Control Plane Configuration'} />);
      setControlPlaneSecurityConfiguration(<CISConfigResult data={data.controlPlaneSecurityConfiguration} testName={'Control Plane Security Configuration'} />);
      setEtcdNodeConfiguration(<CISConfigResult data={data.etcdNodeConfiguration} testName={'Etcd Node Configuration'} />);
      setKubernetesPolicies(<CISConfigResult data={data.kubernetesPolicies} testName={'Kubernetes Policies'} />);
      setWorkerNodeSecurity(<CISConfigResult data={data.workerNodeSecurity} testName={'Worker Node Security'} />);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div>INSERT CLUSTER METRIC IFRAME HERE FOR MVP</div>
      <div className='main-info-container'>
        <button style={{ backgroundColor: 'lightgreen' }} onClick={fetchCISTest}>cis test</button>
        {totalCISResults}
        {controlPlaneConfiguration}
        {controlPlaneSecurityConfiguration}
        {etcdNodeConfiguration}
        {kubernetesPolicies}
        {workerNodeSecurity}
      </div>
    </>
  )
}

export default ViewCluster