import { message } from 'antd';

export const dva = {
  config: {
    // onAction: createLogger(),
    onError(e) {
      console.log(' onError 检测到错误   ： ', e);
      // message.error(e.message, 3);
    },
    // onReducer: r => (state, action) => {
    //   const newState = r(state, action);
    //   console.log(' onReducer ： ', r, state, action, newState,  )//
    //   // if (action.payload && action.payload.actionType === 'app/logout') {
    //   //   return { app: newState.app, loading: newState.loading, routing: newState.routing };
    //   // }
    //   return newState;
    // },
  },
};
