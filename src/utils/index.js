import React from 'react';
import ReactDOM from 'react-dom';
import {
  Icon,
  notification,
  Button,
  Input,
  message,
  Modal,
  Select,
  Radio,
  Checkbox,
  DatePicker,
} from 'antd';
import moment from 'moment';
import business from 'moment-business';

export const getDataMap = (text, dataMap) => {
  const val = dataMap[text];
  return val ? val : text;
};

export const formatSelectList = (data, labelKey = 'label', idKey = 'id') => {
  const res = data.map(v => ({
    ...v,
    label: v[labelKey],
    value: `${v[idKey]}`,
  }));
  console.log(' formatSelectList res ： ', res); //
  return res;
};

export const getWeek = (data, isGetWeek) => {
  // console.log(' getWeek   data,   ： ', data  )
  return data
    .map(v => {
      // const isWeek = business.isWeekDay(moment(`2020-10-${v}`))
      const isWeek = business.isWeekDay(moment(v));
      // console.log(' onChange   isWeek, ,   ： ', isWeek, datasss, v  )
      if (isGetWeek) {
        return isWeek ? v : null;
      } else {
        return !isWeek ? v : null;
      }
    })
    .filter(v => v);
};
const datasss = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
const resss = getWeek(datasss);

export const nowYear = new Date().getFullYear();
export const nowMonth = new Date().getMonth() + 1;
export const nowYearMonth = `${nowYear}-${nowMonth}`;
export const getCountDays = (month = nowMonth, year = nowYear) =>
  new Date(year, month, 0).getDate();
export const getMonthDays = (month, year) =>
  Array.from({ length: getCountDays(month, year) }, (_, index) => index + 1);
export const formatMonthDay = (data, month = nowMonth, year = nowYear) =>
  data.map(v => `${year}-${month}-${v}`);
export const getNowMonthDays = formatMonthDay(getMonthDays());
export const getMonthWeekDays = getWeek(getNowMonthDays, true);
export const getMonthWeekDaysSimple = getMonthWeekDays.map(
  v => v.split('-')[v.split('-').length - 1],
);

var day = getCountDays();
var months = getMonthDays();
var formatMonthDayformatMonthDay = formatMonthDay(months);
const resss2222 = getWeek(formatMonthDayformatMonthDay);
// console.log(
//   '  resss ：',
//   resss,
//   day,
//   months,
//   formatMonthDayformatMonthDay,
//   getNowMonthDays,
//   getMonthWeekDays,
//   getMonthWeekDaysSimple,
// ); //

// export {request, } from './request'

// import { INPUT_TXT,  } from 'constants'
// import {SUCC_TXT, } from 'constants'
const RadioGroup = Radio.Group;
const { Option, OptGroup } = Select;
const CheckboxGroup = Checkbox.Group;
const { RangePicker } = DatePicker;

// 注意 如果 select 的data数组里没有 value 属性会导致选中表单无值
export const renderSelectOp = (configs = [], opType = 'option') => {
  const OptionMap = {
    Option,
    OptGroup,
  }[opType];
  // console.log(' opType ： ', opType, configs,    )//
  // const options =
  // const groupOptions =
  return opType === 'group'
    ? configs.map(v => {
        // console.log(' groupOptions v ： ', v,  )//
        return (
          <OptGroup label={v.label} key={v.value}>
            {v.children.map(v => (
              <Option value={v.value} key={v.value} title={v.label} {...v}>
                {v.label}
              </Option>
            ))}
          </OptGroup>
        );
      })
    : configs.map(v => (
        <Option value={v.value} key={v.value} title={v.label}>
          {v.label}
        </Option>
      ));
};

export const renderRadioOp = (
  configs = [],
  { opType = 'option', isDisabledAll },
) => {
  // console.log(' configs, opType ： ', configs, opType,  )//
  // return opType === 'group' ? <RadioGroup options={configs} ></RadioGroup> : configs.map((v) => <Radio value={v.value} key={v.value} >{v.label}</Radio>)
  const radioItems = configs.map(v => (
    <Radio value={v.value} key={v.value} {...v}>
      {v.label}
    </Radio>
  ));
  return <RadioGroup>{radioItems}</RadioGroup>;
  return opType === 'group' ? (
    <RadioGroup>{radioItems}</RadioGroup>
  ) : (
    radioItems
  );
};

