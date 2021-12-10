import React, { useRef } from 'react';
import SmartEchart from '@/common/SmartEchart';
import { gridZero } from '@/common/SmartEchart/common';

const defaultWeek = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];

const option = props => {
  const { data, title = '' } = props;
  return {
    ...gridZero,
    animation: false,
    title: {
      text: title,
      // subtext: '',
      x: 'center',
    },
    // legend: {
    //   orient: 'vertical',
    //   left: 'left',
    //   data: legend,
    // },
    series: [
      {
        name: 'Country Visit',
        type: 'pie',
        radius: '55%',
        center: ['55%', '60%'],
        data,
        // data: [
        //   { value: 335, name: '访问直接' },
        //   { value: 310, name: '邮件营销' },
        //   { value: 234, name: '联盟广告' },
        //   { value: 135, name: '视频广告' },
        //   { value: 1548, name: '搜索引擎' },
        // ],
      },
    ],
  };
};

const CsClientReportPie = props => {
  // const domRef = useRef()
  console.log(' CsClientReportPie ： ', props);
  return (
    <SmartEchart
      {...props}
      // ref={domRef}
      option={option(props)}
    ></SmartEchart>
  );
};

CsClientReportPie.defaultProps = {};

export default CsClientReportPie;
