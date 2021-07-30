import React from 'react';
import SmartEchart from '@/common/SmartEchart';

const defaultWeek = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];

const option = params => {
  const { data } = params;
  return {
    title: {
      text: '总数',
      subtext: '111',
      left: 'center',
      top: '40%',
      textStyle: {
        fontSize: 16,
        color: '#666666',
      },
      subtextStyle: {
        fontSize: 30,
        color: '#1C1D21',
      },
    },
    tooltip: {
      trigger: 'item',
    },
    legend: {
      // align: 'right',
      // right: 0,
      // orient: 'vertical',
      right: 'right',
      top: '25%',
      borderRadius: 100,
      // left: 'center'
    },
    series: [
      {
        name: '访问来源',
        type: 'pie',
        radius: ['55%', '70%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center',
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '40',
            fontWeight: 'bold',
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: 1048, name: '搜索引擎' },
          { value: 735, name: '直接访问' },
          { value: 580, name: '邮件营销' },
          { value: 484, name: '联盟广告' },
          { value: 300, name: '视频广告' },
        ],
      },
    ],
  };
};

const RingPieEcharts = props => {
  return (
    <SmartEchart
      // {...props}
      option={option(props)}
    ></SmartEchart>
  );
};

export default RingPieEcharts;
