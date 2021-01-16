import { PRIMARY } from '@/constants';

export const gridZero = {
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
};

export const color = [
  PRIMARY,
  '#f50',
  '#108ee9',
  '#13CE66',
  '#e5323e',
  '#4cabce',
  '#006699',
];

export const tooltip = {
  trigger: 'axis',
  axisPointer: {
    type: 'cross',
    crossStyle: {
      color: '#999',
    },
  },
};

export const grid = {
  // left: 0,
  // right: 10,
  // top: 0,
  // bottom: 10,

  left: '5%',
  right: '2%',
  top: '12%',
  bottom: '10%',
};

export const splitLine = {
  show: true,
  lineStyle: {
    type: 'dashed',
    color: ['#f0f0f0'],
  },
};

export const toolbox = {
  feature: {
    dataView: {
      show: true,
      readOnly: false,
      // lang: [  ]
    },
    magicType: {
      show: true,
      type: ['line', 'bar'],
    },
    restore: {
      show: true,
    },
    saveAsImage: {
      show: true,
    },
  },
};

export default {
  color,
  tooltip,
  grid,
  splitLine,
  // toolbox,
};
