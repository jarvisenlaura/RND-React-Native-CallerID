const setListening = (value) => {
  return {
    type: value ? 'START_LISTENING' : 'STOP_LISTENING',
  };
};

const incomingCall = (value) => {
  return {
    type: value ? 'CALL_INCOMING' : 'CALL_NO_LONGER_INCOMING',
  };
};

const getNumber = (number) => {
  return {
    type: 'GET_NUMBER',
    number,
  };
};

const isLoading = (value) => {
  return {
    type: value ? 'DO_LOAD' : 'DO_NOT_LOAD',
  };
};

const getInfo = (numberInfo) => {
  return {
    type: 'GET_NUMBER_INFO',
    numberInfo,
  };
};

const haveInfo = ({numberInfo}) => {
  return {
    type: 'HERE_IS_NUMBER_INFO',
    numberInfo,
  };
};

const isError = (error) => {
  return {
    type: 'SENT_ERROR',
    error,
  };
};

const noCall = () => {
  return {
    type: 'NO_CALL',
  };
};

export {
  getInfo,
  isLoading,
  getNumber,
  incomingCall,
  setListening,
  isError,
  noCall,
  haveInfo,
};