export const renderCheckboxOp = (
  configs = [],
  { opType = 'option', isDisabledAll },
) => {
  // console.log(' configs, opType ： ', configs, opType,  )//
  const CheckboxItems = configs.map(v => (
    <Checkbox key={v.value}>{v.label}</Checkbox>
  ));
  return <CheckboxGroup>{CheckboxItems}</CheckboxGroup>;
  return opType === 'group' ? (
    <CheckboxGroup>{CheckboxItems}</CheckboxGroup>
  ) : (
    CheckboxItems
  );
};

export const dateFormat = 'YYYY/MM/DD';
export const monthFormat = 'YYYY/MM';

export const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];

export const mockDate = moment('2020/02/02', dateFormat);
export const mockMonth = moment('2020/02/02', monthFormat);

export const mockFormData = (config, init) => {
  console.log(' mockFormData   formType, ,   ： ', config);
  const mockData = {
    d_id: Math.random(),
    ...init,
  };
  config.forEach((item, i) => {
    const { formType, itemProps } = item;
    const { label, key } = itemProps;
    if (formType !== 'rowText' && !React.isValidElement(item)) {
      const mockDataMap = {
        Input: label,
        TextArea: label,
        Select: [label],
        Search: [label],
        Password: label,
        Cascader: [label],
        AutoComplete: label,
        Checkbox: true,
        CheckboxGroup: label,

        Radio: 'no',
        DatePicker: mockDate,

        // Dynamic: ['值1'],
        // Dynamic: [{name: '值1', key: '值1', fieldKey: '值1', },   ],
        // Dynamic: ['值1', '值2',  ],
        // Dynamic: 'Dynamic初始值',

        // 注意 如果Dynamic初始字段键名与内部键名不一致会导致虽然有相应数据量输入框 但是无值
        // Dynamic: [{ first: 2222 }, { first: 333 }],
        // Dynamic: [{}, ],
        Dynamic: [
          { username: 'zyb1', password: '1231', phone: 2222 },
          { username: 'zyb2', password: '1232', phone: 333 },
        ],
        // DynamicItem: ['值1', '值2',  ],
        DynamicItem: [1, 2],
      }[formType];
      //
      // console.log(' mockDataMap ： ', formType, itemProps, item, mockDataMap, mockData,  )//

      mockData[key] = mockDataMap;
    }
  });

  return mockData;
};

export const w320 = 'w-320'; //
export const w240 = 'w-240'; //

export const formatConfig = (config, { isSearchForm, isDisabledAll } = {}) => {
  const configs = config.map((v, i) => {
    // console.log(' formatConfig ： ', v, v.itemProps, v.itemProps?.name, v.formType, v.rowText, v.formType === 'Dynamic', v.formType === 'rowText'  )//
    const items = {
      ...v,
      // itemProps: { ...v.itemProps, key: `key${i}`, name: `name${i}` },
      // itemProps: v.rowText || typeof type === 'function' ? { ...v.itemProps, key: `key${i}`,  } : { ...v.itemProps, key: `key${i}`, name: `name${i}` },
      itemProps:
        v.rowText ||
        v.formType === 'Dynamic' ||
        v.formType === 'DynamicItem' ||
        v.formType === 'rowText' ||
        v.formType === 'PropsCom'
          ? {
              ...v.itemProps,
              key: v.itemProps?.name ? v.itemProps.name : `field${i}`,
            }
          : // : { ...v.itemProps, key: `field${i}`,  },
            {
              ...v.itemProps,
              key: v.itemProps?.name ? v.itemProps.name : `field${i}`,
              name: v.itemProps?.name ? v.itemProps.name : `field${i}`,
            },
      // 直接生成 name
      // : { ...v.itemProps, key: `field${i}`, name: `field${i}` },
      // ? { ...v.itemProps, initialValue: `field${i}`, key: `field${i}` }
      // : { ...v.itemProps, initialValue: `field${i}`, key: `field${i}`, name: `field${i}` },
      comProps: {
        ...v.comProps,
        className: `${isSearchForm ? w240 : w320} ${v.comProps?.className} `,
      },
    };
    // console.log(' items ： ', items); //
    if (!React.isValidElement(v)) {
      items.formType = v.formType || 'Input';
    }

    if (!v.formType || v.formType === 'Input') {
      // items.itemProps.hasFeedback = true;
      // items.comProps.onPressEnter = (params) => console.log(' onPressEnter params ： ', params,  )// ;
    }
    if (isSearchForm || v.formType === 'Dynamic') {
      items.noRule = true;
    }
    return items;
  });

  if (isDisabledAll) {
    configs.forEach((v, i) => {
      // console.log(' configs v ： ', v, i);
      v.comProps.disabled = true;
    });
  }
  return configs;
};

