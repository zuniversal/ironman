
import { init, action,   } from '@/utils/createAction'// 
import * as services from "@/services/organize"


const namespace = 'organize'
const {createAction, createCRUD, } = init(namespace)

const otherActions = [
  'syncOAAsync',
  'getPortraitAsync',
]

export const actions = {

  ...createCRUD(otherActions),

}

// console.log(' actions ： ', actions,  )// 

export const mapStateToProps = state => state[namespace]




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
      return { 
        ...state, 
        // ...payload,
        dataList: [payload.bean, ],
      }
    },
    getItem(state, {payload, type}) {
      return { 
        ...state, 
        // ...payload,
        // dataList: [payload.bean, ],
      }
    },
    addItem(state, {payload, type}) {
      return { 
        ...state, 
        dataList: [payload.bean, ...state.dataList,  ],
      }
    },
    editItem(state, {payload, type}) {
      return { 
        ...state, 
        dataList: state.dataList.map((v) => ({...v.id !== payload.payload.d_id ? payload : v,   })),
        // dataList: state.dataList.map((v) => ({...v.id !== payload.payload.data.id ? payload.data : v,   })),
      }
    },
    removeItem(state, {payload, type}) {
      const removeList = payload.payload.filter((v) => v.id)
      return { 
        ...state, 
        // dataList: state.dataList.filter((v) => v.id !== payload.payload.d_id)
        dataList: state.dataList.filter((v) => removeList.some(item => v.id === item))
      }
    },




  },

  effects: {
    *getListAsync({payload, action, type}, {call, put,   }) {
      const res = yield call(services.getList, payload)
      yield put(action(res))

    },    
    *getItemAsync({payload, action, type}, {call, put,   }) {
      const res = yield call(services.getItem, payload)
      yield put(action(res))

    },
    *addItemAsync({payload, action, type}, {call, put,   }) {
      const res = yield call(services.addItem, payload)
      yield put(action(res))
      
    },
    *editItemAsync({payload, action, type}, {call, put,   }) {
      const res = yield call(services.editItem, payload)
      yield put(action({...res, payload,  }))
      
    },
    *removeItemAsync({payload, action, type}, {call, put,   }) {
      const res = yield call(services.removeItem, payload)
      yield put(action({...res, payload,  }))
      
    },






  },


}







