import { toolbox, splitLine, grid } from '../common';
import { PRIMARY } from '@/constants';

const option = params => {
  const { legend, xAxis, data, noToolBox } = params;

  return {
    grid,
    color: [
      PRIMARY,
      '#f50',
      '#108ee9',
      '#13CE66',
      '#006699',
      '#e5323e',
      '#4cabce',
    ],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        crossStyle: {
          color: '#999',
        },
      },
    },
    toolbox: noToolBox ? null : toolbox,
    toolbox,
    legend: {
      data: legend || ['Year Expense', 'Expense Trend', '平均温度'],
    },
    xAxis: [
      {
        type: 'category',
        data: xAxis || [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'July',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ],
        axisPointer: {
          type: 'shadow',
        },
      },
    ],
    yAxis: [
      {
        type: 'value',
        name: 'Amount',
        name: '',
        axisLabel: {
          formatter: '{value}',
        },
        splitLine,
      },
      {
        type: 'value',
        name: 'Expense Trend',
        name: '',
        axisLabel: {
          formatter: '{value}',
        },
        splitLine,
      },
    ],
    series: [
      {
        name: 'Year Expense',
        name: '',
        type: 'bar',
        barWidth: 10,
        data: [
          52 + Math.round(50 * Math.random()) - Math.round(30 * Math.random()),
          55 + Math.round(50 * Math.random()) - Math.round(30 * Math.random()),
          59 + Math.round(50 * Math.random()) - Math.round(30 * Math.random()),
          26 + Math.round(50 * Math.random()) - Math.round(30 * Math.random()),
          28 + Math.round(50 * Math.random()) - Math.round(30 * Math.random()),
          70 + Math.round(50 * Math.random()) - Math.round(30 * Math.random()),
          175 + Math.round(50 * Math.random()) - Math.round(30 * Math.random()),
          182 + Math.round(50 * Math.random()) - Math.round(30 * Math.random()),
          48 + Math.round(50 * Math.random()) - Math.round(30 * Math.random()),
          78 + Math.round(50 * Math.random()) - Math.round(30 * Math.random()),
          86 + Math.round(50 * Math.random()) - Math.round(30 * Math.random()),
          62 + Math.round(50 * Math.random()) - Math.round(30 * Math.random()),
        ],
      },
      // {
      //     name:'降水量',
      //     type:'bar',
      //     data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
      // },
      {
        name: 'Expense Trend',
        name: '',
        type: 'line',
        yAxisIndex: 1,
        data,
      },
    ],
  };
};

export default option;
