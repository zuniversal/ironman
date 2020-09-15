// import {
  
//   getList,
//   getListDetail,
//   addItem,
//   editItem,
//   removeItem,

// } from "@/services/client"

import { action,  } from '@/utils/createAction'// 
import * as client from "@/services/client"


// import { delay } from 'umi/saga'
// import { createAction,  } from 'redux-actions'// 


const namespace = 'client'
const createAction = action(namespace)

export const getItem = createAction('getItem')
export const getList = createAction('getList')
export const addItem = createAction('addItem')
export const editItem = createAction('editItem')
export const removeItem = createAction('removeItem')

export const getListAsync = createAction('getListAsync')
export const getItemAsync = createAction('getItemAsync')
export const addItemAsync = createAction('addItemAsync')
export const editItemAsync = createAction('editItemAsync')
export const removeItemAsync = createAction('removeItemAsync')


// createAction('client/add')()
// export const counterAdd = createAction('client/getList')



export default {
  namespace,

  state: {
    count: 1, 

  },

  reducers: {
    getList(state, {payload, type}) {
      console.log(' getList 修改  ： ', state, payload, type,     )// 
      return { 
        ...state, 
        count: state.count + 1,
        // ...payload,
        clientList: [payload.bean, ],
      }
    },
    getItem(state, {payload, type}) {
      console.log(' getItem 修改  ： ', state, payload, type,     )// 
      return { 
        ...state, 
        count: state.count + 1,
        // ...payload,
        // clientList: [payload.bean, ],
      }
    },
    addItem(state, {payload, type}) {
      console.log(' addItem 修改  ： ', state, payload, type,     )// 
      return { 
        ...state, 
        clientList: [payload.bean, ...state.clientList,  ],
      }
    },
    editItem(state, {payload, type}) {
      console.log(' editItem 修改  ： ', state, payload, type,     )// 
      return { 
        ...state, 
        clientList: state.clientList.map((v) => ({...v.id !== payload.payload.d_id ? payload : v,   })),
      }
    },
    removeItem(state, {payload, type}) {
      console.log(' removeItem 修改  ： ', state, payload, type,     )// 
      return { 
        ...state, 
        clientList: state.clientList.filter((v) => v.id !== payload.payload.d_id)
      }
    },


  },

  effects: {
    // actionChannel  all  apply  call  cancel  cancelled  cps  flush  fork  getContext  join  put  race  select  setContext  spawn  take  takeEvery  takeLatest  takem  throttle      *getListAsync(params, action) {
    *getListAsync({payload, type}, {call, put,   }) {
      console.log(' getListAsync ： ', payload, type,     )// 
      const params = { name: 'zyb',  }
      // const res = yield call(client.getList, params)
      const res = yield call(client.getList, payload)
      // console.log('  getListAsync res ：', res,  )//  
      // 副作用里派发的 type 不应该携带前缀 
      // Warning: [sagaEffects.put] client/getList should not be prefixed with namespace client
      yield put(getList(res))

    },    
    *getItemAsync({payload, type}, {call, put,   }) {
      console.log(' getItemAsync ： ', payload, type,     )// 
      const res = yield call(client.getItem, payload)
      yield put(getItem(res))

    },
    *addItemAsync({payload, type}, {call, put,   }) {
      console.log(' addItemAsync ： ', payload, type,     )// 
      const res = yield call(client.addItem, payload)
      // console.log('  addItem res ：', res,  )//  
      yield put(addItem(res))
      
    },
    *editItemAsync({payload, type}, {call, put,   }) {
      console.log(' editItemAsync ： ', payload, type,     )// 
      const res = yield call(client.editItem, payload)
      // console.log('  editItem res ：', res,  )//  
      yield put(editItem({...res, payload,  }))
      
    },
    *removeItemAsync({payload, type}, {call, put,   }) {
      console.log(' removeItemAsync ： ', payload, type,     )// 
      const res = yield call(client.removeItem, payload)
      // console.log('  removeItem res ：', res,  )//  
      yield put(removeItem({...res, payload,  }))
      
    },


  },


}







