import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {Dispatch, SetStateAction} from 'react';
import {Card} from 'react-native-paper';
import Chat from '../../assets/sun.png';
import {Suggestions} from '../../helpers/suggestions';
import {styles} from './styles';

type Props = {
  setInput: Dispatch<SetStateAction<string>>;
};

const Examples = ({setInput}: Props) => {
  return (
    <View style={{height: '100%', width: '50%', marginTop: '50%'}}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image source={Chat} style={styles.image} />
        <Text
          style={{
            textAlign: 'center',
            ...styles.response,
          }}>
          Examples
        </Text>
      </View>

      <Card mode="outlined" style={styles.card}>
        <Pressable
          style={styles.pressable}
          android_ripple={{
            color: 'white',
          }}
          onPress={() => setInput(Suggestions.One)}>
          <Text style={styles.example}>{Suggestions.One}</Text>
        </Pressable>
        <Pressable
          style={styles.pressable}
          android_ripple={{
            color: 'white',
          }}
          onPress={() => setInput(Suggestions.Two)}>
          <Text style={styles.example}>{Suggestions.Two}</Text>
        </Pressable>
      </Card>
    </View>
  );
};

export default Examples;
