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
import { SmileOutlined } from '@ant-design/icons';
import moment from 'moment';
import business from 'moment-business';
// import { PRIMARY } from '@/constants';

const PRIMARY = '#00B460';

export const openNotification = (
  params = {
    key: 'notificationKey',
  },
) => {
  notification.open({
    key: params.key,
    icon: <SmileOutlined style={{ color: PRIMARY }} />,
    ...params,
  });
};

export const arrMapObj = (
  arr = [],
  { key = 'value', label = 'label' } = {},
) => {
  // export const arrMapObj = (arr = []) => {
  const obj = {};
  arr.forEach(v => (obj[v[key]] = v[label]));
  return obj;
};

export const arrMapColor = arr =>
  arrMapObj(arr, { key: 'value', label: 'color' });

export const filterObjSame = (data, key = 'id') => {
  const temp = [];
  // const deWeightTwo = () => {
  //   console.log(' deWeightTwo   ,   ： ',   )
  data.forEach(a => {
    let check = temp.every(b => a[key] != b[key]);
    // console.log(' temp 222 ： ', data, temp, check, key,  )//
    check ? temp.push(a) : '';
  });
  // return data;
  // console.log(' temp ： ', data, temp,  )//
  return temp.filter(v => v.value != undefined);
  // }
};

// var arr4 = [
//   { name: 'a', id: 1 },
//   { name: 'a', id: 2 },
//   { name: 'b', id: 3 },
//   { name: 'c', id: 4 },
//   { name: 'c', id: 6 },
//   { name: 'b', id: 6 },
//   { name: 'd', id: 7 },
// ];
// var obj = {};
// var temp = [];
// function deWeightTwo() {
//   arr4.forEach(function(a) {
//     var check = temp.every(function(b) {
//       return a.name !== b.name;
//     });
//     check ? temp.push(a) : '';
//   });
//   return temp;
// }
// var newArr2 = deWeightTwo();
// var newArr4 = deWeightTwo();
// // console.log('xxxxx', arr4, newArr4);

export const getDataMap = (text, dataMap) => {
  const val = dataMap[text];
  return val ? val : text;
};

export const objNum2str = (data = {}, config = []) => {
  const newObj = {
    ...data,
  };
  const res = config.forEach(key => {
    if (newObj[key]) {
      newObj[key] = `${newObj[key]}`;
    }
  });
  return newObj;
};

export const formatSelectList = (
  data = [],
  labelKey = 'name',
  idKey = 'id',
) => {
  const res = data.map(v => ({
    ...v,
    label: v[labelKey],
    value: `${v[idKey]}`,
    // value: v[idKey],
    // title: v[labelKey] + '2222222222',
  }));
  // console.log(' formatSelectList res ： ', res);
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
export const nowMonthPad = `${new Date().getMonth() + 1}`.padStart(2, '0');
export const nowDay = new Date().getDate();
export const nowYearMonth = `${nowYear}-${nowMonth}`;
export const nowYearMonthDay = `${nowYear}-${nowMonth}-${nowDay}`;
export const getCountDays = (month = nowMonth, year = nowYear) =>
  new Date(year, month, 0).getDate();
// export const getMonthDays = ({month, year, isPad}) =>
//   Array.from({ length: getCountDays(month, year) }, (_, index) => isPad ? `${index + 1}`.padStart(2, '0') : `${index + 1}`);
export const getMonthDays = (month, year) =>
  Array.from({ length: getCountDays(month, year) }, (_, index) =>
    `${index + 1}`.padStart(2, '0'),
  );
export const formatMonthDay = (data, month = nowMonth, year = nowYear) =>
  data.map(v => `${year}-${month}-${v}`);
export const getNowMonthDays = formatMonthDay(getMonthDays());
export const getNowMonthDaysPad = () => formatMonthDay(months, nowMonthPad);
export const getMonthWeekDays = getWeek(getNowMonthDays, true);
export const getMonthWeekDaysSimple = getMonthWeekDays.map(
  v => v.split('-')[v.split('-').length - 1],
);

var day = getCountDays();
var months = getMonthDays();
var formatMonthDayformatMonthDay = formatMonthDay(months);
const resss2222 = getWeek(formatMonthDayformatMonthDay);
const RadioGroup = Radio.Group;
const { Option, OptGroup } = Select;
const CheckboxGroup = Checkbox.Group;
const { RangePicker } = DatePicker;
// console.log(' day() ： ', day, months, nowMonth, getMonthDays({isPad: true,  }), formatMonthDayformatMonthDay, getMonthWeekDays, getNowMonthDaysPad())//

// 注意 如果 select 的data数组里没有 value 属性会导致选中表单无值
export const renderSelectOp = (config = [], opType = 'option') => {
  // const configs = filterObjSame(config, 'value')
  const configs = filterObjSame(config, 'value').map(v => ({
    ...v,
    value: v.value && typeof v.value === 'number' ? `${v.value}` : v.value,
  }));
  // const configs = config
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
          <OptGroup label={v.label} key={v.key || v.value}>
            {v.children.map(v => (
              <Option value={v.value} key={v.value} title={v.label} {...v}>
                {v.label}
              </Option>
            ))}
          </OptGroup>
        );
      })
    : configs.map(v => (
        <Option value={v.value} key={v.key || v.value} title={v.label} {...v}>
          {v.label}
        </Option>
      ));
};

