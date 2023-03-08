import {View} from 'react-native';
import {styles} from './styles';
import React from 'react';
import {IconButton, TextInput} from 'react-native-paper';

type Props = {
  input: string;
  loading: boolean;
  setInput: (args?: any) => void;
  setBase: (args?: string) => void;
  handleSubmit: () => void;
};

const InputSubmit = ({...props}: Props) => {
  return (
    // below view gives us the chat look
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        backgroundColor: '#dbdbdb',
        // backgroundColor: '#383444',
        padding: 10,
      }}>
      <TextInput
        style={styles.input}
        value={props.input}
        onChangeText={text => props.setInput(text)}
        mode="outlined"
        activeOutlineColor="silver"
        textColor="black"
        placeholderTextColor="gray"
        outlineColor="gray"
        disabled={props.loading}
      />
      <IconButton
        icon={props.loading ? 'clock-time-eight-outline' : 'send'}
        iconColor="white"
        containerColor="#28a47c"
        size={24}
        onPress={() => {
          props.setBase(props.input);
          props.handleSubmit();
        }}
        mode="contained"
        style={{marginTop: 10, marginRight: 3}}
        disabled={props.loading || !props.input}
      />
    </View>
  );
};

export default InputSubmit;
