import React from 'react';

const MissingCluster = () => {
  return (
    <>
      <div className='namespace-button-container'>
        <button
          key={'minikubebutton'}
          style={{ backgroundColor: '#a9e3ff' }}
          id={''}
          onClick={() => {
            window.open('https://minikube.sigs.k8s.io/docs/start/', '_blank');
          }}>
          setup minikube
        </button>
        <button
          key={'amazoneksbutton'}
          style={{ backgroundColor: '#ffb981' }}
          id={''}
          onClick={() => {
            window.open('https://docs.aws.amazon.com/eks/latest/userguide/getting-started-console.html', '_blank');
          }}>
          setup amazon eks
        </button>
      </div>
      <hr/>
      <div className="main-info-container">
        <div className='summary-container'>
          <h3>Looks like you&apos;re missing a cluster!</h3>
          <h5>Check out the buttons above and read the README.md for instructions on how to properly setup your cluster(s)! After your changes have been made, don&apos;t forget to <strong>restart</strong> the server.</h5>
        </div>
      </div>
    </>
  );
};

export default MissingCluster;
