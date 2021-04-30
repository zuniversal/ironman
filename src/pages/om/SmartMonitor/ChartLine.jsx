import React from 'react';
import ReactEchartsCore from 'echarts-for-react/lib/core';
import echarts from 'echarts/lib/echarts';
import { useRequest } from 'umi';
import get from 'lodash/get';
import moment from 'moment';
import isEmpty from 'lodash/isEmpty';
import * as services from '@/services/smartMonitor';
import Container from '@/components/Container';

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
      left: '2%',
      right: 40,
      bottom: 50,
      containLabel: true,
    },
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
    },
    yAxis: {
      type: 'value',
      name: 'kWh',
      axisLine: {
        // lineStyle: {
        //   color: '#ffffff',
        // },
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
      showSymbol: false,
      smooth: true,
      // animationDelay: 1000,
      // animationDuration: 1500,
      // animationThreshold: 3000,
      areaStyle: {
        color: areaColor[index],
      },
      ...item,
    })),
  };
  return option;
};

export default React.memo(function ChartLine(props) {
  const {
    number,
    stationId,
    point,
    startTime,
    endTime,
    load,
    unit = '',
    min = 0,
    fields = [],
    formatter = v => v,
  } = props;
  const query = fields.map(item => `&value=${item.value}`).join('');
  const { data, loading } = useRequest(
    () => {
      if (!startTime || !endTime || !load) {
        return '';
      }
      return services.getMonitorData({
        number,
        stationId,
        point,
        startTime,
        endTime,
        query,
      });
    },
    {
      formatResult(res) {
        return get(res, 'list', []);
      },
      refreshDeps: [point, startTime, endTime, load],
      ready: point && startTime && endTime,
    },
  );

  const chartData = fields.map(item => {
    const time = [];
    return {
      data: data
        ? data.map((i, index) => {
            time[index] = moment(i.tm).format('YYYY-MM-DD HH:mm:ss');
            return formatter(i[item.value]) || '-';
          })
        : [],
      ...item,
      time,
    };
  });
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