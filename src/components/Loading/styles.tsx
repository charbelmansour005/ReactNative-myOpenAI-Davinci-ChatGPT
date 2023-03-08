import {StyleSheet, Dimensions} from 'react-native';

export const styles = StyleSheet.create({
  animation: {
    width: '80%',
    height: Dimensions.get('screen').height * 0.5,
    aspectRatio: 0.5,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  },
});
