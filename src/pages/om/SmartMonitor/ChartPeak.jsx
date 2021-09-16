// 峰平谷
import React from 'react';
import ReactEchartsCore from 'echarts-for-react/lib/core';
import echarts from 'echarts/lib/echarts';
import { useRequest } from 'umi';
import get from 'lodash/get';
import * as services from '@/services/smartMonitor';
import Container from '@/components/Container';
import styles from './index.less';

const text = val => (val ? val.toFixed(2) : val);
const getOption = ({ data = [], name = '', unit = '' }) => {
  const legendMap = data.reduce((obj, cur) => {
    obj[cur.name] = cur.value;
    return obj;
  }, {});
  const option = {
    tooltip: {
      trigger: 'item',
    },
    grid: {
      bottom: 150,
    },
    color: [
      // 'rgba(255, 64, 65, 1)',
      // '#65da79',
      // // 'rgba(255, 174, 50, 1)',
      // 'rgba(14, 244, 245, 1)',
      // 'red',
      // 'green',
      // 'blue',
      // 'rgba(14, 244, 245, 1)',

      '#FFC007', '#18B263', '#42A5F5'
      // '#ea5b65'
    ],
    legend: {
      bottom: 0,
      icon: 'circle',
      // itemGap: 60,
      textStyle: {
        // color: '#ffffff',
        padding: [0, 30, 0, 0],
      },
      formatter: function(name) {
        return `${name}: ${text(legendMap[name])} ${unit}`;
      },
    },
    series: [
      {
        name,
        type: 'pie',
        radius: '50%',
        center: ['45%', '40%'],
        label: {
          formatter: '{b}\n{d}%',
          lineHeight: 15,
          // color: '#fff',
        },
        data,
      },
    ],
  };
  return option;
};

export default React.memo(function ChartPeak(props) {
  const {
    number,
    stationId,
    point,
    startTime,
    endTime,
    load,
    value,
    point_id,
  } = props;
  const { data, loading } = useRequest(
    () => {
      if (!startTime || !endTime || !load) {
        return '';
      }
      // return services.getPeakData({
      //   number,
      //   stationId,
      //   point,
      //   startTime,
      //   endTime,
      // });
      const params = {
        startTime,
        endTime,
        value: props.value,
        point_id: point,
      };
      const queryParams = `?point_id=${point_id}&start_time=${startTime}&end_time=${endTime}&value=${value}`;
      // const queryParams = `?point_id=${1755}&start_time=${startTime}&end_time=${endTime}&value=${value}`;
      console.log(' query ： ', props, point_id, queryParams); //
      return services.getAlarmCurveList(queryParams);
    },
    {
      formatResult(res) {
        return get(res, 'bean', null);
      },
      refreshDeps: [point, startTime, endTime, load],
      ready: !!point,
    },
  );
  if (loading) {
    return <Container loading={loading} />;
  }

  const chartCount = [
    { name: '峰', value: get(data, 'ele.peak', 0) },
    { name: '平', value: get(data, 'ele.usual', 0) },
    { name: '谷', value: get(data, 'ele.valley', 0) },
  ];
  const chartCost = [
    { name: '峰', value: get(data, 'fee.peak', 0) },
    { name: '平', value: get(data, 'fee.usual', 0) },
    { name: '谷', value: get(data, 'fee.valley', 0) },
  ];
  const totalCount = chartCount.reduce((count, cur) => {
    return count + cur.value;
  }, 0);
  const totalCost = chartCost.reduce((cost, cur) => {
    return cost + cur.value;
  }, 0);
  let average = totalCost / totalCount;
  average = average ? average.toFixed(2) : '-';
  return (
    <div className={styles.peak}>
      <div>
        <div>峰平谷电量</div>
        <ReactEchartsCore
          option={getOption({
            data: chartCount,
            name: '峰平谷电量',
            unit: '度',
          })}
          echarts={echarts}
          notMerge={true}
          lazyUpdate={true}
        />
        <div className={styles.peakText}>总电量: {text(totalCount)} 度</div>
      </div>
      <div>
        <div>峰平谷电费</div>
        <ReactEchartsCore
          option={getOption({
            data: chartCost,
            name: '峰平谷电费',
            unit: '元',
          })}
          echarts={echarts}
          notMerge={true}
          lazyUpdate={true}
        />
        <div className={styles.peakText}>
          <span>平均电费: {average}元/度</span>
          <span>总电费: {text(totalCost)} 元</span>
        </div>
      </div>
    </div>
  );
});
