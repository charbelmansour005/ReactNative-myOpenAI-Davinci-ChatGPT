import {StyleSheet, Dimensions} from 'react-native';

export const styles = StyleSheet.create({
  animation: {
    width: '100%',
    height: Dimensions.get('screen').height * 0.4,
    aspectRatio: 1,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  },
});
