/* 
  在原操作方法基础上  可选择性使用 创建相关 actions方法 简化方法的调用  

*/


import { init, action,   } from '@/utils/createAction'// 
import * as services from "@/services/client"


// import { delay } from 'umi/saga'
// import { createAction,  } from 'redux-actions'// 


const namespace = 'test'
const {createAction, createCRUD, } = init(namespace)


// export const getListAsync = createAction('getListAsync')
// export const getItemAsync = createAction('getItemAsync')
// export const addItemAsync = createAction('addItemAsync')
// export const editItemAsync = createAction('editItemAsync')
// export const removeItemAsync = createAction('removeItemAsync')
// export const syncOAAsync = createAction('syncOAAsync')
// export const getPortraitAsync = createAction('getPortraitAsync')

const otherActions = [
  'syncOAAsync',
  'getPortraitAsync',
]


export const actions = {
  // getListAsync: createAction('getListAsync'),
  // getItemAsync: createAction('getItemAsync'),
  // addItemAsync: createAction('addItemAsync'),
  // editItemAsync: createAction('editItemAsync'),
  // removeItemAsync: createAction('removeItemAsync'),

  // syncOAAsync: createAction('syncOAAsync'),
  // getPortraitAsync: createAction('getPortraitAsync'),

  ...createCRUD(otherActions),

}

console.log(' actions ： ', actions,  )// 

// createAction('client/add')()
// export const counterAdd = createAction('client/getList')



export default {
  namespace,

  state: {
    dataList: [],  
    itemDetail: {},  
    
    syncOAData: {},  
    portraitData: {},  

  },

  reducers: {
    getList(state, {payload, type}) {
      console.log(' getList 修改  ： ', state, payload, type,     )// 
      return { 
        ...state, 
        count: state.count + 1,
        // ...payload,
        dataList: [payload.bean, ],
      }
    },
    getItem(state, {payload, type}) {
      console.log(' getItem 修改  ： ', state, payload, type,     )// 
      return { 
        ...state, 
        count: state.count + 1,
        // ...payload,
        // dataList: [payload.bean, ],
      }
    },
    addItem(state, {payload, type}) {
      console.log(' addItem 修改  ： ', state, payload, type,     )// 
      return { 
        ...state, 
        dataList: [payload.bean, ...state.dataList,  ],
      }
    },
    editItem(state, {payload, type}) {
      console.log(' editItem 修改  ： ', state, payload, type,     )// 
      return { 
        ...state, 
        dataList: state.dataList.map((v) => ({...v.id !== payload.payload.d_id ? payload : v,   })),
        // dataList: state.dataList.map((v) => ({...v.id !== payload.payload.data.id ? payload.data : v,   })),
      }
    },
    removeItem(state, {payload, type}) {
      console.log(' removeItem 修改  ： ', state, payload, type,     )// 
      const removeList = payload.payload.filter((v) => v.id)
      console.log(' removeList  payload.payload.filter v ： ', removeList,   )
      return { 
        ...state, 
        // dataList: state.dataList.filter((v) => v.id !== payload.payload.d_id)
        dataList: state.dataList.filter((v) => removeList.some(item => v.id === item))
      }
    },


    syncOA(state, {payload, type}) {
      console.log(' syncOA 修改  ： ', state, payload, type,     )// 
      return { 
        ...state,
        // portraitData: payload., 
      }
    },
    getPortrait(state, {payload, type}) {
      console.log(' getPortrait 修改  ： ', state, payload, type,     )// 
      return { 
        ...state, 
        // portraitData: payload., 
      }
    },


  },

  effects: {
    *getListAsync(params, {call, put,   }) {
      const {payload, action, type} = params
      console.log(' getListAsync ： ', payload, action, type, params,    )// 
      // const params = { name: 'zyb',  }
      // const res = yield call(services.getList, params)
      const res = yield call(services.getList, payload)
      // console.log('  getListAsync res ：', res,  )//  
      yield put(action(res))

    },    
    *getItemAsync({payload, action, type}, {call, put,   }) {
      console.log(' getItemAsync ： ', payload, type,     )// 
      const res = yield call(services.getItem, payload)
      yield put(action(res))

    },
    *addItemAsync({payload, action, type}, {call, put,   }) {
      console.log(' addItemAsync ： ', payload, type,     )// 
      const res = yield call(services.addItem, payload)
      // console.log('  addItem res ：', res,  )//  
      yield put(action(res))
      
    },
    *editItemAsync({payload, action, type}, {call, put,   }) {
      console.log(' editItemAsync ： ', payload, type,     )// 
      const res = yield call(services.editItem, payload)
      // console.log('  editItem res ：', res,  )//  
      yield put(action({...res, payload,  }))
      
    },
    *removeItemAsync({payload, action, type}, {call, put,   }) {
      console.log(' removeItemAsync ： ', payload, type,     )// 
      const res = yield call(services.removeItem, payload)
      console.log('  removeItem res ：', res, {...res, payload,} )//  
      yield put(action({...res, payload,  }))
      
    },


    *syncOAAsync({payload, action, type}, {call, put,   }) {
      console.log(' syncOAAsync ： ', payload, type,     )// 
      const res = yield call(services.syncOA, payload)
      // console.log('  syncOA res ：', res,  )//  
      yield put(action({...res, payload,  }))
      
    },
    *getPortraitAsync({payload, action, type}, {call, put,   }) {
      console.log(' getPortraitAsync ： ', payload, type,     )// 
      const res = yield call(services.getPortrait, payload)
      // console.log('  getPortrait res ：', res,  )//  
      yield put(action({...res, payload,  }))
      
    },




  },


}