export const downLoad = (url, { name } = { name: '默认文件名' }) => {
  let a = document.createElement('a');
  a.download = name; // 设置下载的文件名，默认是'下载'
  a.href = url;
  document.body.appendChild(a);
  a.click();
  a.remove(); // 下载之后把创建的元素删除
};

export const downLoadFile = (clickItem, { downEle = 'qrCode' }) => {
  const canvasImg = document.getElementById(downEle); // 获取canvas类型的二维码
  const img = new Image();
  img.src = canvasImg.toDataURL('image/png'); // 将canvas对象转换为图片的data url
  // const downLink = document.getElementById('down_link');
  // console.log(' img ： ', img, clickItem, canvasImg,  )//
  clickItem.href = img.src;
  clickItem.download = '二维码'; // 图片name
};

export const createArr = (length = 6) => {
  const res = Array.from(
    { length },
    (_, index) => {},
    // console.log(_, index)
  );
  // console.log('  res ：', res); //
  return res;
};

export const createObj = (length = 6) => {
  const res = Array.from({ length }, () => ({}));
  console.log('  res ：', res); //
  return res;
};

export const mockTbData = (params = {}) => {
  console.log(' paramsparams ： ', params); //
  const mockDataSource = new Array(20).fill(0);
  const { columns = mockDataSource } = params;
  // Array.from({ length: end }, (_, index) => index); // undefined 0
  // Array(length).map(() => init); Array.from({ length: 8 }, () => ({}));
  // Array.from({ length }, () => ({}));
  // Array(length).fill({}); Array(8).fill(0)
  return mockDataSource.map((v, i) => {
    const start = 10;
    const childrenObj = {};
    const obj = {};
    columns.forEach((v, index) => {
      // console.log(' vsssss ： ', v, i, index, )//
      // obj[`field${index}`] = `FieldFieldFieldFieldFieldField`;
      // obj[v.dataIndex] = `${v.dataIndex}-${i}`;
      obj[v.dataIndex] = `Field-${i}`;
      obj[`field${index}`] = `Field${i}`;
      childrenObj[`field${start * index}`] = `Field_${i}`;
    });
    // console.log(' objobj ： ', obj,  )//
    const item = {
      id: i,
      d_id: i,
      ...obj,
      key: i,
      // [`field${i}`]: `Field${i}`,
    };
    const childrenItem = {
      id: start * (i + 1),
      d_id: start * (i + 1),
      ...childrenObj,
      key: i,
      // [`field${i}`]: `Field${i}`,
    };
    if (params && params.haveChildren) {
      item.children = [childrenItem];
    }

    return item;
  });
};

const NUM_LEN = 9;
// const NUM_LEN = 5
const WORD_LEN = 10;
const LETTER_LEN = 20;
// const LETTER_LEN = 8

const lengthMap = {
  num: NUM_LEN,
  word: WORD_LEN,
  letter: LETTER_LEN,
};

