import React from 'react';
import './style.less';
import SmartEchart from '@/common/SmartEchart'; //

import { createIndexArr } from '@/utils';

const dayHoursArr = createIndexArr(24).map(
  v => `${v}`.padStart(2, '0') + ':00',
);

const option = params => {
  const { data } = params;
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
        data: dayHoursArr,
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
        name: '能耗（kWh）',
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
  return <SmartEchart {...props} option={option(props)}></SmartEchart>;
};

CsHomeLine.defaultProps = {};

export default CsHomeLine;
