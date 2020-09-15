// import {
  
//   get,
//   getDetail,
//   add,
//   edit,
//   remove,

// } from "@/services/client"

import { action,  } from '@/utils/createAction'// 
import * as client from "@/services/client"


const namespace = 'houseNo'
const createAction = action(namespace)

export const getList = createAction('getList')
export const getItem = createAction('getItem')
export const addItem = createAction('addItem')
export const editItem = createAction('editItem')
export const removeItem = createAction('removeItem')




export default {
  namespace,

  state: {
    count: 1, 

  },

  reducers: {
    get(state, {payload, type}) {
      console.log(' get 修改  ： ', state, payload, type,     )// 
      return { 
        ...state, 
        count: state.count + 1,
        // ...payload,
        clientData: [payload.bean, ],
      }
    },
    getItem(state, {payload, type}) {
      console.log(' getItem 修改  ： ', state, payload, type,     )// 
      return { 
        ...state, 
        // clientData: [payload.bean, ],
      }
    },
    add(state, {payload, type}) {
      console.log(' add 修改  ： ', state, payload, type,     )// 
      return { 
        ...state, 
        // clientData: [payload.bean, ],
      }
    },
    edit(state, {payload, type}) {
      console.log(' edit 修改  ： ', state, payload, type,     )// 
      return { 
        ...state, 
        // clientData: [payload.bean, ],
      }
    },
    remove(state, {payload, type}) {
      console.log(' remove 修改  ： ', state, payload, type,     )// 
      return { 
        ...state, 
        // clientData: [payload.bean, ],
      }
    },


  },

  effects: {
    *getList({payload, type}, {call, put,   }) {
      console.log(' getList ： ', payload, type,     )// 
      const params = { name: 'zyb',  }
      const res = yield call(client.get, params)
      // console.log('  getList res ：', res,  )//  
      yield put(get(res))

    },
    *getItemAsync({payload, type}, {call, put,   }) {
      console.log(' getItemAsync ： ', payload, type,     )// 
      const res = yield call(client.getItem, payload)
      // console.log('  getItem res ：', res,  )//  
      yield put(getItem(res))
      
    },
    *addAsync({payload, type}, {call, put,   }) {
      console.log(' addAsync ： ', payload, type,     )// 
      const res = yield call(client.add, payload)
      // console.log('  add res ：', res,  )//  
      yield put(add(res))
      
    },


  },


}