// 处理表格文本的长度 根据文本的类型返回对应的限定的长度值
export const getLengthLimit = text => {
  let textLength = text.length;
  if (!isNaN(text)) {
    // console.log(' 数字 ： ',    )//
    // textLength = lengthMap.num
    return lengthMap.num;
  } else if (/^[a-zA-Z\s]+$/.test(text)) {
    // console.log(' 字母 ： ',    )//
    // textLength = lengthMap.letter
    return lengthMap.letter;
  } else if (/^[\u4e00-\u9fa5]+$/.test(text)) {
    // console.log(' 文字 ： ',    )//
    // textLength = lengthMap.word
    return lengthMap.word;
  }
  // console.log(' 默认长度 ： ', isNaN(text), text, textLength,  )//
  return textLength;
};

// 得到最终的格式化后的文本
export const foramtText = text => {
  // if (text == undefined) {
  if (!text) {
    return text;
  }
  const textStr = `${text}`;
  let lengthLimit = getLengthLimit(textStr);
  const txt =
    textStr.length > lengthLimit
      ? `${textStr}`.slice(0, lengthLimit) + '...'
      : textStr;
  // console.log(' lengthLimit, textStr, textStr.length ： ', txt, lengthLimit, textStr.length, textStr,   )//
  return txt;
};

export const linkUrlFn = (params = [], path = '') => (text, record, index) => {
  let linkUrl = path;
  // let res = params.forEach((key) => linkUrl += `${key}=${record[key] != undefined ? record[key] : ''}&`)
  let paramsStr = params
    .map(key => `${key}=${record[key] != undefined ? record[key] : ''}`)
    .join('&');
  linkUrl += paramsStr;
  // console.log(' linkUrl ： ', linkUrl, paramsStr); //
  return linkUrl;
};

export const INPUT_TXT = 'Please Input ';
export const SUCC_TXT = 'Action Successful o(*￣︶￣*)o ！';

export const succModal = (content = '', title = SUCC_TXT) =>
  Modal.success({ title, content, maskClosable: true, width: '40%' });

export const confirms = (type = 1, msg, time = 3, cb) => {
  // console.log('confirms ：', type, time, cb, )
  const msgMap = {
    0: 'error',
    1: 'success',
    2: 'warn',
  }[type];

  message.config({
    duration: 3,
    duration: 30000,
  });
  message[msgMap](msg, time, cb);
};

export const tips = (msg, type = 1, time = 3, cb) => {
  console.log('confirms ：', type, time, cb);
  const msgMap = {
    0: 'error',
    1: 'success',
    2: 'warn',
  }[type];
  message[msgMap](msg, time, cb);
};

// export const isNoTips = res => JSON.parse(res.config.data).noTips
// export const tipsConfirm = res => {
//     const {code, mes, } = res.data
//     const codeExist = code !== 1 && code != undefined
//     if (codeExist || (codeExist && isNoTips(res))) {
//         console.log('confirmsconfirmsconfirms ：', res.data, code !== 1, code != undefined, !isNoTips(res), (code !== 1 && code != undefined), (code !== 1 && isNoTips(res)) )
//         confirms(code, mes,  )
//     }
// }
export const isNoTips = res => {
  // console.log(' codeExistcodeExist ： ', res.config, res.config.datas,  )
  return res.config.datas.noTips;
};
export const tipsConfirm = res => {
  const { code, msg } = res.data;
  const codeExist = code !== 1 && code != undefined;
  console.log(
    ' %c tipsConfirm 返回提示 ： ',
    `color: #333; font-weight: bold`,
    code === 1,
    !!isNoTips(res),
    isNoTips(res),
    res.config.datas,
    code,
    res,
    res.config.url,
  );
  // if (!(!code !== 1 && !!isNoTips(res))) {
  //   //
  //   // console.log(' codeExist confirmsconfirmsconfirms ：', res.datas, code !== 1, code != undefined, !isNoTips(res), (code !== 1 && code != undefined), (code !== 1 && isNoTips(res)) )
  //   confirms(code, msg);
  // }
};
export const wrapParams = p => ({
  ...p,
  // other: 'xxx',
});

export const backupFn = o => JSON.parse(JSON.stringify(o));

export const setItem = (k, v, isString) =>
  localStorage.setItem(k, isString ? v : JSON.stringify(v));
