const EventModel = {
  namespace: 'event',

  state: {
    event: '',
    data: null,
  },

  reducers: {
    emit(state, action) {
      console.log(' emit event ： ', state, action); //
      return {
        ...state,
        event: action.payload.event,
        data: action.payload.data,
      };
    },
  },
};

export default EventModel;
