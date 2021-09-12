import React from 'react';
import SmartEchart from '@/common/SmartEchart';

const defaultWeek = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];

const space = `\xa0\xa0\xa0`;

export const crmColorConfig = [
  '#00B460',
  '#5E81F4',
  '#FC4949',
  '#36C7EA',
  '#F569CA',
  '#FCA149',
];

const option = params => {
  const { data } = params;
  // const { subtext, } = params.option;
  const { subtext } = params;
  return {
    color: crmColorConfig,
    title: {
      text: '总数',
      subtext,
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
      itemGap: 25,
      icon: 'circle',
      right: 'right',
      top: '25%',
      borderRadius: 100,
      // left: 'center'
      formatter(name) {
        return 'Legend ' + space + name + space + '$xxxxxxx';
      },
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
            fontSize: '20',
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
        data,
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
