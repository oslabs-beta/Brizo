import React from 'react';
import useAsyncEffect from 'use-async-effect';
import axios from 'axios';
import { staticPromQueries, dynamicPromQueries } from '../../../prometheusQueries';
import type { newPromObject } from '../../../types';
import Loading from './Loading';
import StaticPromComponent from './StaticPromComponent';
// import DynamicPromComponent from './DynamicPromComponent';
import MemoryUsageChart from './MemoryUsageChart';
/**
 * ViewNamespace: Responsible for /namespace or namespace button.
 * Displays the metrics for all of the pods and nodes in the namespace.
 */

const ViewNamespace = () => {
  const [staticPromData, setStaticPromData] = React.useState<newPromObject[]>([]);
  // const [dynamicPromData, setDynamicPromData] = React.useState<responsePromArray[]>([]);

  const [displayLoadingGif, setDisplayLoadingGif] = React.useState(false);
  useAsyncEffect(async () => {
    setDisplayLoadingGif(true);
    await fetchMetricsData();
    setDisplayLoadingGif(false);
  }, []);

  const fetchMetricsData = async () => {
    const staticResponseObject = await axios.post('/api/prom/metrics/default', { queries: staticPromQueries });
    setStaticPromData([...staticResponseObject.data]);
    console.log(staticResponseObject);
    // const dynamicResponseObject = await axios.post('/api/prom/metrics/default', { queries: dynamicPromQueries });
    // setDynamicPromData([...dynamicResponseObject.data]);
  };

  const createStaticPromComp = () => {
    const promArray = staticPromData.map((promQuery, index) => <StaticPromComponent data={promQuery} key={index}/>);
    return promArray;
  };

  // const createDynamicPromComp = () => {
  //   const promArray = dynamicPromData.map((promQuery, index) => <DynamicPromComponent key={index} data={promQuery} />);
  //   return promArray;
  // };

  return (
    <>
      <MemoryUsageChart />
      <div style={{ display: 'inline' }}>
        {/* {createStaticPromComp()} */}
      </div>
      {/* text area horizontal scrollbar containing static information */}
      <hr />
      <div className="main-info-container">
        {displayLoadingGif && <Loading />}
        <div>
          {/* {createDynamicPromComp()} */}
        </div>
      </div>
    </>
  );
};

export default ViewNamespace;
