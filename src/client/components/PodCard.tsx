import React from 'react';
import type {
  podCardProps,
  volumeMount
} from '../../../types';
import type { V1Container } from '@kubernetes/client-node';

/**
 * PodCards: Takes in a props object of type podCardProp and renders
 * a card representing a Kubernetes pod with the props object.
 * renderContainer() employs renderLivenessProbe() and renderVolumeMounts() to
 * render all various forms of pod data.
 * renderLivenessProbe() and renderVolumeMounts() to render special objects
 * . The
 * `toggleContainerDisplay` function is used to toggle the display of
 * additional container information when a button is clicked.
 */

// type mountInfoType = Record<string, string>;
// type mountInfoMap = Array<{
//   name: string
//   mountPath: string
// }>;

function PodCard (props: podCardProps) {
  const { containers, hostIP, nodeName, phase, podIPs, podName, uid } = props;

  const phaseStatusToColor = () => {
    let textColor;
    if (phase === 'Running' || phase === 'Succeeded') textColor = 'green';
    else if (phase === 'Pending') textColor = 'yellow';
    else textColor = 'red';
    return <ul key={`${nodeName ?? ''}${textColor}`} style={{ color: textColor }}>{phase}</ul>;
  };

  const renderContainer = (container: V1Container) => {
    // create rendering logic object with rendering functions as key/value pairs

    // initialize container array
    const contArr: JSX.Element[] = [];

    // iterate over container object with for...in
    for (const key in container) {
      if (key === 'resources' || key === 'command' || key === 'args') {
        // resources and command contain extremely long values / aren't important
        continue;
      }
      // initialize value const and assign it to container[key]
      const value: any = container[key as keyof V1Container];

      // initialize rendered value to return later
      let renderedValue;

      // check for objects and arrays types
      if (typeof value === 'object' && value !== null) {
        // handle the arrays
        if (Array.isArray(value) && typeof value[0] !== 'object') {
          // need to make sure it is not an array of objects here
          // map over array and create list items within ul tag
          renderedValue = (
              <>
                {value.map((item: string, index) => (
                  <ul key={`${item}${index}`}>{item}</ul>
                ))}
              </>
          );
        } else {
          // handle objects
          // invoke appropriate renderingLogic function and store function body in renderingFunction
          if (key === 'volumeMounts') {
            renderedValue = renderVolumeMounts(value);
          }
        }
      } else {
        // handle scalar values aka primitive data
        renderedValue = <ul key={value}>{value}</ul>;
      }
      // push renderedValue to contArr
      if (renderedValue !== null) {
        contArr.push(<>{renderedValue}</>);
      }
    }
    // return container array
    return contArr;
  };

  // const renderLivenessProbe = (value: livenessProbeObject) => {
  //   return (
  //     <>
  //       Liveness Probe:
  //       {Object.entries(value).map(([subKey, subVal]: [string, string | number]) => (
  //         <ul key={subKey}>
  //           { /* eslint-disable-next-line @typescript-eslint/restrict-template-expressions */ }
  //           {subKey}: {subVal}
  //         </ul>
  //       ))}
  //     </>
  //   );
  // };

  const renderVolumeMounts = (value: volumeMount[]) => {
    return (
      <>
        Volume Mounts:
        {value.map((mountInfo, index) => (
          <ul key={`mountInfo${index}`}>
            Name: {mountInfo.name}
            <br />
            Mount Path: {mountInfo.mountPath}
          </ul>
        ))}
      </>
    );
  };

  const containerArrToText = () =>
    // iterate over flattened containers array
    containers.flatMap((container: V1Container) => {
      // invoke renderContainer with container passed in
      const renderedContainer = renderContainer(container);
      // store evaluated output in renderedContainer and return it
      return renderedContainer;
    });

  // const toggleContainerDisplay = () => {
  //   // TODO
  //   // DOM manipulation because my brain is fried (pleae change future owen)
  //   const hiddenContainers = document.getElementsByClassName('display-more');
  //   console.log(hiddenContainers);
  //   Array.from(hiddenContainers).forEach((containerText) => {
  //     console.log(containerText);
  //     // containerText.style.display = containerText.style.display === 'none' ? 'inline' : 'none';
  //   });
  // };

  const renderPodIps = () =>
    podIPs.map((ipAddresses, index) => (
      <ul key={`ip${index}`}>{ipAddresses.ip}</ul>
    ));

  return (
    <div className="pod-card">
      <h5>{podName}</h5>
      <h6>{uid}</h6>
      {phaseStatusToColor()}
      <ul key={nodeName}>{nodeName}</ul>
      <ul key={hostIP}>{hostIP}</ul>
      <hr className="light-hr" />
      {containerArrToText()}
      {/* <button onClick={toggleContainerDisplay}>show more</button> */}
      <hr className="light-hr" />
      <ul key={'podIP'}>Pod IPs:</ul>
      <ul key={'renderedPodIps'}>{renderPodIps()}</ul>
    </div>
  );
}

export default PodCard;
