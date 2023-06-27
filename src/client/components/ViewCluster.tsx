import React from 'react';
import type { AxiosResponse, AxiosError } from 'axios';
import axios from 'axios';
import GrandCISResults from './GrandCISResults';
import CISConfigResult from './CISConfigResult';

function ViewCluster () {
  const [totalCISResults, setTotalCISResults] = React.useState<JSX.Element>();
  const [controlPlaneConfiguration, setControlPlaneConfiguration] = React.useState<JSX.Element>();
  const [controlPlaneSecurityConfiguration, setControlPlaneSecurityConfiguration] = React.useState<JSX.Element>();
  const [etcdNodeConfiguration, setEtcdNodeConfiguration] = React.useState<JSX.Element>();
  const [kubernetesPolicies, setKubernetesPolicies] = React.useState<JSX.Element>();
  const [workerNodeSecurity, setWorkerNodeSecurity] = React.useState<JSX.Element>();

  const fetchLocalCISTest = async () => {
    try {
      const response = await axios.get('/api/security/local/cis');
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
  };

  const fetchEKSCISTest = async () => {
    const response = await axios.get('/api/security/eks/cis');
    const data = response.data;
    setTotalCISResults(<GrandCISResults data={data.totalSummary} />);
    setWorkerNodeSecurity(<CISConfigResult data={data.workerNodeSecurity} testName={'Worker Node Security'} />);
  };

  return (
    <>
      <div className="benchmark-buttons-container">
        <div className="benchmark-buttons">
          <button onClick={() => { void fetchLocalCISTest(); }} style={{ backgroundColor: '#90ee90' }}>local cis test</button>
          <button onClick={() => { void fetchEKSCISTest(); }} style={{ backgroundColor: '#78cc78' }}>eks cis test</button>
          <button onClick={() => ({})} style={{ backgroundColor: '#90ee90' }}>load bal test</button>
        </div>
      </div>
      <hr/>
      <div className='main-info-container'>
        <div className='cis-container'>
          {totalCISResults}
          {controlPlaneConfiguration}
          {controlPlaneSecurityConfiguration}
          {etcdNodeConfiguration}
          {kubernetesPolicies}
          {workerNodeSecurity}
        </div>
      </div>
    </>
  );
}

export default ViewCluster;
