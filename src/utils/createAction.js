

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


export const action = type => payload => ({
  type,
  payload,
})

// export const action = (payload) => ({
//   type,
//   payload,
// })

// export const action = (types) => (payload) => ({
//   type: types.split('Async')[0],
//   payload,
// })


export const init = prefix => types => payload => ({
  type: prefix + '/' + types,
  payload,
  action: action(types.split('Async')[0])
})




// export const prefixAction = (prefix, ) => (types) => (payload) => ({
//   type: prefix + '/' + types,
//   payload,
// })



















