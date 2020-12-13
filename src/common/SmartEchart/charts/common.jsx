export const tooltip = {
  tooltip: {
    trigger: 'item',
    axisPointer: {
      type: 'cross',
      crossStyle: {
        color: '#999',
      },
    },
  },
};

export const grid = {
  // left: 0,
  // right: 10,
  // top: 0,
  // bottom: 10,
  // left: '5%',
  // right: '5%',
  // top: '10%',
  // bottom: '10%',
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
