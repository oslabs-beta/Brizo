import React from 'react';
import useAsyncEffect from 'use-async-effect';
import axios from 'axios';
import { staticPromQueries, dynamicPromQueries } from '../../../prometheusQueries';
import type { newDynamicPromObject, newStaticPromObject } from '../../../types';
import Loading from './Loading';
import StaticPromComponent from './StaticPromComponent';
import MemoryUsageChart from './MemoryUsageChart';
import { Doughnut } from 'react-chartjs-2';
import CpuUsageChart from './CpuUsageChart';

/**
 * ViewNamespace: Responsible for /namespace or namespace button.
 * Displays the metrics for all of the pods and nodes in the namespace.
 */

const ViewNamespace = () => {
  const [staticPromData, setStaticPromData] = React.useState<newStaticPromObject[]>([]);
  // const [dynamicPromData, setDynamicPromData] = React.useState<responsePromArray[]>([]);

  const [displayLoadingGif, setDisplayLoadingGif] = React.useState(false);
  useAsyncEffect(async () => {
    setDisplayLoadingGif(true);
    await fetchMetricsData();
    setDisplayLoadingGif(false);
  }, []);

  const fetchMetricsData = async () => {
    const staticResponseObject = await axios.post('/api/prom/metrics/static', { queries: staticPromQueries });
    console.log('Static response object: ', staticResponseObject);
    setStaticPromData([...staticResponseObject.data]);
    // console.log(staticResponseObject);
    // const dynamicResponseObject = await axios.post('/api/prom/metrics/default', { queries: dynamicPromQueries });
    // setDynamicPromData([...dynamicResponseObject.data]);
  };

  const createStaticPromComp = () => {
    return staticPromData.map((promQuery, index) => (
      <div key={`${promQuery.queryName!}${index}`}>
        <StaticPromComponent data={promQuery} key={`${promQuery.queryName!}${index}`} />
      </div>
    ));
  };

  return (
    <>
      <MemoryUsageChart />
      <CpuUsageChart />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {createStaticPromComp()}
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
