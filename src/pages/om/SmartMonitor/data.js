import get from 'lodash/get';
import moment from 'moment';

export const getShowRealData = data => {
  const mapping = [
    {
      label: 'AB线电压V',
      value: () => transNumber(get(data, 'ua') * Math.sqrt(3)),
    },
    {
      label: 'BC线电压V',
      value: () => transNumber(get(data, 'ub') * Math.sqrt(3)),
    },
    {
      label: 'CA线电压V',
      value: () => transNumber(get(data, 'uc') * Math.sqrt(3)),
    },
    {
      label: 'A相电压V',
      value: 'ua',
    },
    {
      label: 'B相电压V',
      value: 'ub',
    },
    {
      label: 'C相电压V',
      value: 'uc',
    },
    {
      label: 'A相电流A',
      value: 'ia',
    },
    {
      label: 'B相电流A',
      value: 'ib',
    },
    {
      label: 'C相电流A',
      value: 'ic',
    },
    {
      label: 'A相有功功率kW',
      value: 'pa',
    },
    {
      label: 'B相有功功率kW',
      value: 'pb',
    },
    {
      label: 'C相有功功率kW',
      value: 'pc',
    },
    {
      label: 'A相无功功率Kvar',
      value: 'qa',
    },
    {
      label: 'B相无功功率Kvar',
      value: 'qb',
    },
    {
      label: 'C相无功功率Kvar',
      value: 'qc',
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
      label: '总有功功率kW',
      value: 'psum',
    },
    {
      label: '总无功功率Kvar',
      value: 'qsum',
    },
    {
      label: '总功率因数',
      value: 'pfsum',
    },
    {
      label: '总有功电度kWh',
      value: 'ep',
    },
    {
      label: '感性无功电度kVarh',
      value: 'eq1',
    },
    {
      label: '容性无功电度kVarh',
      value: 'eq2',
    },
    {
      label: '环境温度',
      value: 't',
    },
    {
      label: '环境湿度',
      value: 's',
    },
    {
      label: '温度（柜体）',
      value: 'tc',
    },
    {
      label: '电网频率HZ',
      value: 'fr',
    },
    {
      label: '有功需量kW',
      value: 'p_d',
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
    console.log(' valuevalue ： ', value, item); //
    return {
      label: item.label,
      value,
    };
  });
};

function transNumber(val) {
  return val ? val.toFixed(3) : '-';
}
