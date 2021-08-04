import get from 'lodash/get';
import moment from 'moment';

export const getShowRealData = data => {
  const mapping = [
    {
      label: 'IMEI号',
      value: 'imei',
    },
    {
      label: 'A相电压',
      value: 'ua',
    },
    {
      label: 'B相电压',
      value: 'ub',
    },
    {
      label: 'C相电压',
      value: 'uc',
    },
    {
      label: 'AB线电压',
      value: 'uab',
    },
    {
      label: 'BC线电压',
      value: 'ubc',
    },
    {
      label: 'CA线电压',
      value: 'uca',
    },
    {
      label: 'A相电流',
      value: 'ia',
    },
    {
      label: 'B相电流',
      value: 'ib',
    },
    {
      label: 'C相电流',
      value: 'ic',
    },
    {
      label: '剩余电流',
      value: 'ir',
    },
    {
      label: 'A相有功功率',
      value: 'pa',
    },
    {
      label: 'B相有功功率',
      value: 'pb',
    },
    {
      label: 'C相有功功率',
      value: 'pc',
    },
    {
      label: '总有功功率',
      value: 'p',
    },
    {
      label: 'A相无功功率',
      value: 'qa',
    },
    {
      label: 'B相无功功率',
      value: 'qb',
    },
    {
      label: 'C相无功功率',
      value: 'qc',
    },
    {
      label: '总无功功率',
      value: 'q',
    },
    {
      label: 'A相视在功率',
      value: 'sa',
    },
    {
      label: 'A相视在功率',
      value: 'sb',
    },
    {
      label: 'A相视在功率',
      value: 'sc',
    },
    {
      label: 'A相视在功率',
      value: 's',
    },
    {
      label: 'A相功率因数',
      value: 'pfa',
    },
    {
      label: 'B相功率因数',
      value: 'pfb',
    },
    {
      label: 'C相功率因数',
      value: 'pfc',
    },
    {
      label: '总功率因数',
      value: 'pf',
    },
    {
      label: '电源频率',
      value: 'f',
    },
    {
      label: '总有功电能',
      value: 'ept',
    },
    {
      label: '正向无功电能',
      value: 'eqi',
    },
    {
      label: '反向无功电能',
      value: 'eqe',
    },
    {
      label: '总有功功率实时需量',
      value: 'p_d',
    },
    {
      label: '三相电压不平衡度',
      value: 'lvur',
    },
    {
      label: '三相电流不平衡度',
      value: 'iur',
    },
    {
      label: 'A相电压总谐波畸变率',
      value: 'ua_thd',
    },
    {
      label: 'B相电压总谐波畸变率',
      value: 'ub_thd',
    },
    {
      label: 'C相电压总谐波畸变率',
      value: 'uc_thd',
    },
    {
      label: 'A相电流总谐波畸变率',
      value: 'ia_thd',
    },
    {
      label: 'B相电流总谐波畸变率',
      value: 'ib_thd',
    },
    {
      label: 'C相电流总谐波畸变率',
      value: 'ic_thd',
    },
    {
      label: '温度1',
      value: 't1',
    },
    {
      label: '温度2',
      value: 't2',
    },
    {
      label: '温度3',
      value: 't3',
    },
    {
      label: '温度4',
      value: 't4',
    },
    {
      label: '负载率',
      value: 'p_rate',
    },
    {
      label: '数据时间',
      value: () => {
        const val = get(data, 'tm');
        // return val ? moment(val).format('YYYY-MM-DD hh:mm:ss') : '-';
        return val ? val.split('T').join(' ') : '-';
      },
    },
  ];
  return mapping.map(item => {
    let value;
    // if (typeof item.value === 'number') {
    if (!isNaN(item.value)) {
      value = Number(item.value.toFixed(3));
    }
    if (typeof item.value === 'function') {
      value = item.value();
    } else {
      value = get(data, item.value, '-');
    }
    // console.log(' valuevalue ： ', value, item); //
    return {
      label: item.label,
      value,
    };
  });
};

function transNumber(val) {
  return val ? val.toFixed(3) : '-';
}
