import { createLogger } from 'redux-logger';
import { message } from 'antd';

export const dva = {
  config: {
    // onAction: createLogger(),
    onError(e) {
      console.log(' onError 检测到错误   ： ', e,  )
      // message.error(e.message, 3);
    },
  },
};



