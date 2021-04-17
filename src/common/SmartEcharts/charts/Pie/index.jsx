import { toolbox } from '../common';

const option = (data, legend) => {
  console.log(' data, legend ： ', data, legend);
  return {
    // color: color(),
    color: ['#108ee9', '#f50', '#13CE66', '#006699', '#e5323e', '#4cabce'],
    title: {
      text: '某站点用户访问来源',
      subtext: '纯属虚构',
      x: 'center',
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)',
    },
    toolbox,
    legend: {
      orient: 'vertical',
      left: 'left',
      data: legend,
    },
    series: [
      {
        name: 'Country Visit',
        type: 'pie',
        radius: '55%',
        center: ['55%', '60%'],
        data,
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  };
};

export default option;
