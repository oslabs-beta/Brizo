import React from 'react'
import { podCardProps } from '../../../tests';

function PodCard(props: podCardProps) {
  const { containers, hostIP, nodeName, phase, podIPs, podName, uid } = props;

  return (
    <div className='pod-card'>
      {/* {containers} */}
      {hostIP}
      {nodeName}
      {phase}
      {/* {podIPs} */}
      {podName}
      {uid}
    </div>
  )
}

export default PodCard