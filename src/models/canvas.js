const CanvasDataModel = {
  namespace: 'canvas',

  state: {
    data: {
      lineName: 'curve',
      fromArrowType: '',
      toArrowType: 'triangleSolid',
      scale: 1,
      locked: 0,
    },
  },

  reducers: {
    update(state, action) {
      console.log(' emit update ： ', state, action); //
      return {
        ...state,
        data: action.payload.data,
      };
    },
  },
};

export default CanvasDataModel;
