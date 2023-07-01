import React from 'react';
import type { newPromObject } from '../../../types';
import { convertBytesToGB } from '../../../functions';

const StaticPromComponent = (props: { data: newPromObject, key: number }) => {
  const { data } = props;
  if (data.queryName === 'machine_memory_bytes') data.value = `${convertBytesToGB(Number(data.value))}GB`;

  return (
    <>
      <p style={{ display: 'inline' }}>{data.queryName}</p>
      <p>{data.value}</p>
    </>
  );
};

export default StaticPromComponent;
