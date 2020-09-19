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
import moment from 'moment'

// export {request, } from './request'


// import { INPUT_TXT,  } from 'constants'
// import {SUCC_TXT, } from 'constants'
const RadioGroup = Radio.Group;
const { Option, OptGroup } = Select
const CheckboxGroup = Checkbox.Group;
const { RangePicker } = DatePicker;




export const renderSelectOp = (configs, opType = 'option') => {
  const OptionMap = {
    Option,
    OptGroup,
  }[opType]
  // console.log(' opType ： ', opType, configs,    )//
  // const options = 
  // const groupOptions = 
  return opType === 'group' ? configs.map((v) => {
      // console.log(' groupOptions v ： ', v,  )// 
      return <OptGroup label={v.label} key={v.value} >
      {v.children.map((v) => <Option value={v.value} key={v.value} >{v.label}</Option>)}
    </OptGroup> 
  }) : configs.map((v) => <Option value={v.value} key={v.value} >{v.label}</Option>) 
}

export const renderRadioOp = (configs, opType = 'option') => {
  // console.log(' configs, opType ： ', configs, opType,  )// 
  return opType === 'group' ? <RadioGroup options={configs} ></RadioGroup> : configs.map((v) => <Radio value={v.value} key={v.value} >{v.label}</Radio>) 
}





export const dateFormat = 'YYYY/MM/DD';
export const monthFormat = 'YYYY/MM';

export const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];

export const mockDate = moment('2020/02/02', dateFormat)
export const mockMonth = moment('2020/02/02', monthFormat)


export const mockFormData = (config, init, ) => {
  // console.log(' mockFormData   formType, ,   ： ', config,   )
  const mockData = {
    d_id: Math.random(),
    ...init,
  }
  config.forEach((item, i) => {
    const {formType, itemProps,   } = item
    const {label, key,   } = itemProps
    if (formType !== 'rowText' && !React.isValidElement(item)) {
      const mockDataMap = {
        Input: label,
        TextArea: label,
        Select: [label,  ],
        Password: label,
        Cascader: [label,  ],
        AutoComplete: label,
        Checkbox: label,
        CheckboxGroup: label,
        
        Radio: label,
        DatePicker: mockDate,
    
        Dynamic: ['值1',   ],
        // Dynamic: [{name: '值1', key: '值1', fieldKey: '值1', },   ],
        // Dynamic: ['值1', '值2',  ],
        // Dynamic: 'Dynamic初始值', 
        
      }[formType]
  // 
      // console.log(' mockDataMap ： ', formType, itemProps, item, mockDataMap, mockData,  )// 
      
      mockData[key] = mockDataMap
    }
    
  })

  return mockData 
}


export const formatConfig = config => config.map((v, i) => {
  console.log(' formatConfig ： ', v, v.itemProps, v.itemProps?.name, v.formType, v.rowText, v.formType === 'Dynamic', v.formType === 'rowText'  )// 
  const items = {
    ...v,
    // itemProps: { ...v.itemProps, key: `key${i}`, name: `name${i}` },
    // itemProps: v.rowText || typeof type === 'function' ? { ...v.itemProps, key: `key${i}`,  } : { ...v.itemProps, key: `key${i}`, name: `name${i}` },
    itemProps: (v.rowText || v.formType === 'Dynamic' || v.formType === 'rowText' ) 
        ? { ...v.itemProps, key: `field${i}`,  }
        // : { ...v.itemProps, key: `field${i}`,  },
        : { ...v.itemProps, key: v.itemProps?.name ? v.itemProps.name : `field${i}`, name: v.itemProps?.name ? v.itemProps.name : `field${i}` },
        // ? { ...v.itemProps, initialValue: `field${i}`, key: `field${i}` }
        // : { ...v.itemProps, initialValue: `field${i}`, key: `field${i}`, name: `field${i}` },
  } 
  // console.log(' items ： ', items,  )// 
  if (!React.isValidElement(v)) {
    items.formType = v.formType || 'Input'
  }
  return items
});


  


export const mockTbData = (children, ) => {

  return new Array(20).fill(0).map((v, i) => {
    const start = 10
    const childrenObj = {};
    const obj = {};
    new Array(20).fill(0).forEach((v, index) => {
      // console.log(' vsssss ： ', v, i, index, )// 
      // obj[`field${index}`] = `FieldFieldFieldFieldFieldField`;
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
    }
    const childrenItem = {
      id: start * (i + 1),
      d_id: start * (i + 1),
      ...childrenObj,
      key: i,
      // [`field${i}`]: `Field${i}`,
    }
    if (children) {
      item.children = [
        childrenItem,
      ]
    }
    
    return item
  })
}


  










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
  }[type]
  
  message.config({
    duration: 3,
  });
  message[msgMap](msg, time, cb);
};

export const tips = (msg, type = 1, time = 3, cb) => {
  // console.log('confirms ：', type, time, cb, )
  const msgMap = {
    0: 'error',
    1: 'success',
    2: 'warn',
  }[type]
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
export const wrapParams = p => ({ ...p });

export const backupFn = o => JSON.parse(JSON.stringify(o));
let t;

export const setItem = (k, v) => localStorage.setItem(k, JSON.stringify(v));
export const getItem = k => JSON.parse(localStorage.getItem(k));
export const removeItem = k => localStorage.removeItem(k);
export const setItems = (k, v) => sessionStorage.setItem(k, JSON.stringify(v));
export const getItems = k => JSON.parse(sessionStorage.getItem(k));
export const removeItems = k => sessionStorage.removeItem(k);


export const debounce = (cb, v) => {
  if (t) clearTimeout(t);
  t = setTimeout(() => cb(v), 300);
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

export const getToken = (k = 'user_info') =>
  getItem(k) != undefined ? getItem(k).token : '';

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





