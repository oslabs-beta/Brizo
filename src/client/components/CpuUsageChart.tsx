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
  plugins: {
    legend: {
      display: false
    },
    title: {
      display: true,
      text: 'CPU Usage by Container'
    }
  }
};

const CpuUsageChart = () => {
  const [chartD, setChartD] = React.useState({
    labels: [] as string[],
    datasets: [
      {
        label: '',
        data: [] as string[],
        backgroundColor: '#eeeeee',
        color: 'eeeeee',
        barPercentage: 0.9
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
        body: JSON.stringify({ queries: ['container_cpu_usage_seconds_total'] })
      });
    const jsonData = await data.json();
    addData(jsonData);
  };

  const addData = (data: newDynamicPromObject[]) => {
    const labels: string[] = [];
    const datasets: Array<{ label: string, data: string[], backgroundColor: string, color: string, barPercentage: number, categoryPercentage: number }> = [];

    data.forEach((e) => {
      if (!labels.includes(e.container!)) {
        labels.push(e.container!);
      }
      // console.log(e.container);
      datasets.push({
        label: e.container!,
        data: [e.value!],
        backgroundColor: '#eeeeee',
        color: 'white',
        barPercentage: 0.5,
        categoryPercentage: 34
      });
    });
    // console.log(labels);
    const updatedChartD = {
      labels,
      datasets
    };

    setHaveData(true);
    setChartD(updatedChartD);
    // console.log(updatedChartD);
  };

  if (!haveData) {
    return <p> loading </p>;
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

export default CpuUsageChart;
