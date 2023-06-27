import React from 'react';
import axios from 'axios';
import GrandCISResults from './GrandCISResults';
import CISConfigResult from './CISConfigResult';
import Loading from './Loading';

function ViewCluster () {
  const [totalCISResults, setTotalCISResults] = React.useState<JSX.Element>();
  const [controlPlaneConfiguration, setControlPlaneConfiguration] = React.useState<JSX.Element>();
  const [controlPlaneSecurityConfiguration, setControlPlaneSecurityConfiguration] = React.useState<JSX.Element>();
  const [etcdNodeConfiguration, setEtcdNodeConfiguration] = React.useState<JSX.Element>();
  const [kubernetesPolicies, setKubernetesPolicies] = React.useState<JSX.Element>();
  const [workerNodeSecurity, setWorkerNodeSecurity] = React.useState<JSX.Element>();
  const [displayLoadingGif, setDisplayLoadingGif] = React.useState(false);

  const resetResultDisplay = () => {
    setTotalCISResults(undefined);
    setControlPlaneConfiguration(undefined);
    setControlPlaneSecurityConfiguration(undefined);
    setEtcdNodeConfiguration(undefined);
    setKubernetesPolicies(undefined);
    setWorkerNodeSecurity(undefined);
    setDisplayLoadingGif(false);
  };

  const fetchLocalCISTest = async () => {
    try {
      // remove previous results
      resetResultDisplay();
      // fetch cis test for local cluster and toggle loading gif
      setDisplayLoadingGif(true);
      const response = await axios.get('/api/security/local/cis');
      setDisplayLoadingGif(false);
      const data = response.data;
      // create grand summary component
      setTotalCISResults(<GrandCISResults data={data.totalSummary}/>);
      // parse data for each component, passing in the test name for the title
      setControlPlaneConfiguration(<CISConfigResult data={data.controlPlaneConfiguration} testName={'Control Plane Configuration'} />);
      setControlPlaneSecurityConfiguration(<CISConfigResult data={data.controlPlaneSecurityConfiguration} testName={'Control Plane Security Configuration'} />);
      setEtcdNodeConfiguration(<CISConfigResult data={data.etcdNodeConfiguration} testName={'Etcd Node Configuration'} />);
      setKubernetesPolicies(<CISConfigResult data={data.kubernetesPolicies} testName={'Kubernetes Policies'} />);
      setWorkerNodeSecurity(<CISConfigResult data={data.workerNodeSecurity} testName={'Worker Node Security'} />);
    } catch (error) {
      setDisplayLoadingGif(false);
      console.error(error);
    }
  };

  const fetchEKSCISTest = async () => {
    try {
      // remove previous results
      resetResultDisplay();
      // fetch cis test for eks and toggle loading gif
      setDisplayLoadingGif(true);
      const response = await axios.get('/api/security/eks/cis');
      setDisplayLoadingGif(false);
      const data = response.data;
      // create grand summary component
      setTotalCISResults(<GrandCISResults data={data.totalSummary} />);
      // parse data for worker node component
      setWorkerNodeSecurity(<CISConfigResult data={data.workerNodeSecurity} testName={'Worker Node Security'} />);
    } catch (error) {
      setDisplayLoadingGif(false);
      console.error(error);
    }
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
        {displayLoadingGif && <Loading />}
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
