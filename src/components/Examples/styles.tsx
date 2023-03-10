import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  pressable: {
    padding: 5,
    backgroundColor: '#343541',
    borderRadius: 2,
    margin: '5%',
    borderColor: 'gray',
    borderWidth: 1,
  },
  image: {
    height: 30,
    width: 30,
    borderRadius: 2,
  },
  card: {
    borderRadius: 5,
    backgroundColor: '#3e3f4b',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  response: {
    color: '#fff',
    marginBottom: '10%',
  },
  example: {
    color: '#fff',
    padding: 2,
    textAlign: 'center',
  },
  exampleWrapper: {height: '100%', width: '80%', marginTop: '10%'},
  sonWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
