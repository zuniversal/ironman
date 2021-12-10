import React from 'react';
import SmartEchart from '@/common/SmartEchart';

const defaultWeek = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];

const option = params => {
  const { data } = params;
  const xAxisData = params.xAxisData.length > 0 ? params.xAxisData : [];
  // console.log(' xAxisData xAxisDataxAxisData ：', params, xAxisData);
  return {
    xAxis: [
      {
        type: 'category',
        data: xAxisData,
        axisPointer: {
          type: 'shadow',
        },
        axisLabel: {
          color: '#000',
        },
        axisLine: {
          lineStyle: {
            color: '#b4b4b4',
          },
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
          color: '#000',
        },
        axisLine: {
          lineStyle: {
            color: '#b4b4b4',
          },
        },
      },
    ],
    series: [
      {
        name: 'Year Expense',
        name: '',
        type: 'bar',
        barWidth: 10,
        // data: [
        //   52 + Math.round(50 * Math.random()) - Math.round(30 * Math.random()),
        //   55 + Math.round(50 * Math.random()) - Math.round(30 * Math.random()),
        //   59 + Math.round(50 * Math.random()) - Math.round(30 * Math.random()),
        //   26 + Math.round(50 * Math.random()) - Math.round(30 * Math.random()),
        //   28 + Math.round(50 * Math.random()) - Math.round(30 * Math.random()),
        //   70 + Math.round(50 * Math.random()) - Math.round(30 * Math.random()),
        //   175 + Math.round(50 * Math.random()) - Math.round(30 * Math.random()),
        //   182 + Math.round(50 * Math.random()) - Math.round(30 * Math.random()),
        //   48 + Math.round(50 * Math.random()) - Math.round(30 * Math.random()),
        //   78 + Math.round(50 * Math.random()) - Math.round(30 * Math.random()),
        //   86 + Math.round(50 * Math.random()) - Math.round(30 * Math.random()),
        //   62 + Math.round(50 * Math.random()) - Math.round(30 * Math.random()),
        // ],
        data: data,
      },
    ],
  };
};

const HomeBar = props => {
  return (
    <SmartEchart
      // {...props}
      option={option(props)}
    ></SmartEchart>
  );
};

HomeBar.defaultProps = {};

export default HomeBar;
