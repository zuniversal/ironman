import React from 'react';
import './style.less';
import SmartEchart from '@/common/SmartEchart';

import { createIndexArr } from '@/utils';

const dayHoursArr = createIndexArr(24).map(
  v => `${v}`.padStart(2, '0') + ':00',
);

const weekArr = [
  '周日',
  '周一',
  '周二',
  '周三',
  '周四',
  '周五',
  '周六',
  '周六',
];

const datas = [
  121.6,
  151.9,
  191.0,
  201.7,
  231.4,
  261.7,
  281.6,
  221.2,
  284.3,
  321.7,
  371.0,
  351.8,

  353.6,
  323.9,
  283.0,
  213.4,
  253.7,
  243.7,
  213.6,
  253.2,
  113.7,
  183.8,
  133.0,
  163.3,
];

const option = params => {
  const {
    data,
    chartSearchInfo,
    chartTimeData,
    yAxisTitle = '有功电量:kWh',
    yAxisTitle2 = '单价:元',
    legendData = ['平', '电度电量'],
    yAxisTitleArr = [],
  } = params;
  const xAxisMap = {
    day: dayHoursArr,
    week: chartTimeData,
    month: chartTimeData,
    week: weekArr,
  };
  const xAxis = params.xAxis ?? xAxisMap['week'] ?? dayHoursArr;
  return {
    grid: {
      left: '8%',
      right: '5%',
    },
    legend: {
      data: legendData,
    },
    xAxis: [
      {
        type: 'category',
        axisPointer: {
          type: 'shadow',
        },
        data: xAxis,
        boundaryGap: false,
      },
    ],
    yAxis: [
      {
        type: 'value',
        name: yAxisTitle,
        axisLabel: {
          formatter: '{value}',
        },
        axisLine: {
          show: false,
        },
      },
      {
        type: 'value',
        name: yAxisTitle2,
        axisLabel: {
          formatter: '{value}',
        },
        axisLine: {
          show: false,
        },
      },
    ],
    series: [
      {
        name: yAxisTitle,
        type: 'line',
        yAxisIndex: 0,
        symbol: 'circle',
        symbolSize: 8,
        itemStyle: {
          normal: {
            color: '#1CBB51',
            borderWidth: 3,
            borderColor: '#1CBB51', //拐点边框颜色
          },
        },
        areaStyle: {
          color: 'rgba(229, 248, 238, .6)',
        },
        data,
        // data: datas.map(v => v + 100),
      },
      // {
      //   name: yAxisTitle,
      //   type: 'line',
      //   yAxisIndex: 0,
      //   symbol: 'circle',
      //   symbolSize: 8,
      //   itemStyle: {
      //     normal: {
      //       color: '#FD7D7D',
      //       borderWidth: 3,
      //       borderColor: '#FD7D7D', //拐点边框颜色
      //     },
      //   },
      //   areaStyle: {
      //     color: 'rgba(255, 64, 65, .2)',
      //   },
      //   data: params.data2,
      //   // data: datas,
      // },
    ],
    series: data.map((v, i) => ({
      name: yAxisTitleArr.length > 0 ? yAxisTitleArr[i] : yAxisTitle,
      type: 'line',
      yAxisIndex: 0,
      symbol: 'circle',
      symbolSize: 8,
      // itemStyle: {
      //   normal: {
      //     color: '#1CBB51',
      //     borderWidth: 3,
      //     borderColor: '#1CBB51', //拐点边框颜色
      //   },
      // },
      // areaStyle: {
      //   color: 'rgba(229, 248, 238, .6)',
      // },
      data: v,
    })),
  };
};

const LineEcharts = props => {
  return <SmartEchart {...props} option={option(props)}></SmartEchart>;
};

LineEcharts.defaultProps = {};

export default LineEcharts;
