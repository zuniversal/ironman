import React from 'react';
import { useRequest } from 'umi';
import ReactEchartsCore from 'echarts-for-react/lib/core';
import echarts from 'echarts/lib/echarts';
import get from 'lodash/get';
import fill from 'lodash/fill';
import assign from 'lodash/assign';
import map from 'lodash/map';
import isEmpty from 'lodash/isEmpty';
import * as services from '@/services/smartMonitor';
import Container from '@/components/Container';

const color5Day = 'rgba(5,252,253,0.5)';
const color2Day = 'rgba(255,64,65,0.5)';

const tooltipColorMap = {
  当日实时用电量: '#EBAE3E',
  近2个休息日平均能耗: color2Day,
  近5个工作日平均能耗: color5Day,
};

const tooltipFormatter = params => {
  console.log(params);
  let res = `${params[0].axisValue} 点<br/>`;
  params.forEach(item => {
    res += `<span class="echarts-icon" style="border-color: ${
      tooltipColorMap[item.seriesName]
    }"></span>${item.seriesName}: ${get(item, 'value', '-')}<br/>`;
  });
  return res;
};

const getOption = (_data = []) => {
  const data = map(_data, item => {
    return assign(fill(Array(24), null), item);
  });

  const option = {
    legend: {
      bottom: 20,
      right: 10,
      itemGap: 40,
      itemWidth: 10,
      itemHeight: 10,
      selected: {
        当日实时用电量: true,
        近2个休息日平均能耗: true,
        近5个工作日平均能耗: true,
      },
      data: [
        {
          name: '当日实时用电量',
          icon:
            'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAAXNSR0IArs4c6QAAALhJREFUGBmNkDsOwjAMhm2rA11Rj8JKyxFyAm7BAoKhQoiKW3AAlCNQWDlKxFoGFGNHtVQYAA+JH1/+2Ebo7e6raWRYMPNEU4h4I4TD2LXXFOsRfLUE5i0zoMZmEkQgXBeu3WFSinyW4hMINvkoPyrYPbq5YLW4GRHOsvQdyDuBCndpFOqtCb4EjrBXhqwnUzJKb8spQ8PCN590OgVSTx+k5ZT5e5i0jnAqVyJWsww1FH1bjxV+LfwFfsZeQpKLo6sAAAAASUVORK5CYII=',
        },
        {
          name: '近2个休息日平均能耗',
          icon:
            'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAAXNSR0IArs4c6QAAAKtJREFUGBmNkDsOwjAMhv2XIi7EihSae3CLLiA6IISouAX3CFRizYUQNMZ5VYWFerBs58vvBygZa72inmsiXsYSLM1wgTEPn8M7XustsTvm3NeCAU6QPe7mhKDkuJOHNzE1tJhfA/R8bUTmIHFJBVSZ2hXys0F3awMUXcuqkojP1FMtQJopK43IQV0YAaeZb2kD6mf6taEGO3mZeB5V7cKGzN+jjM+Tu/07+Acd2kyRiHTNUwAAAABJRU5ErkJggg==',
        },
        {
          name: '近5个工作日平均能耗',
          icon:
            'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAAXNSR0IArs4c6QAAAI9JREFUGBmNkIEJwzAMBEUgJnSDDtNVukYh2apzdA7vELCk6pSmEENDDcLS//tlSeRzJvdbafYsajUjcrCdz7uoz6OajU39EGoKlyJehUgj1gAfF/crQQ4Gl860wwXi0CaKFMOFJgqrCHHphWCbidWhJ3/Vg7i8IJvJvRd9MTR/D4NLfHrJyc/Ws7fD+Wzhb4FFqS8uIKsnAAAAAElFTkSuQmCC',
        },
      ],
      // textStyle: {
      //   color: '#ffffff',
      // },
    },
    color: ['#EBAE3E', color2Day, color5Day],
    tooltip: {
      trigger: 'axis',
      formatter: tooltipFormatter,
      axisPointer: {
        lineStyle: {
          color: '#222E34',
        },
      },
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
        interval: 0,
        // rotate: 90,
      },
      splitLine: {
        interval: 0,
      },
      data: Array.from(Array(24)).map((item, index) => `${index}`),
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
    },
    series: [
      {
        name: '近2个休息日平均能耗',
        type: 'line',
        symbol: 'circle',
        symbolSize: 8,
        itemStyle: {
          borderWidth: 2,
          borderColor: color2Day,
          color: '#ffffff',
        },
        lineStyle: {
          color: color2Day,
        },
        data: data[1] || [],
      },
      {
        name: '近5个工作日平均能耗',
        type: 'line',
        symbol: 'circle',
        symbolSize: 8,
        itemStyle: {
          borderWidth: 2,
          borderColor: color5Day,
          color: '#ffffff',
        },
        lineStyle: {
          color: 'rgba(5,252,253,0.7)',
        },
        color: color5Day,
        data: data[2] || [],
      },
      {
        name: '当日实时用电量',
        type: 'line',
        symbol: 'circle',
        symbolSize: 8,
        itemStyle: {
          borderWidth: 2,
          borderColor: '#EBAE3E',
          color: '#ffffff',
        },
        lineStyle: {
          color: '#EBAE3E',
          width: 4,
        },
        color: '#EBAE3E',
        data: data[0] || [],
      },
    ],
  };
  return option;
};

const handleTransData = (data = []) => {
  return data.map(item => {
    if (item === null) return '-';
    return item;
  });
};

export default React.memo(function EnergyChart(props) {
  const {
    number,
    stationId,
    point,
    load,
    startTime,
    endTime,
    value,
    point_id,
  } = props;

  const { data, loading } = useRequest(
    () => {
      if (!load) {
        return '';
      }
      const params = {
        startTime,
        endTime,
        value: props.value,
        point_id: point,
      };
      const queryParams = `?point_id=${point_id}&start_time=${startTime}&end_time=${endTime}&value=${value}`;
      console.log(' query ： ', props, point_id, queryParams); //
      return services.getAlarmCurveList(queryParams);
      return services.getEnergy({ number, stationId, point });
    },
    {
      formatResult(res) {
        return res;
        return get(res, 'bean', null);
      },
      refreshDeps: [point, load],
      ready: !!point,
    },
  );

  const today = handleTransData(get(data, 'bean.today', ['-']));
  const weekend = handleTransData(get(data, 'bean.rest_day', ['-']));
  const work = handleTransData(get(data, 'bean.working_day', ['-']));
  // console.log(' today, weekend, work ： ', data, today, weekend, work,  )//

  return (
    <Container loading={loading} empty={isEmpty(data)}>
      <ReactEchartsCore
        option={getOption([today, weekend, work])}
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
