import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import useAsyncEffect from 'use-async-effect';
import type { newDynamicPromObject } from '../../../types';
import Loading from './Loading';
import { convertBytesToGBDecimal } from '../../../functions';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  maintainAspectRatio: true,
  redraw: false,
  color: '#ffffff',
  plugins: {
    legend: {
      display: false
    },
    title: {
      display: true,
      text: 'Memory Usage By Container'
    }
  }
};

const MemoryUsageChart = () => {
  const [chartD, setChartD] = React.useState({
    labels: [] as string[],
    datasets: [
      {
        label: '',
        data: [] as string[],
        backgroundColor: '#eeeeee'
      }
    ]
  });
  const [haveData, setHaveData] = React.useState(false);

  useAsyncEffect(async () => { await fetchData(); }, []);

  const fetchData = async () => {
    const data = await fetch('/api/prom/metrics/dynamic',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ queries: ['container_memory_usage_bytes'] })
      });
    const jsonData = await data.json();
  };

  const addData = (data: newDynamicPromObject[]) => {
    const labels: string[] = [];
    const datasets: Array<{ label: string, data: string[], backgroundColor: string, barPercentage: number, categoryPercentage: number }> = [];
    if (data.length === 0) {
      // If data is undefined or empty, return an empty component or message.
      // Example: return <p>No data available.</p>;
      setHaveData(false);
    } else {
      // needs to be guarded against undefined or null data
      data.forEach((e) => {
        if (!labels.includes(e.container!)) {
          labels.push(e.container!);
        }
        const valueConvertedToGB = `${convertBytesToGBDecimal(parseFloat(e.value!), 2)}`;
        datasets.push({
          label: e.container!,
          data: [valueConvertedToGB],
          backgroundColor: '#eeeeee',
          barPercentage: 0.5,
          categoryPercentage: 34
        });
      });
      const updatedChartD = {
        labels,
        datasets
      };

      setHaveData(true);
      setChartD(updatedChartD);
    }
  };

  if (!haveData) {
    return <p>there is currently no data</p>;
  } else {
    return (
      <div>
        <Bar
          options={options}
          data={chartD}
          redraw={true}
        />
      </div>
    );
  }
};

export default MemoryUsageChart;