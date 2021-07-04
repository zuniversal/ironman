import { history } from 'umi';
import { init, action } from '@/utils/createAction';

const namespace = 'layout';
const { createAction, createCRUD, batchTurn } = init(namespace);

const otherActions = ['getPortraitAsync'];

const batchTurnActions = ['setPathname', 'setTitle'];

export const actions = {
  ...batchTurn(batchTurnActions),
};

// console.log(' history ： ', history, window )//
export const mapStateToProps = state => state[namespace];

export default {
  namespace,

  state: {
    pathname: window.location.hash.split('#')[1],
    title: '',
  },

  reducers: {
    setPathname(state, { payload, type }) {
      console.log(
        ' setPathname ： ',
        state,
        payload,
        state.pathname != payload,
        state.pathname,
        payload,
      );
      // if (state.pathname != payload) {
      //   setTimeout(() => {
      //     console.log(' setPathname 延时器 ： ',  )
      //     history.push(payload);
      //   }, 0)
      // }
      return {
        pathname: payload,
      };
    },
    setTitle(state, { payload, type }) {
      console.log(
        ' setTitle ： ',
        state,
        payload,
        state.pathname != payload,
        state.pathname,
        payload,
      );
      return {
        title: payload,
      };
    },
  },

  effects: {},
};
