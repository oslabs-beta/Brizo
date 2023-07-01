import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import useAsyncEffect from 'use-async-effect';
import type { newPromObject } from '../../../types';
interface datasetsType {
  label: string
  data: string[]
}
interface chartType {
  labels: string[]
  datasets: datasetsType[]
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart'
    }
  }
};

const MemoryUsageChart = () => {
  const [chartD, setChartD] = React.useState<chartType>({
    labels: [''],
    datasets: [{
      label: '',
      data: ['bruh']
    }]
  });
  const [haveData, setHaveData] = React.useState(false);
  useAsyncEffect(async () => {
    const response = await fetchData();
    addData(response);
  }, []);

  // const updateInterval = 100;
  const fetchData = async () => {
    const data = await fetch('/api/prom/metrics/default',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ queries: ['container_memory_usage_bytes'] })
      });
    const data2 = await data.json();
    return data2;
  };

  const addData = (data: newPromObject[]) => {
    setChartD({
      labels: data.map((qresult) => qresult.name !== undefined ? qresult.name : ''),
      datasets: [{
        label: 'bruh',
        data: data.map((qresult) => qresult.value !== undefined ? qresult.value : '')
      }]
    });
    setHaveData(true);
  };

  if (!haveData) {
    return <p> loading </p>;
  } else {
    return (
    <div>
      <p>HELLO MEMEORY US</p>
      <Line
        options={options}
        data={chartD}
        redraw={true}
      />
    </div>
    );
  }
};

export default MemoryUsageChart;
