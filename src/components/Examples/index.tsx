import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Card} from 'react-native-paper';
import Chat from '../../assets/sun.png';
import {Suggestions} from '../../helpers/suggestions';
import {styles} from './styles';

type Props = {
  setInput: (args?: any) => void;
};

const Examples = ({...props}: Props) => {
  return (
    <View style={{flex: 1, marginBottom: '80%'}}>
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
          onPress={() => props.setInput(Suggestions.One)}>
          <Text style={styles.example}>{Suggestions.One}</Text>
        </Pressable>
        <Pressable
          style={styles.pressable}
          android_ripple={{
            color: 'white',
          }}
          onPress={() => props.setInput(Suggestions.Two)}>
          <Text style={styles.example}>{Suggestions.Two}</Text>
        </Pressable>
      </Card>
    </View>
  );
};

export default Examples;
