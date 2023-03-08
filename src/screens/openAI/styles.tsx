import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  image: {
    height: 30,
    width: 30,
    padding: 10,
    marginTop: '5%',
    marginBottom: 0,
    marginLeft: '5%',
    borderRadius: 2,
  },
  card: {
    borderRadius: 5,
    padding: 20,
    backgroundColor: '#383444',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#343541',
    // backgroundColor: '#484454',
  },
  button: {
    width: '10%',
    marginVertical: 20,
  },
  response: {
    color: 'black',
    marginVertical: 1,
    padding: 15,
  },
  baseFont: {
    color: 'black',
    marginVertical: 3,
    padding: 15,
  },
  example: {
    color: 'black',
    padding: 2,
    textAlign: 'center',
  },
});
