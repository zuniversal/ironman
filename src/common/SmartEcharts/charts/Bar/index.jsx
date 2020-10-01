import { toolbox } from '../common';
import { PRIMARY } from '@/constants';

const option = params => {
  const { legend, xAxis, data, noToolBox } = params;

  return {
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
      },
      {
        type: 'value',
        name: 'Expense Trend',
        name: '',
        axisLabel: {
          formatter: '{value}',
        },
      },
    ],
    series: [
      {
        name: 'Year Expense',
        name: '',
        type: 'bar',
        barWidth: 10,
        data: [
          52.6,
          55.9,
          59.0,
          26.4,
          28.7,
          70.7,
          175.6,
          182.2,
          48.7,
          78.8,
          86.0,
          62.3,
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
