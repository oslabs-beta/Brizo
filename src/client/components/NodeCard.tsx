import React from 'react';
import type { nodeCardProps } from '../../../types';
import CopyUID from './CopyUID';
function NodeCard (props: nodeCardProps) {
  const convertKiToGB = (kiValue: string) =>
    Math.floor(parseInt(kiValue) / 976600);
  const convertBytesToMB = (bytesValue: number | undefined) => {
    if (bytesValue === undefined) return 0;
    return Math.floor(bytesValue * 0.000001);
  };

  const { name, uid, podCIDRs, addresses, allocatable, capacity, images } =
    props;

  const addressList = addresses.map((address, index) => (
    <ul key={`address${uid}${index}`}>
      {address.address} | {address.type}
    </ul>
  ));
  const imageList = images.map((imageObject, index) => {
    return (
        <ul key={`image${index}`}>
        {imageObject.names![1]} | size: {convertBytesToMB(imageObject.sizeBytes)}MB
        </ul>
    );
  });

  return (
    <div className="card">
      <h3>{name}</h3>
      <h4>{uid} <CopyUID uid={uid} /></h4>
      <ul>podCIDRs: {podCIDRs}</ul>
      <ul>addresses:</ul>
      {addressList}
      <ul>allocatable resources / capacity</ul>
      <ul>
        cpu cores: {allocatable!.cpu} / {capacity!.cpu} | allocatable storage:{' '}
        {convertKiToGB(allocatable!['ephemeral-storage'])}GB /{' '}
        {convertKiToGB(capacity!['ephemeral-storage'])}GB
      </ul>
      <ul>
        hugepages-1Gi: {allocatable!['hugepages-1Gi']} /{' '}
        {capacity!['hugepages-1Gi']} | hugepages-2Mi:{' '}
        {allocatable!['hugepages-2Mi']} / {capacity!['hugepages-2Mi']}
      </ul>
      <ul>
        hugepages-32Mi: {allocatable!['hugepages-32Mi']} /{' '}
        {capacity!['hugepages-32Mi']} | hugepages-64Ki:{' '}
        {allocatable!['hugepages-64Ki']} / {capacity!['hugepages-64Ki']}
      </ul>
      <ul>
        memory: {convertKiToGB(allocatable!.memory)}GB /{' '}
        {convertKiToGB(capacity!.memory)}GB | pods: {allocatable!.pods} /{' '}
        {capacity!.pods}
      </ul>
      <ul>images:</ul>
      <div className="image-scrollbox">{imageList}</div>
    </div>
  );
}

export default NodeCard;
