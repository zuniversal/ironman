import React from 'react';
import './style.less';
import SmartEchart from '@/common/SmartEchart';

const optionHandle = params => {
  // const {
  //   data = [],
  //   chartTimeData,
  //   yAxisTitle = '有功电量:kWh',
  //   yAxisTitle2 = '单价:元',
  //   legendData = ['平', '电度电量'],
  //   yAxisTitleArr = [],
  //   lineNameArr = [],
  //   yAxisIndex,
  // } = params;
  // console.log(' optionoption ： ', params); //
  // const xAxisMap = {
  //   day: dayHoursArr,
  //   week: chartTimeData,
  //   month: chartTimeData,
  //   week: weekArr,
  // };
  // const xAxis = params.xAxis ?? xAxisMap['week'] ?? dayHoursArr;

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
        radius: ['40%', '70%'],
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
  const option = optionHandle(props);
  console.log(' RingPieEcharts   ： ', props, option); //
  return <SmartEchart {...props} option={option}></SmartEchart>;
};

export default RingPieEcharts;
