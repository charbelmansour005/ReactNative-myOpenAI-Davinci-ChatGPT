import React from 'react';
import {View} from 'react-native';
import {styles} from './styles';
import LottieView from 'lottie-react-native';
// import CursorLoader from '../../assets/json/'

const ShowApiBusy = () => (
  <View style={styles.center}>
    <LottieView
      speed={1}
      style={styles.animation}
      source={require('../../assets/json/99274-loading.json')}
      autoPlay={true}
      loop={true}
    />
  </View>
);

export default ShowApiBusy;
