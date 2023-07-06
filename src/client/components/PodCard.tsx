import React from 'react';
import type {
  podCardProps,
  volumeMount
} from '../../../types';
import type { V1Container } from '@kubernetes/client-node';
import { podPhaseStatusToColor } from '../../../functions';

/**
 * Takes in a props object of type podCardProp and renders a card representing a Kubernetes pod.
 */

function PodCard (props: podCardProps) {
  const { containers, hostIP, nodeName, phase, podIPs, podName, uid, podsInNode } = props;

  React.useEffect(() => { console.log(podsInNode); }, [podsInNode]);

  /**
   * Takes in the `container` object of type `V1Container` and iterates over
    its properties using a `for...in` loop.
   * @param {V1Container} container - An object of type `V1Container` that closely represents the data inside a docker container.
   */
  const renderContainer = (container: V1Container) => {
    // initialize container array
    const contArr: JSX.Element[] = [];

    for (const key in container) {
      // skip over these properties as they contain extra or irrelevant data
      if (key === 'resources' || key === 'command' || key === 'args') continue;

      const value: any = container[key as keyof V1Container];
      let renderedValue;
      // if the value is a string or number, create the ul element, else
      // depending on the key, fire the correct render function, otherwise
      // the value is simply an array and so we map it to ul elements
      if (typeof value !== 'object') {
        // renderedValue = <ul key={value}><u>{key}:</u> {value}</ul>;
      } else {
        if (key === 'volumeMounts') renderedValue = renderVolumeMounts(value);
        if (key === 'volumeMounts') console.log(container[key]);
        else if (Array.isArray(value) && typeof value[0] !== 'object') {
          renderedValue = (<>
            {value.map((item: string, index) => (
              <ul key={`${index}${item}`}>{item}</ul>
            ))}</>);
        }
      }
      // verify renderedValue isn't null before pushing to our container
      if (renderedValue !== null) contArr.push(<>{renderedValue}</>);
    }
    return contArr;
  };

  /**
   * Takes in an aray of type `volumeMount` and maps them to ul elements
   * @param value - Array of objects representing volumes.
   */
  const renderVolumeMounts = (value: volumeMount[]) => {
    return (
      <div className='content-box-2'>
        <strong className='content-title'>Volume Mounts:</strong>
        {value.map((mountInfo, index) => (
          <ul id={`mountInfo${index}`} key={`mountInfo${index}`}>
            <u>Name:</u>
            {' ' + mountInfo.name}
            <br/>
            <u>Mount Path:</u>
            {' ' + mountInfo.mountPath}
          </ul>
        ))}
      </div>
    );
  };

  /**
 * Iterates over the containers array that's passed down in props, calling the
 * `renderContainer` function for each container, and returns the flattened response.
 */
  const containerArrToText = () =>
    // iterate over flattened containers array
    containers.flatMap((container: V1Container) => {
      // invoke renderContainer with container passed in
      const renderedContainer = renderContainer(container);
      // store evaluated output in renderedContainer and return it
      return renderedContainer;
    });

  /**
 * Iterates over the podIPs array that's passed down in props and returns a list of IP addresses.
 */
  const renderPodIps = () =>
    podIPs.map((ipAddresses, index) => (
      <ul key={`ip${index}`}>{ipAddresses.ip}</ul>
    ));

  return (
    <div className={`pod-card ${nodeName!}`}>
      <h5>{podName}</h5>
      <h6><strong>uid:</strong> {uid}</h6>
      <ul key={`${nodeName ?? ''}stausphase`} style={{ color: podPhaseStatusToColor(phase!) }}>Status: {phase}</ul>
      <ul key={`${nodeName ?? ''}nodeName`}><strong>node:</strong> {nodeName}</ul>
      <hr className="light-hr" />
      <strong key={'podIP'}>Pod IP(s):</strong>
      <ul key={'renderedPodIps'}>{renderPodIps()}</ul>
      <br></br>
      <div className='content-box'>
      <strong className='content-title'> Containers: </strong>
      {containerArrToText()}
      </div>
      <hr className="light-hr" />
    </div>
  );
}

export default PodCard;
