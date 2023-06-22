import React, { ReactNode, useRef } from 'react'
import { podCardProps, containerObject, livenessProbeObject, volumeMounts } from '../../../types';

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

function PodCard(props: podCardProps) {
  const { containers, hostIP, nodeName, phase, podIPs, podName, uid } = props;

  const phaseStatusToColor = () => {
    let textColor;
    if (phase === 'Running' || phase === 'Succeeded') textColor = 'green';
    else if (phase === 'Pending') textColor = 'yellow';
    else textColor = 'red';
    return (<ul style={{color: textColor}}>{phase}</ul>)
  }

  const renderContainer = (container: containerObject) => {
    
    // create rendering logic object with rendering functions as key/value pairs
    const renderingLogic: {[key: string]: (value: any) => JSX.Element} = {
      livenessProbe: renderLivenessProbe,
      volumeMounts: renderVolumeMounts,
    };
    
    // initialize container array
    const contArr = [];

    // iterate over container object with for...in 
    for (const key in container) {
      // check if object has own property to make sure key exists on the container object
      if (Object.prototype.hasOwnProperty.call(container, key)) {

        // initialize value const and assign it to container[key]
        const value = container[key as keyof containerObject];

        // initialize rendered value to return later 
        let renderedValue;

        // check for objects and arrays types
        if (typeof value === 'object' && value !== null) {
          // handle the arrays 
          if (Array.isArray(value)) {
            // map over array and create list items within ul tag
            renderedValue = (
              <ul>
                {value.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            );
          } else {
            // handle objects 
            // invoke appropriate renderingLogic function and store function body in renderingFunction 
            const renderingFunction = renderingLogic[key];
            if (renderingFunction) {
              // invoke rendering function w? given value passed in and store evaluated output in renderedValue 
              renderedValue = renderingFunction(value);
            }
          }
        } else {
          // handle scalar values aka primitive data
          renderedValue = <ul>{`${value}`}</ul>;
        }
        // push renderedValue to contArr
        if (renderedValue) {
          contArr.push(
            <div>{renderedValue}</div>
          )
        }
      }
    }
    // return container array
    return contArr;
  };

  const renderLivenessProbe = (value: livenessProbeObject) => {
    return (
      <ul> 
      Liveness Probe: 
      {Object.entries(value).map(([subKey, subVal]) => (
        <li key={subKey}>
        {subKey}: {`${subVal}`}
        </li>
      ))}
      </ul>
    )
  }

  const renderVolumeMounts = (value: volumeMounts[]) => {
    return (
      <ul> 
        Volume Mounts: 
        {value.map((mountInfo, index) => (
          <li key ={index}>
            Name: {mountInfo.name}<br />
            Mount Path: {mountInfo.mountPath}
          </li>
        ))}
      </ul>
    )
  }

  const containerArrToText = () => containers.flatMap((container: containerObject, index) => {
    const renderedContainer = renderContainer(container);
    return renderedContainer;
  })

  const toggleContainerDisplay = () => {
    // DOM manipulation because my brain is fried (pleae change future owen)
    const hiddenContainers = document.getElementsByClassName('display-more');
    console.log(hiddenContainers)
    // for (let containerText of hiddenContainers) { // code works but fix typing
    //   containerText.style.display = containerText.style.display === 'none' ? 'inline' : 'none';
    // }
    Array.from(hiddenContainers).forEach(containerText => { 
      console.log(containerText)
      // containerText.style.display = containerText.style.display === 'none' ? 'inline' : 'none';
    })
  }

  return (
    <div className='pod-card'>
      <h5>{podName}</h5>
      <h6>{uid}</h6>
      <ul>{phaseStatusToColor()}</ul>
      <ul>{nodeName}</ul>
      <ul>{hostIP}</ul>
      <ul>{containerArrToText()}</ul>
      <button onClick={toggleContainerDisplay}>show more</button>
      <ul>{/* {podIPs} */}</ul>
    </div>
  )
}

export default PodCard