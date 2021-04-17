import { toolbox } from '../common';
import { PRIMARY } from '@/constants';

const option = (radar = [], data = []) => {
  console.log(' Radar option radar, data ： ', radar, data);

  return {
    color: [
      PRIMARY,
      '#108ee9',
      '#f50',
      '#13CE66',
      '#006699',
      '#e5323e',
      '#4cabce',
    ],
    title: {
      text: '',
      subtext: '',
      x: 'center',
    },
    tooltip: {
      trigger: 'item',
    },
    toolbox,
    radar,
    radar: [
      {
        indicator: [
          { text: '客户企业规模', max: 100 },
          { text: '客户资产规模', max: 100 },
          { text: '客户用电规模', max: 100 },
          { text: '客户资产健康度', max: 100 },
        ],
      },
    ],
    series: [
      {
        name: '',
        type: 'radar',
        data,
        data: [
          {
            value: [60, 73, 85, 40],
            name: '客户画像',
          },
        ],
        // 光亮区
        areaStyle: {},
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
