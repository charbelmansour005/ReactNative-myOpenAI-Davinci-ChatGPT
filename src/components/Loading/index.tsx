import React from 'react';
import {View} from 'react-native';
import {styles} from './styles';
import LottieView from 'lottie-react-native';

const ShowApiBusy = (): JSX.Element => (
  <View style={styles.center}>
    <LottieView
      speed={115}
      style={styles.animation}
      source={{
        uri: 'https://assets7.lottiefiles.com/packages/lf20_xlowl4wu.json',
      }}
      autoPlay={true}
      loop={true}
    />
  </View>
);

export default ShowApiBusy;
