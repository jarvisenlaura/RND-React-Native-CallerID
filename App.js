/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  PermissionsAndroid,
  ActivityIndicator,
} from 'react-native';
import {connect} from 'react-redux';
import CallDetectorManager from 'react-native-call-detection';

import {
  setListening,
  incomingCall,
  isLoading,
  getNumber,
  getInfo,
  isError,
  noCall,
} from './actions';

class App extends React.Component {
  componentDidMount() {
    this.askPermission();
  }

  askPermission = async () => {
    try {
      const permissions = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.READ_CALL_LOG,
        PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE,
      ]);
      console.log(permissions);
    } catch (err) {
      console.warn(err);
    }
  };

  startListenerTapped = () => {
    const {incomingCall, getNumber, noCall, getInfo, setListening} = this.props;

    setListening(true);
    this.callDetector = new CallDetectorManager(
      (event, number) => {
        if (event === 'Disconnected') {
          // Do something call got disconnected
          noCall();
        } else if (event === 'Incoming') {
          // Do something call got incoming
          incomingCall(true);
          getNumber(number);
          getInfo(number);
        } else if (event === 'Offhook') {
          //Device call state: Off-hook.
          // At least one call exists that is dialing,
          // active, or on hold,
          // and no calls are ringing or waiting.
          incomingCall(true);
          getNumber(number);
        } else if (event === 'Missed') {
          // Do something call got missed
          noCall();
        }
      },
      true, // if you want to read the phone number of the incoming call [ANDROID], otherwise false
      () => {},
      // callback if your permission got denied [ANDROID] [only if
      //you want to read incoming number] default: console.error
      {
        title: 'Phone State Permission',
        message:
          'This app needs access to your phone state in order to react and/or to adapt to incoming calls.',
      },
    );
  };

  stopListenerTapped = () => {
    const {noCall, setListening} = this.props;

    setListening(false);
    noCall();
    this.callDetector && this.callDetector.dispose();
  };

  render() {
    const {
      featureOn,
      incoming,
      loading,
      number,
      numberInfo,
      error,
    } = this.props;
    let result;

    if (numberInfo && numberInfo.industry_code === '62010') {
      result = (
        <Text style={{fontSize: 40, textAlign: 'center'}}>
          Potential employer!
        </Text>
      );
    } else if (numberInfo && numberInfo.industry_code === '82200') {
      result = (
        <Text style={{fontSize: 40, textAlign: 'center'}}>
          Just a telemarketer.
        </Text>
      );
    } else {
      result = (
        <Text style={{fontSize: 40, textAlign: 'center'}}>
          No info, sorry.{' '}
        </Text>
      );
    }

    return (
      <View style={styles.container}>
        <Text style={styles.text}>Should the detection be on?</Text>
        <TouchableHighlight
          onPress={
            featureOn ? this.stopListenerTapped : this.startListenerTapped
          }>
          <View
            style={{
              width: 200,
              height: 200,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: featureOn ? 'greenyellow' : 'indianred',
            }}>
            <Text style={styles.text}>{featureOn ? `ON` : `OFF`} </Text>
          </View>
        </TouchableHighlight>
        {incoming && <Text style={{fontSize: 20}}>Call from {number}</Text>}
        {loading && (
          <View>
            <Text style={{fontSize: 20}}>Loading information</Text>
            <ActivityIndicator size="small" color="greenyellow" />
          </View>
        )}
        {numberInfo && result}
        {incoming && error && <Text>Error occurred.</Text>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'honeydew',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  text: {
    padding: 20,
    fontSize: 20,
  },
});

const mapStateToProps = (state) => {
  return {
    featureOn: state.featureOn,
    incoming: state.incoming,
    loading: state.loading,
    number: state.number,
    numberInfo: state.numberInfo,
    error: state.error,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setListening: (value) => {
      dispatch(setListening(value));
    },
    incomingCall: (value) => {
      dispatch(incomingCall(value));
    },
    isLoading: (value) => {
      dispatch(isLoading(value));
    },
    getNumber: (value) => {
      dispatch(getNumber(value));
    },
    getInfo: (value) => {
      dispatch(getInfo(value));
    },
    isError: (value) => {
      dispatch(isError(value));
    },
    noCall: (value) => {
      dispatch(noCall(value));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
