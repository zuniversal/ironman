

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




export const action = (prefix, ) => (types) => (payload) => ({
  type: prefix + '/' + types,
  payload,
})


// export const action = (type) => (payload) => ({
//   type,
//   payload,
// })


// export const prefixAction = (prefix, ) => (types) => (payload) => ({
//   type: prefix + '/' + types,
//   payload,
// })



















