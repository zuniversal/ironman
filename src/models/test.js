// import {
  
//   getItem,
//   getItemDetail,
//   addCustomer,
//   editCustomer,
//   removeCustomer,

// } from "@/services/client"

import { action,  } from '@/utils/createAction'// 
import * as client from "@/services/client"


// import { delay } from 'umi/saga'
// import { createAction,  } from 'redux-actions'// 


const namespace = 'client'
const createAction = action(namespace)

export const getItem = createAction('getItem')
export const getItemAsync = createAction('getItemAsync')

// createAction('client/add')()
// export const counterAdd = createAction('client/getItem')



export default {
  // namespace,

  state: {
    count: 1, 

  },

  reducers: {
    getItem(state, {payload, type}) {
      console.log(' getItem 修改  ： ', state, payload, type,     )// 
      return { 
        ...state, 
        count: state.count + 1,
        ...payload,
      }
    },


  },

  effects: {
    // actionChannel  all  apply  call  cancel  cancelled  cps  flush  fork  getContext  join  put  race  select  setContext  spawn  take  takeEvery  takeLatest  takem  throttle      *getItemAsync(params, action) {
    *getItemAsync({payload, type}, {call, put,   }) {
      console.log(' getItemAsync ： ', payload, type,     )// 

      const params = { name: 'zyb',  }
      const res = yield call(client.getItem, params)
      console.log('  getItemAsync res ：', res,  )//  
      yield put(getItem(res))



    },



  },


}







