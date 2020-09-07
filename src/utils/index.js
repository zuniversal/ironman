import React from 'react';
import ReactDOM from 'react-dom';
import {
  Icon,
  notification,
  Button,
  Input,
  message,
  Modal,
  Radio,
  Checkbox,
  DatePicker,
} from 'antd';
import axios from 'axios';
// import { INPUT_TXT,  } from 'constants'
// import {SUCC_TXT, } from 'constants'
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;
const { RangePicker } = DatePicker;

export const INPUT_TXT = 'Please Input ';
export const SUCC_TXT = 'Action Successful o(*￣︶￣*)o ！';

export const succModal = (content = '', title = SUCC_TXT) =>
  Modal.success({ title, content, maskClosable: true, width: '40%' });

// export const openNotification = (msg, icon) => {
//     const type = icon != undefined ? "frown-o" : "smile-o"
//     notification.open({
//       message: msg,
//       icon: <Icon type={type} style={{ color: '#108ee9' }} />,
//     });
// };

export const confirms = (c = 1, m, t = 3, cb) => {
  // console.log('confirms ：', c, t, cb, )
  let type = 'success';
  if (c === 0) {
    type = 'error';
  } else if (c === 2) {
    type = 'warn';
  }
  message.config({
    duration: 6,
  });
  message[type](m, t, cb);
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
  const { code, message } = res.data;
  const codeExist = code !== 1 && code != undefined;
  console.log(
    ' %c codeExist 组件 this.statethis.propss ： ',
    `color: #333; font-weight: bold`,
    code === 1,
    !!isNoTips(res),
    isNoTips(res),
    res.config.datas,
    code,
    res,
    res.config.url,
  );
  if (!(!code !== 1 && !!isNoTips(res))) {
    //
    // console.log(' codeExist confirmsconfirmsconfirms ：', res.datas, code !== 1, code != undefined, !isNoTips(res), (code !== 1 && code != undefined), (code !== 1 && isNoTips(res)) )
    confirms(code, message);
  }
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
// export const render = (Container, Component) => ReactDOM.render(<Container>{Component}</Container>,document.getElementById('root'))
export const render = (Container, Component) =>
  ReactDOM.render(Component, document.getElementById('root'));

export const logins = (nextState, replace, cb) => {
  // 到#/后并且是某路
  const { token, employeeID } = nextState.location.query;
  const isJump = token != undefined;
  console.log('isJump ：', nextState.location.query, isJump);
  if (isJump) {
    console.log('跳转请求 ：');
    setItems('token', token);
    // axios.create({
    //     headers: token
    // });
    // axios.defaults.headers.common['Authorization'] = token

    // axios.post('getUser', {option: 'personal', employeeID}).then(res => {
    //     console.log('跳转请求resss ：', res.data)
    //     const {code, user} = res.data
    //     if (code === 1) {
    //         const {token} = user
    //     }
    // }).catch(err => {
    //     console.log('跳转请求ressserrsssssssssssss ：', err)
    //     // replace('/login');
    // })
  } else {
    console.log('密码登录 ：');
    // const token = nextState.location.query.token != undefined || (getItems('token') != undefined ? getItems('token') : '')
    const token = getItems('token');
    // const token = (getItems('token') != undefined ? getItems('token') : '')
    console.log(
      '@@@@token ：',
      token,
      token == undefined,
      !token,
      isJump,
      this.props,
      this,
      nextState.location.query,
    );
    if (token == undefined) {
      replace('/login');
    }
  }
  cb();
};

export const ajax = (cb, v) => {
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

// export const dataFilter = (t, data = [], searchText, k, ) => {
//     // console.log('dataFilter ：', t.state, data, 'k ：',  k, 'searchText ：', searchText, );
//     if (data.length && k != '') {
//         const reg = new RegExp(searchText, 'gi');

//         const {searchKey,  } = t.state

//         return data.map((record) => {
//             // console.log('record ：', record);
//             if (searchKey === 'status') {
//                 if (searchText === 'all') {
//                     return record
//                 } else if (searchText === 'active' && record.status) {
//                     return record
//                 } else if (searchText === 'terminated' && !record.status) {
//                     return record
//                 } else {
//                     return null
//                 }
//             }
//             if (record[k] != undefined) {
//                 const match = `${record[k]}`.match(reg);
//                 if (!match) {
//                     return null;
//                 }
//                 return {
//                     ...record, [k]: record[k],
//                 };
//             } else {
//                 return {
//                     ...record,
//                 };
//             }
//         }).filter(record => !!record)
//     } else {
//         return data
//     }
// }

// export const customFilter = (t, k) => {
// //   console.log('t11 ：', t, t.onInputChange);
//   return {
//     filterDropdown: (
//       <div className="custom-filter-dropdown">
//         <Input
//           ref={ele => t.searchInput = ele}
//           placeholder={`${INPUT_TXT}The Search Text`}
//           value={t.state.searchText}
//           onChange={t.onInputChange.bind(t, k)}
//         />
//         <Button type="primary" onClick={t.blur.bind(this, k)} className='m-r10'>Close</Button>
//         <Button type="primary" onClick={t.reset.bind(this, k)}>Reset</Button>
//       </div>
//     ),
//     filterIcon: <Icon type="filter" style={{ color: t.state.filtered ? '#fff' : '#fff' }} />,
//     filterDropdownVisible: t.state[`${k}Visible`],
//     onFilterDropdownVisibleChange: (visible) => {
//         console.log('visible1111111111 ：', visible, t, t.state)
//         // if (!t.state.isHandleTableChange) {
//             t.setState({[
//                 `${k}Visible`]: visible,
//                     // searchText: '', searchKey: '',
//                 }, () => t.searchInput.focus());
//         // }
//     },
//   }
// }

export const customRequestFilter = (t, k, config = {}) => {
  //   console.log('customRequestFilter ：',config,  );
  return {
    filterDropdown: (
      <div className="customRequestFilter">
        {config.type === 'radio' && (
          <RadioGroup
            className="m-b10"
            onChange={e => t.radioFilter(e, k)}
            value={t.state.params[k]}
          >
            {config.radioConfig &&
              config.radioConfig.map(v => (
                <Radio value={v.value} key={v.value}>
                  {v.text}
                </Radio>
              ))}
          </RadioGroup>
        )}
        {config.type === 'checkbox' && (
          <CheckboxGroup
            value={t.state.params[k]}
            onChange={e => t.onCheckboxChange(e, k)}
          >
            {/* <Row>
                            <Col span={8}><Checkbox value="A">A</Checkbox></Col>
                        <Row> */}
            {config.checkConfig &&
              config.checkConfig.map(v => (
                <div key={v.value}>
                  <Checkbox value={v.value}>{v.text}</Checkbox>
                </div>
              ))}
          </CheckboxGroup>
        )}
        {config.type === 'dateRange' && (
          <RangePicker
            showTime={{ format: 'HH:mm' }}
            format="YYYY-MM-DD"
            placeholder={['startDate', 'endDate']}
            onChange={e => t.onDateRangeChangeaae(e, k)}
            onOk={t.filter}
          />
        )}
        {!config.type && (
          <Input
            ref={ele => (t.searchInput = ele)}
            placeholder={`${INPUT_TXT}${'Text'}`}
            value={t.state.params[k]}
            onChange={t.onInputChange.bind(t, k)}
          />
        )}
        {t.state.showFilter ? (
          <Button
            type="primary"
            onClick={t.search.bind(this, k)}
            className="m-r10"
          >
            {'filter'}
          </Button>
        ) : null}
        <div className=" m-t10">
          {/* <Button type="primary" onClick={t.filter.bind(this, k)} className='m-r10'>{'filter'}</Button> */}
          <Button onClick={t.blur.bind(this, k)} className="m-r10">
            {'close'}
          </Button>
          <Button
            type="primary"
            className="acc"
            onClick={t.reset.bind(this, k)}
          >
            {'reset'}
          </Button>
        </div>
      </div>
    ),
    // filterIcon: <Icon type={t.state.params[k] ? 'appstore' : 'filter'} style={{ color: t.state.params[k] ? '#fff' : '#999' }} />,
    filterIcon: (
      <Icon
        type={t.state.params[k] ? 'appstore' : 'filter'}
        style={{ color: '#fff' }}
      />
    ),
    filterDropdownVisible: t.state[`${k}Visible`],
    onFilterDropdownVisibleChange: visible => {
      console.log('onFilterDropdownVisibleChange ：', visible, t, t.state);
      // if (!t.state.isHandleTableChange) {
      t.setState(
        {
          isChanged: true,
          [`${k}Visible`]: visible,
          // searchText: '', searchKey: '',
        },
        () => {
          console.log(' focusfocus ： ', Object.keys(config).length); //
          !Object.keys(config).length && t.searchInput.focus();
          // t.setState({
          //     searchText: '',
          // })

          // t.reset()
        },
      );
      // }
    },
  };
};

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

export const dataFilter = (t, data = [], searchText, k) => {
  // console.log(' dataFilter ：', t, t.state, data, 'k ：', k, 'searchText ：', searchText, );
  if (data.length && k != '') {
    const reg = new RegExp(searchText, 'gi');
    return data
      .map(record => {
        // console.log('record ：', record);
        if (record[k] != undefined) {
          const match = `${record[k]}`.match(reg);
          if (!match) {
            return null;
          }
          return {
            ...record,
            [k]: record[k],
          };
        } else {
          return {
            ...record,
          };
        }
      })
      .filter(record => !!record);
  } else {
    return data;
  }
};

export const customFilter = (t, k) => {
  //   console.log(' customFilter ：', t, t.onInputChange);
  return {
    filterDropdown: (
      <div className="custom-filter-dropdown">
        <Input
          ref={ele => (t.searchInput = ele)}
          placeholder={`${INPUT_TXT}The Search Text`}
          value={t.state.searchText}
          onChange={t.onInputChange.bind(t, k)}
        />
        <Button type="primary" onClick={t.blur.bind(this, k)} className="m-r10">
          關閉
        </Button>
        <Button type="primary" onClick={t.reset.bind(this, k)}>
          重置
        </Button>
      </div>
    ),
    filterIcon: (
      <Icon
        type="filter"
        style={{ color: t.state.filtered ? '#fff' : '#fff' }}
      />
    ),
    filterDropdownVisible: t.state[`${k}Visible`],
    onFilterDropdownVisibleChange: visible => {
      console.log(
        ' onFilterDropdownVisibleChange  ：',
        visible,
        t,
        t.state,
        `${k}Visible`,
        k,
      );
      // if (!t.state.isHandleTableChange) {
      t.setState(
        {
          [`${k}Visible`]: visible,
          // searchText: '', searchKey: '',
        },
        () => {
          console.log(' focusfocus ： '); //
          t.searchInput.focus();
          // t.setState({
          //     searchText: '',
          // })
          t.reset();
        },
      );
      // }
    },
  };
};

export const formatConfig = config =>
  config.map((v, i) => ({
    ...v,
    // itemProps: { ...v.itemProps, key: `key${i}`, name: `name${i}` },
    // itemProps: v.rowText || typeof type === 'function' ? { ...v.itemProps, key: `key${i}`,  } : { ...v.itemProps, key: `key${i}`, name: `name${i}` },
    itemProps:
      v.rowText || v.formType === 'Dynamic' || v.formType === 'rowText'
        ? { ...v.itemProps, key: `key${i}` }
        : { ...v.itemProps, key: `key${i}`, name: `name${i}` },
  }));