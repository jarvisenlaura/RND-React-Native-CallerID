const initialState = {
  featureOn: false,
  incoming: false,
  number: null,
  numberInfo: null,
  loading: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'START_LISTENING': {
      return {
        ...state,
        featureOn: true,
      };
    }
    case 'STOP_LISTENING': {
      return {
        ...state,
        featureOn: false,
      };
    }
    case 'CALL_INCOMING': {
      return {
        ...state,
        incoming: true,
      };
    }
    case 'CALL_NO_LONGER_INCOMING': {
      return {
        ...state,
        incoming: false,
      };
    }
    case 'GET_NUMBER': {
      return {
        ...state,
        number: action.number,
      };
    }
    case 'DO_LOAD': {
      return {
        ...state,
        loading: true,
      };
    }
    case 'DO_NOT_LOAD': {
      return {
        ...state,
        loading: false,
      };
    }
    case 'HERE_IS_NUMBER_INFO': {
      console.log('reducing here %o', action);
      return {
        ...state,
        numberInfo: action.numberInfo,
        loading: false,
      };
    }
    case 'NO_CALL': {
      return {
        ...state,
        incoming: false,
        number: null,
        loading: false,
        error: null,
        numberInfo: null,
      };
    }
    default: {
      return state;
    }
  }
};
