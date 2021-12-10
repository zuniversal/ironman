import React, { useState } from 'react';
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
  // 'red',
  // 'black',
  // 'blue',
  // 'green',
  // 'green',
];

const option = params => {
  const { data } = params;
  console.log(
    ' 选项 getIndustry  renderEcharts option ： ',
    params,
    params.subtext,
    params.selectData,
    data,
  ); //
  // const { subtext, } = params.option;
  const { text, subtext } = params;
  return {
    color: crmColorConfig,
    // color: undefined,
    title: {
      text,
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
      top: '15%',
      borderRadius: 100,
      // left: 'center'
      formatter(name) {
        const match = data.find(v => v.name === name);
        // console.log(' namenamename ： ', name, data, match, params); //
        const { percent, amount, label } = match;
        // return 222
        // return name;
        return name + space + percent + space + ' ' + amount;
      },
    },
    series: [
      {
        // name: '访问来源',
        type: 'pie',
        radius: ['55%', '70%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          normal: {
            show: false,
            position: 'center',
            formatter() {
              return ''; //
            },
          },
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
          normal: {
            show: false,
          },
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
  // let subtext = props[v.key][0]?.sum
  const [subtext, setSubtext] = useState(0);
  const [selectData, setSelectData] = useState(props.data);

  const onChartLegendselectchanged = param => {
    let subtext = 0;
    const selectData = props.data.filter(v => param.selected[v.name]);
    selectData.forEach(v => {
      subtext = subtext + v.count;
      // return {
      //   ...v,
      //   selected: param.selected[v.name],
      //   selected: true,
      // }
    });
    selectData.forEach(v => {
      console.log(' onChartLegendselectchanged  vvv ： ', v, subtext, v.count); //
      subtext = subtext + v.count;
    });
    // setSelectData(selectData)
    // setSubtext(subtext)
    console.log(
      ' onChartLegendselectchanged   param,   ： ',
      param,
      props,
      selectData,
      subtext,
    );
  };
  return (
    <SmartEchart
      // {...props}
      // option={{
      //   ...option(props),
      //   // data: selectData,
      //   // selectData,
      //   // subtext: `${subtext}`,
      //   subtext: `${666}`,
      // }}
      option={option(props)}
      onEvents={{
        legendselectchanged: onChartLegendselectchanged,
      }}
      // key={100}
    ></SmartEchart>
  );
};

export default RingPieEcharts;