export const getItem = k => JSON.parse(localStorage.getItem(k));
export const removeItem = k => localStorage.removeItem(k);
export const setItems = (k, v) => sessionStorage.setItem(k, JSON.stringify(v));
export const getItems = k => JSON.parse(sessionStorage.getItem(k));
export const removeItems = k => sessionStorage.removeItem(k);

let t;
export const debounce = (cb, ...v) => {
  console.log(' debounce cb, v ： ', cb, v); //
  if (t) clearTimeout(t);
  t = setTimeout(() => cb(...v), 300);
};
export const getAll = p => Promise.all(p).then(res => Promise.all(res));
export const OPTIONS = p => ({ headers: { Authorization: p } });

export const randomNumber = (n1, n2) => {
  if (arguments.length === 2) {
    return Math.round(n1 + Math.random() * (n2 - n1));
  } else if (arguments.length === 1) {
    return Math.round(Math.random() * n1);
  } else {
    return Math.round(Math.random() * 255);
  }
};
export const rc = () =>
  '#' +
  Math.random()
    .toString(16)
    .substring(2)
    .substr(0, 6);
export const disabledDate = c => c && c.valueOf() < Date.now();
export const ts = t => Date.parse(new Date(t));
export const color = (n = 10) => {
  // console.log('n ：', n);
  const color = [];
  for (let i = 0; i < n; i++) {
    color.push(rc());
  }
  return color;
};
export const animate = n => `animated ${n}`;
export const createProperty = (arr, f) => {
  const origin = {};
  arr.forEach((v, i) => (origin[v] = f(v)));
  return origin;
};

export const getToken = (k = 'token', prefix = 'AFAJWT ') => {
  const token =
    localStorage.getItem(k) != undefined ? localStorage.getItem(k) : 'no_token';
  // console.log(' prefix, k ： ', prefix, k, token); //
  return prefix + token;
};
// export const getToken = (k = 'user_info') =>
//   getItem(k) != undefined ? getItem(k).token : '';

export const wipe = (s, t = 'px') => s.substring(0, s.lastIndexOf(t));
export const dateForm = (d, j = '-', s = '-') =>
  d
    .split('T')[0]
    .split(s)
    .join(j);
export const dateSplit = (d, s = '-') => d.split('T')[0].split(s);
export const newDate = a => new Date(a[0], a[1] - 1, a[2]);
export const daysLen = (s, e) => (e - s) / 86400000 + 1;
export const dateArrToLon = (d, i) => new Date(d + i * 86400000);
export const toLocale = d => d.toLocaleDateString();
// 2018-03-10T00:00:00.000Z => 2018/3/10
export const stampToLocale = d => toLocale(new Date(d));
export const createRow = l => {
  const arr = [];
  for (let i = 0; i < l; i++) {
    arr.push(i);
  }
  return arr;
};

// 去重
export const filterArr = keys =>
  keys.filter((v, i, arr) => arr.indexOf(v) === i);

export const filterArrOForm = (arr, k, e = 'data') =>
  arr
    .filter((v, i, arr) => arr.indexOf(v) === i)
    .map(v => (v = { [k]: v, [e]: [] }));

export const mergeArr = (o, a, k, e = 'data') => {
  // console.log('a, k ：', o, a, k, e);
  const arr = [];
  a.map(v => {
    o.forEach(item => {
      if (item[k] === v[k]) {
        v[e].push(item);
      }
    });
    // console.log('  item ：', v[k], v[e])
    return v;
  });
  return a;
};

export const addProp = (arr, con, k, p) =>
  arr.map(v => ({ ...v, [p]: con.filter(item => item[k] === v[k])[0][p] }));

export const findDOMNode = (d, c) => d.findDOMNode(c);

// redux

const extension = window.devToolsExtension;
// console.log(' extension ： ', extension, extension ? '111' : 222); //
export const tools = extension ? extension() : undefined;

export const showTotal = total => `總共 ${total} 條`;

export const pagination = total => ({
  pageSize: SIZE,
  total,
  showSizeChanger: true,
  showTotal,
});
