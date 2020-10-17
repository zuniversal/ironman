// import { createAction,  } from 'redux-actions'//
// export const action = (prefix, ) => {
//   return (type) => createAction(prefix + '/' + type)
// }

// export const action = (prefix, ) => (types) => {
//   const type = prefix + '/' + types
//   console.log(' actiontype ： ', type,  )//
//   return (payload) => ({
//     type,
//     payload,
//   })
// }

// export const action = (prefix, ) => (types) => (payload) => ({
//   type: prefix + '/' + types,
//   payload: {
//     ...payload,
//     addInfo: 'zyb',
//   },
// })

// export const action = (payload) => ({
//   type,
//   payload,
// })

// export const action = (types) => (payload) => ({
//   type: types.split('Async')[0],
//   payload,
// })

// export const init = prefix => ({
//   createCRUD,
//   createAction: types => payload => ({
//     type: prefix + '/' + types,
//     payload,
//     action: action(types.split(suffix)[0]),
//   })
// })

const suffix = 'Async';

export const action = type => payload => ({
  type,
  payload,
});

const crudConfigs = [
  'getListAsync',
  'getItemAsync',
  'addItemAsync',
  'editItemAsync',
  'removeItemAsync',
  'removeItemsAsync',
];

// export const createCRUD = (config = []) => {
//   const actions = {}
//   return [...crudConfigs, ...config, ]
//   .forEach((type) => {
//     actions.[type] = payload => ({
//       type: prefix + '/' + types,
//       payload,
//       action: action(types.split(suffix)[0]),
//     })
//   })
// }

// 根据相应 models 命名 初始化 相应的带该model前缀的 action 方法
// 1. 函数显示调用 简化 action 调用方法的编写   副作用的  effects 里 可直接调用传入的 修改相应的同名 reducer 的方法
// 2. 可选择性使用 自动创建项目通用的 增删改查 相关 aciton

// export const init = prefix => {
//   return {
//     names: 'zyb',
//     createAction: (types = '',  ) => payload => ({
//       type: prefix + '/' + types,
//       payload,
//       action: action(types.split(suffix)[0]),
//     }),
//     createCRUD: (config = []) => {
//       console.log(' createCRUD this ： ', this,  )//
//       const actions = {}
//       const typeArr = [...crudConfigs, ...config, ]
//       typeArr.forEach(types => {
//           console.log(' createCRUD this22 ： ', this,  )//
//           actions[types] = payload => ({
//             type: prefix + '/' + types,
//             payload,
//             action: action(types.split(suffix)[0]),
//           })
//         });
//       return actions
//     },
//   }
// }

export const init = prefix => {
  const turnAction = (types = '') => payload => ({
    type: prefix + '/' + types,
    payload,
    action: action(types),
  });
  const createAction = (types = '') => payload => ({
    type: prefix + '/' + types,
    payload,
    action: action(types.split(suffix)[0]),
  });
  const createActions = (config = []) => {
    const actions = {};
    config.forEach(types => (actions[types] = createAction(types)));
    return actions;
  };
  const batchTurn = (config = []) => {
    const actions = {};
    config.forEach(types => (actions[types] = turnAction(types)));
    return actions;
  };
  // const customActions = (actionMap = {}, ) => {
  //   console.log(' actionMap ： ', actionMap,  )//
  //   const actions = {};
  //   Object.keys(actionMap).forEach(types => (actions[types] = action(actionMap[types])));
  //   return actions
  // };
  return {
    names: 'zyb',
    // customActions,
    createAction,
    createActions,
    createCRUD: (config = []) => createActions([...crudConfigs, ...config]),
    turnAction,
    batchTurn: (config = []) => batchTurn(config),
  };
};
