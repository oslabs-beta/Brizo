import React from 'react';
import type { nodeCardProps } from '../../../types';
import { convertBytesToMB } from '../../../functions';

function NodeCard (props: nodeCardProps) {
  const convertKiToGB = (kiValue: string) =>
    Math.floor(parseInt(kiValue) / 976600);

  const { name, uid, addresses, allocatable, capacity, images, togglePods } =
    props;

  const addressList = addresses.map((address, index) => (
    <ul key={`address${uid}${index}`}>
      <u>{address.address}</u> {' --> ' + address.type}
    </ul>
  ));
  const imageList = images.map((imageObject, index) => {
    return (
        <ul key={`image${index}`}>
        <u>name:</u>{' ' + imageObject.names![1]}
        <br></br>
        <u>size:</u> {' '} {convertBytesToMB(imageObject.sizeBytes)}MB
        </ul>
    );
  });

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <div className="card" onClick={ togglePods } data-node-name={name}>
      <h3>{name}</h3>
      <h4><strong>uid: </strong>{uid}</h4>
      <div className='content-box'>
      <strong className='content-title'>addresses:</strong>
      {addressList}
      </div>
      <br></br>
      <div className='content-box'>
      <strong className='content-title'>allocatable resources / capacity: </strong>
      <ul>
        <u>cpu cores:</u> {allocatable!.cpu} / {capacity!.cpu}
      </ul>
      <ul>
        <u>storage:</u>{' '}
        {convertKiToGB(allocatable!['ephemeral-storage'])}GB /{' '}
        {convertKiToGB(capacity!['ephemeral-storage'])}GB
      </ul>
      <ul>
        <u>memory:</u> {convertKiToGB(allocatable!.memory)}GB /{' '}
        {convertKiToGB(capacity!.memory)}GB
      </ul>
      <ul>
        <u>pods:</u> {allocatable!.pods} /{' '}
        {capacity!.pods}
      </ul>
        </div>
      <strong>images:</strong>
      <div className="image-scrollbox">{imageList}</div>
    </div>
  );
}

export default NodeCard;
