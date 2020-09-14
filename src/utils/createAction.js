

import { createAction,  } from 'redux-actions'// 




export const action = (prefix, ) => {
  return (type) => createAction(prefix + '/' + type)
} 






















