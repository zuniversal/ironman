import React from 'react';
import ReactEchartsCore from 'echarts-for-react/lib/core';
import echarts from 'echarts/lib/echarts';
import { useRequest } from 'umi';
import get from 'lodash/get';
import moment from 'moment';
import isEmpty from 'lodash/isEmpty';
import * as services from '@/services/smartMonitor';
import Container from '@/components/Container';
import { createIndexArr } from '@/utils';

const areaColor = [
  'rgba(255, 64, 65, .2)',
  'rgba(14, 244, 245, .2)',
  'rgba(255, 174, 50, .2)',
  'rgba(12, 235, 163, .2)',
];

const getOption = (data = [], config = {}) => {
  const date = get(data, '[0].time', []);
  const startDate = moment(date[0]);
  const dateCount = date.length;
  const endDate = moment(date[dateCount - 1]);
  const diff = endDate.diff(startDate, 'days');
  const option = {
    legend: {
      bottom: 20,
      right: 10,
      itemGap: 40,
      itemWidth: 10,
      itemHeight: 10,
      icon: 'circle',
      // textStyle: {
      //   color: '#ffffff',
      // },
    },
    color: [
      'rgba(255, 64, 65, .8)',
      'rgba(14, 244, 245, .8)',
      'rgba(255, 174, 50, .8)',
      'rgba(12, 235, 163, .8)',
    ],
    tooltip: {
      trigger: 'axis',
      // formatter: tooltipFormatter,
      // axisPointer: {
      //   lineStyle: {
      //     color: '#222E34',
      //   },
      // },
    },
    grid: {
      left: 30,
      right: 40,
      bottom: 50,
      containLabel: true,
    },
    // dataZoom: [{
    //   type: 'slider'
    // },
    // {
    //   // type: 'inside',
    //   start: 0,
    //   end: 20
    // },
    // {
    //   start: 0,
    //   end: 20
    // }
    // ],
    // xAxis: {
    //   splitNumber: 10,
    // },
    xAxis: {
      type: 'category',
      name: '时间',
      boundaryGap: false,
      axisLine: {
        // lineStyle: {
        //   color: '#ffffff',
        // },
      },
      axisLabel: {
        // showMaxLabel: false,
        // interval: function(index, value) {
        //   return diff;
        // },
        // rotate: 90,
        formatter: function(value, index) {
          const momentValue = moment(value);
          return momentValue.format('MM-DD HH:mm');
          // 大于 5 天只显示 月-日
          if (diff > 5) {
            return momentValue.format('MM-DD');
          }
          if (momentValue.hours() === 0) {
            return momentValue.format('MM-DD');
          }
          return moment(value).format('HH:mm');
        },
      },
      // splitLine: {
      //   interval: 0,
      // },
      data: date,
      interval: 15,
    },
    yAxis: {
      type: 'value',
      name: 'kWh',
      axisLine: {
        // lineStyle: {
        //   color: '#ffffff',
        // },
      },
      axisLabel: {
        formatter: (value, index) => value.toFixed(3),
      },
      splitLine: {
        lineStyle: {
          color: '#222E34',
        },
      },
      ...get(config, 'yAxis', {}),
    },
    series: data.map((item, index) => ({
      type: 'line',
      // type: 'scatter',
      // symbolSize: 2,
      // showSymbol: false,
      // smooth: true,
      // symbol: 'circle',
      showAllSymbol: true,
      symbolSize: 3,
      lineStyle: {
        width: 1,
      },
      // animationDelay: 1000,
      // animationDuration: 1500,
      // animationThreshold: 3000,
      // areaStyle: {
      //   color: areaColor[index],
      // },
      ...item,
    })),
  };
  return option;
};

const mapConfig = ['pfsum', 'psum'];
//
const fieldsMap = {
  pfsum: 'pf',
  psum: 'p',
};

export default React.memo(function ChartLine(props) {
  const {
    point_id,
    startTime,
    endTime,
    load,
    unit = '',
    min = 0,
    fields = [],
    formatter = v => v,
    dayRange,
  } = props;
  const query = fields.map(item => `&value=${item.value}`).join('');
  const { data = [], loading } = useRequest(
    () => {
      if (!startTime || !endTime) {
        return '';
      }
      // const query = {}
      // fields.forEach((v, i) => {
      //   console.log(' query ： ', fields, query, v, )//
      //   query[v.value] = v.value
      // })
      const queryParams = `?point_id=${point_id}&start_time=${startTime}&end_time=${endTime}${query}`;
      console.log(' query ： ', props, point_id, fields, query, queryParams); //
      return services.getAlarmCurveList(queryParams);
      return services.getAlarmCurveList({
        point_id,
        startTime,
        endTime,
        ...query,
      });
    },
    {
      formatResult(res) {
        // return get(res, 'list', [])
        console.log(' resres get(res,, []) ： ', get(res, 'list', [])); //
        return get(res, 'list', []).map(v => ({
          ...v,
          tm: moment(v.tm).format('YYYY-MM-DD HH:mm'),
        }));
      },
      refreshDeps: [
        point_id,
        startTime,
        endTime,
        // load
      ],
      // ready: point_id && startTime && endTime,
    },
  );
  // const data = data.map((v) => ({...v, tm: moment(v.tm).format('YYYY-MM-DD HH:mm')}));
  console.log(' resres data ： ', data, dayRange, props); //

  const chartData = fields.map(item => {
    const time = [];

    return {
      data: !!data.length
        ? dayRange
            .map(v => {
              const res = data.find(item => item.tm == v.tm);
              return {
                ...v,
                ...(res ?? {}),
              };
            })
            // data
            .map((i, index) => {
              // time[index] = moment(i.tm).format('YYYY-MM-DD HH:mm:ss');
              time[index] = moment(i.tm).format('YYYY-MM-DD HH:mm');
              // time[index] = i.tm;
              if (item.value === 'px') {
                return (i.p_d * 1).toFixed(2);
              }
              if (item.value === 'p_rate') {
                return (i[item.value] * 100).toFixed(2);
              }
              const items = formatter(i[item.value]);
              if (mapConfig.includes(item.value)) {
                const items = formatter(i[fieldsMap[item.value]]);
                return items || items == 0 ? items.toFixed(2) : '-';
              }
              // return `${2220 * Math.random().toFixed(1)}`;
              return items || items == 0 ? items.toFixed(2) : '-';
              return items || items == 0 ? items.toFixed(2) : '0';
            })
        : // .filter((v) => v != '-')
          [],
      ...item,
      time,
      time: dayRange.map(v => v.tm),
    };
  });
  console.log(
    ' chartData ： ',
    data,
    dayRange,
    // [
    //   ...dayRange,
    //   ...data,
    // ],
    // d2.diff(d1, 'minutes'),
    // createIndexArr(d2.diff(d1, 'minutes')),
    props,
    fields,
    chartData,
    getOption(chartData, { yAxis: { name: unit, min } }),
  ); //
  return (
    <Container loading={loading} empty={isEmpty(data)}>
      <ReactEchartsCore
        option={getOption(chartData, { yAxis: { name: unit, min } })}
        echarts={echarts}
        notMerge={true}
        lazyUpdate={true}
        style={{
          // width: '766px',
          height: '365px',
        }}
      />
    </Container>
  );
});
