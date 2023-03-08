import {View} from 'react-native';
import {styles} from './styles';
import React from 'react';
import {IconButton, TextInput} from 'react-native-paper';
import LottieView from 'lottie-react-native';

type Props = {
  input: string;
  loading: boolean;
  setInput: (args?: any) => void;
  setBase: (args?: string) => void;
  handleSubmit: () => void;
};

const InputSubmit = ({...props}: Props) => (
  // below view gives us the chat look
  <View
    style={{
      display: 'flex',
      flexDirection: 'row',
      position: 'absolute',
      bottom: 0,
      // backgroundColor: '#dbdbdb',
      backgroundColor: '#343541',
      padding: 10,
    }}>
    <TextInput
      style={styles.input}
      value={props.input}
      onChangeText={text => props.setInput(text)}
      mode="outlined"
      activeOutlineColor="gray"
      cursorColor={'white'}
      textColor="white"
      placeholderTextColor="gray"
      outlineColor="gray"
      disabled={props.loading}
    />
    <>
      {props.loading ? (
        <LottieView
          speed={1}
          style={{height: 6, marginTop: '7%', marginLeft: '4.2%'}}
          source={require('../../assets/json/95076-loading-dots.json')}
          autoPlay={true}
          loop={true}
        />
      ) : (
        <IconButton
          icon={props.loading ? 'clock-time-eight-outline' : 'send'}
          iconColor="white"
          containerColor="#40414f"
          size={24}
          borderless={true}
          onPress={() => {
            props.setBase(props.input);
            props.handleSubmit();
          }}
          mode="contained"
          style={{marginTop: 10, marginRight: 3}}
          disabled={props.loading || !props.input}
        />
      )}
    </>
  </View>
);

export default InputSubmit;