export const renderRadioOp = (
  configs = [],
  { opType = 'option', isDisabledAll, comProps = {} },
) => {
  // console.log(' configs, opType ： ', configs, opType,  )//
  // return opType === 'group' ? <RadioGroup options={configs} ></RadioGroup> : configs.map((v) => <Radio value={v.value} key={v.value} >{v.label}</Radio>)
  const radioItems = configs.map(v => (
    <Radio value={v.value} key={v.value} {...v}>
      {v.label}
    </Radio>
  ));
  return (
    <RadioGroup disabled={isDisabledAll} {...comProps}>
      {radioItems}
    </RadioGroup>
  );
  return opType === 'group' ? (
    <RadioGroup>{radioItems}</RadioGroup>
  ) : (
    radioItems
  );
};

export const renderCheckboxOp = (
  configs = [],
  { opType = 'group', isDisabledAll, comProps = {} },
) => {
  // console.log(' configs, opType ： ', configs, opType,  )//
  const CheckboxItems = Array.isArray(configs)
    ? configs.map(v =>
        v.CustomCom ? (
          v.CustomCom
        ) : (
          <Checkbox key={v.value} value={v.value} disabled={isDisabledAll}>
            {v.label}
          </Checkbox>
        ),
      )
    : [];
  // return <CheckboxGroup>{CheckboxItems}</CheckboxGroup>;
  return opType === 'group' ? (
    <CheckboxGroup className={`checkboxWrapper`}>
      {Array.isArray(configs)
        ? configs.map(v =>
            v.CustomCom ? (
              v.CustomCom
            ) : (
              <Checkbox
                key={v.value}
                value={v.value}
                disabled={isDisabledAll}
                {...comProps}
              >
                {v.label}
              </Checkbox>
            ),
          )
        : []}
    </CheckboxGroup>
  ) : (
    <Checkbox key={configs.value} value={configs.value}>
      {configs.label}
    </Checkbox>
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
        CheckboxItem: true,
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
        DynamicFormTable: [
          { username: 'zyb1', password: '1231', phone: 2222 },
          { username: 'zyb2', password: '1232', phone: 333 },
        ],
      }[formType];
      //
      // console.log(' mockDataMap ： ', formType, itemProps, item, mockDataMap, mockData,  )//

      mockData[key] = mockDataMap;
    }
  });

  return mockData;
};

export const w320 = 'w-320';
export const w240 = 'w-240';

