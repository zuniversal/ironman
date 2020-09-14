// import {
  
//   getCustomer,
//   getCustomerDetail,
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

export const getCustomer = createAction('getCustomer')
export const getCustomerAsync = createAction('getCustomerAsync')

// createAction('client/add')()
// export const counterAdd = createAction('client/getCustomer')



export default {
  // namespace,

  state: {
    count: 1, 

  },

  reducers: {
    getCustomer(state, {payload, type}) {
      console.log(' getCustomer 修改  ： ', state, payload, type,     )// 
      return { 
        ...state, 
        count: state.count + 1,
        ...payload,
      }
    },


  },

  effects: {
    // actionChannel  all  apply  call  cancel  cancelled  cps  flush  fork  getContext  join  put  race  select  setContext  spawn  take  takeEvery  takeLatest  takem  throttle      *getCustomerAsync(params, action) {
    *getCustomerAsync({payload, type}, {call, put,   }) {
      console.log(' getCustomerAsync ： ', payload, type,     )// 

      const params = { name: 'zyb',  }
      const res = yield call(client.getCustomer, params)
      console.log('  getCustomerAsync res ：', res,  )//  
      yield put(getCustomer(res))



    },



  },


}







