import React from 'react';
import SmartEchart from '@/common/SmartEchart';

import { createIndexArr } from '@/utils';

const dayHoursArr = createIndexArr(24).map(
  v => `${v}`.padStart(2, '0') + ':00',
);

const weekArr = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];

const option = params => {
  const { data, chartSearchInfo, chartTimeData } = params;
  const xAxisMap = {
    day: dayHoursArr,
    // week: weekArr,
    week: chartTimeData,
    month: chartTimeData,
  };
  const xAxis = xAxisMap[chartSearchInfo.type] ?? dayHoursArr;
  return {
    legend: {
      data: ['能耗（kWh）', '数据源2'],
    },
    xAxis: [
      {
        type: 'category',
        axisPointer: {
          type: 'shadow',
        },
        data: xAxis,
      },
    ],
    yAxis: [
      {
        type: 'value',
        name: '能耗（kWh）',
        axisLabel: {
          formatter: '{value}',
        },
      },
    ],
    series: [
      {
        name: '',
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
        data,
      },
    ],
  };
};

const CsHomeLine = props => {
  console.log(' CsHomeLine ： ', props);
  return <SmartEchart {...props} option={option(props)}></SmartEchart>;
};

CsHomeLine.defaultProps = {};

export default CsHomeLine;
