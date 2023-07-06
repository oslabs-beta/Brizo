import React from 'react';
import type { newStaticPromObject } from '../../../types';
import { convertBytesToGB } from '../../../functions';
import { Doughnut } from 'react-chartjs-2';

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const StaticPromComponent = (props: { data: newStaticPromObject, key: string }) => {
  const { data } = props;
  const options = {
    color: '#ffffff',
    plugins: {
      title: {
        display: true,
        text: data.instance
      }
    },
    layout: {
      padding: 5
    },
    maintainAspectRatio: false,
    responsive: true,
    aspectRatio: 1
  };
  let chartData: any;

  if (data.queryName === 'machine_memory_bytes') {
    const memoryInGB = convertBytesToGB(Number(data.value));
    chartData = {
      labels: ['Used Memory (GB)', 'Available Memory (GB)'],
      datasets: [
        {
          data: [memoryInGB, 16 - memoryInGB],
          backgroundColor: ['#FF6384', '#36A2EB'],
          hoverBackgroundColor: ['#FF6384', '#36A2EB']
        }
      ]
    };
  }
  return (
    <>
      <Doughnut style={{ width: '250px', height: '250px' }} data={chartData} options={options}/>
    </>
  );
};

export default StaticPromComponent;