export const formatConfig = (
  config,
  { isSearchForm, isDisabledAll, action } = {},
) => {
  const configs = config.map((v, i) => {
    // console.log(' formatConfig ：v.itemProps?.name  ', v, v.itemProps, v.formType, v.rowText, v.formType === 'Dynamic', v.formType === 'rowText'  )//
    const isPlainText = v.formType === 'plainText';
    const noWidth = ['Switch', 'Checkbox'].includes(v.formType);
    const items = {
      ...v,
      // itemProps: { ...v.itemProps, key: `key${i}`, name: `name${i}` },
      // itemProps: v.rowText || typeof type === 'function' ? { ...v.itemProps, key: `key${i}`,  } : { ...v.itemProps, key: `key${i}`, name: `name${i}` },
      itemProps:
        v.rowText ||
        v.formType === 'Dynamic' ||
        v.formType === 'DynamicItem' ||
        v.formType === 'DynamicFormTable' ||
        v.formType === 'Label' ||
        v.formType === 'rowText' ||
        v.formType === 'plainText' ||
        v.formType === 'CustomCom' ||
        v.formType === 'PropsCom'
          ? {
              ...v.itemProps,
              key: v.key
                ? v.key
                : v.itemProps?.name
                ? v.itemProps.name
                : `field${i}`,
            }
          : // : { ...v.itemProps, key: `field${i}`,  },
            {
              ...v.itemProps,
              key: v.key
                ? v.key
                : v.itemProps?.name
                ? v.itemProps.name
                : `field${i}`,
              name: v.itemProps?.name ? v.itemProps.name : `field${i}`,
            },
      // 直接生成 name
      // : { ...v.itemProps, key: `field${i}`, name: `field${i}` },
      // ? { ...v.itemProps, initialValue: `field${i}`, key: `field${i}` }
      // : { ...v.itemProps, initialValue: `field${i}`, key: `field${i}`, name: `field${i}` },
      comProps: {
        ...v.comProps,
        className: `${!noWidth ? (isSearchForm ? w240 : w320) : ''} ${
          v.comProps?.className
        } ${isPlainText ? 'plainText' : ''}`,
      },
    };
    // console.log(' items ： ', items);
    if (!React.isValidElement(v)) {
      items.formType = v.formType || 'Input';
    }

    if (!v.formType || v.formType === 'Input') {
      // items.itemProps.hasFeedback = true;
      // items.comProps.onPressEnter = (params) => console.log(' onPressEnter params ： ', params,  )// ;
    }
    if (isSearchForm || v.formType === 'Dynamic') {
      items.noRule = v.noRule ?? true;
    }
    if (action === 'detail') {
      if (['DatePicker', 'MonthPicker', 'RangePicker'].includes(v.formType)) {
        // items.formType = 'Input';
      }
    }

    return items;
  });

  if (isDisabledAll || action === 'detail') {
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

// 把base64 转 file文件
export const dataURLtoFile = (dataurl, filename) => {
  console.log(' dataURLtoFile ： ', filename); //
  var arr = dataurl.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  console.log(' u8arr ： ', u8arr); //
  return new File([u8arr], filename, { type: mime });
};

export const createIndexArr = (length = 6) =>
  Array.from({ length }, (_, index) => index);

export const createArr = (length = 6) => {
  const res = Array.from(
    { length },
    (_, index) => {},
    // console.log(_, index)
  );
  // console.log('  res ：', res);
  return res;
};

export const createObj = (length = 6) => {
  const res = Array.from({ length }, () => ({}));
  console.log('  res ：', res);
  return res;
};

export const mockTbData = (params = {}) => {
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

// const NUM_LEN = 9;
const NUM_LEN = 20;
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
  } else {
    // console.log(' 文字 ： ',    )//
    // textLength = lengthMap.word
    // return 15;
    return 20;
  }
  console.log(' 默认长度 ： ', isNaN(text), text, textLength);
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
  // console.log(' linkUrl ： ', linkUrl, paramsStr);
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
  // message[msgMap](msg ?? '操作成功', time, cb);
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

export const copyData = o => JSON.parse(JSON.stringify(o));

export const setItem = (k, v, isString) =>
  v && localStorage.setItem(k, isString ? v : JSON.stringify(v));
export const getItem = k => JSON.parse(localStorage.getItem(k));
export const removeItem = k => localStorage.removeItem(k);
export const setItems = (k, v) => sessionStorage.setItem(k, JSON.stringify(v));
export const getItems = k => JSON.parse(sessionStorage.getItem(k));
export const removeItems = k => sessionStorage.removeItem(k);

let t;
export const debounce = (cb, ...v) => {
  console.log(' debounce cb, v ： ', cb, v);
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

export const TOKEN_PREFIX = 'AFAJWT '; //

export const getToken = (k = 'token', prefix = TOKEN_PREFIX) => {
  const token =
    localStorage.getItem(k) != undefined ? localStorage.getItem(k) : 'no_token';
  // console.log(' prefix, k ： ', prefix, k, token);
  return prefix + token;
};

export const getPlatformToken = () => getToken('guest_token') ?? getToken();

export const getUserInfo = (k = 'userInfo') => getItem(k);

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

export const filterObjArr = (arr, key) => {
  let newArr = [];
  let obj = {};
  for (let i = 0; i < arr.length; i++) {
    if (!obj[arr[i][key]]) {
      newArr.push(arr[i]);
      obj[arr[i][key]] = true;
    }
  }
  return newArr;
};

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
// console.log(' extension ： ', extension, extension ? '111' : 222);
export const tools = extension ? extension() : undefined;

export const showTotal = total => `总共 ${total} 条`;

export const pagination = total => ({
  pageSize: SIZE,
  total,
  showSizeChanger: true,
  showTotal,
});

// 格式化部分提交数据 处理为 null
export const format2Null = (data = {}, keys = []) => {
  const formatObj = {
    ...data,
  };
  keys.forEach(k => (formatObj[k] = !data[k] && data[k] != 0 ? null : data[k]));
  return formatObj;
};

export const format2Str = (data = {}, keys = []) => {
  const formatObj = {
    ...data,
  };
  keys.forEach(
    k => (formatObj[k] = data[k] != undefined ? `${data[k]}` : null),
  );
  return formatObj;
};

export const num2Str = (data = {}, keys = []) => {
  const formatObj = {
    ...data,
  };
  keys.forEach(k => (formatObj[k] = isNaN(data[k]) ? data[k] : `${data[k]}`));
  return formatObj;
};

export const openTab = url => window.open(url);

export const recursiveKeys = (data = [], allKeys = []) => {
  data.forEach((v, i) => {
    allKeys.push(v.key);
    if (v.children) {
      recursiveKeys(v.children, allKeys);
    }
  });
};

export const formatDuring = second => {
  const days = parseInt(second / (60 * 60 * 24));
  const hours = parseInt((second % (60 * 60 * 24)) / (60 * 60));
  const minutes = parseInt((second % (60 * 60)) / 60);
  const seconds = (second % 60) / 1000;
  return days + ' 天 ' + hours + ' 小时 ' + minutes + ' 分钟';
};

export const toFixed = (num = '', decimal = 2) => {
  num = num.toString();
  let index = num.indexOf('.');
  if (index !== -1) {
    num = num.substring(0, decimal + index + 1);
  } else {
    num = num.substring(0);
  }
  return parseFloat(num).toFixed(decimal);
};
