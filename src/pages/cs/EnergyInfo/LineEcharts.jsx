import React from 'react';
import './style.less';
import SmartEchart from '@/common/SmartEchart';

import { createIndexArr } from '@/utils';

const dayHoursArr = createIndexArr(24).map(
  v => `${v}`.padStart(2, '0') + ':00',
);

const areaStyleConfig = [
  {
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
  },
  {
    itemStyle: {
      normal: {
        color: '#FD7D7D',
        borderWidth: 3,
        borderColor: '#FD7D7D',
      },
    },
    areaStyle: {
      color: 'rgba(255, 64, 65, .8)',
    },
  },
  {
    itemStyle: {
      normal: {
        color: '#3fafff',
        borderWidth: 3,
        borderColor: '#3fafff',
      },
    },
    areaStyle: {
      color: 'rgba(14, 244, 245, .8)',
    },
  },
];

export const weekArr = [
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

const optionHandle = params => {
  const {
    data = [],
    chartSearchInfo,
    chartTimeData,
    yAxisTitle = '有功电量:kWh',
    yAxisTitle2 = '单价:元',
    legendData = ['平', '电度电量'],
    yAxisTitleArr = [],
    lineNameArr = [],
    yAxisIndex,
  } = params;
  console.log(' optionoption ： ', params); //
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
      left: '15%',
      right: '8%',
    },
    legend: {
      data: yAxisTitleArr ?? legendData,
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
    yAxis:
      yAxisTitleArr.length > 0
        ? yAxisTitleArr.map((v, i) => ({
            type: 'value',
            name: v,
            axisLabel: {
              formatter: '{value}',
              fontSize: 10, 
            },
            axisLine: {
              show: false,
            },
          }))
        : [
            {
              type: 'value',
              name: yAxisTitle2,
              axisLabel: {
                formatter: '{value}',
                fontSize: 10, 
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
            borderColor: '#1CBB51',
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
    series:
      yAxisTitleArr.length > 0
        ? data.map((v, i) => ({
            name: lineNameArr.length > 0 ? lineNameArr[i] : yAxisTitle,
            type: 'line',
            yAxisIndex: i,
            yAxisIndex: yAxisIndex ? (i === yAxisIndex ? 1 : 0) : 0,
            // yAxisIndex: 0,
            symbol: 'circle',
            symbolSize: 4,
            smooth: true,
            axisLabel: {
              fontSize: 10, 
            },
            // ...areaStyleConfig[i % 2],
            // ...areaStyleConfig[i],
            data: v,
          }))
        : [
            {
              name: yAxisTitle,
              type: 'line',
              yAxisIndex: 0,
              symbol: 'circle',
              symbolSize: 4,
              smooth: true,
              axisLabel: {
                fontSize: 10, 
              },
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
            },
          ],
  };
};

const LineEcharts = props => {
  const option = optionHandle(props);
  console.log(' LineEcharts optionoption  ： ', props, option); //
  return <SmartEchart {...props} option={option}></SmartEchart>;
};

LineEcharts.defaultProps = {};

export default LineEcharts;
