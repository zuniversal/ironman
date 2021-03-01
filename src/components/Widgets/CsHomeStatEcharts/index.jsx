import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './style.less';
import { DatePicker } from 'antd';
import SmartEcharts from '@/common/SmartEcharts'; //
import SmartEchart from '@/common/SmartEchart'; //
import TimeChoice from '@/components/Widgets/TimeChoice';
import { ANIMATE } from '@/constants'; //
import { createIndexArr } from '@/utils';
import CsHomeLine from '@/components/Echarts/CsHomeLine';

const dayHoursArr = createIndexArr(24).map(
  v => `${v}`.padStart(2, '0') + ':00',
);

const timeChoices = [
  { text: '当日', type: 'day' },
  { text: '本周', type: 'week' },
  { text: '本月', type: 'month' },
];

const option = params => {
  const { data } = params;
  return {
    legend: {
      data: ['数据源1', '数据源2'],
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
        name: '数据源1',
        axisLabel: {
          formatter: '{value}',
        },
      },
    ],
    series: [
      {
        name: '数据源1',
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

const CsHomeStatEcharts = props => {
  return (
    <div className={`${ANIMATE.flipInX} `}>
      <div className={`fsb csHomeStatEcharts `}>
        <div className={'homeTitle'}>电站实时信息</div>
        <TimeChoice
          onOptionChange={props.onOptionChange}
          config={timeChoices}
        ></TimeChoice>
      </div>

      <CsHomeLine {...props}></CsHomeLine>
      {/* <SmartEchart
        {...props}
        option={option(props)}
      ></SmartEchart> */}
      {/* <SmartEcharts
        data={[]}
        type="line"
        legend={legend}
        xAxis={xAxis}
        noToolBox
        {...props}
        // option={option}
      ></SmartEcharts> */}
    </div>
  );
};

CsHomeStatEcharts.defaultProps = {};

CsHomeStatEcharts.propTypes = {};

export default CsHomeStatEcharts;
