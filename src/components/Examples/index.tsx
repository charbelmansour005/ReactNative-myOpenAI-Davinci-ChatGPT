import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Card} from 'react-native-paper';
import {Suggestions} from '../../helpers/suggestions';
import {styles} from './styles';

type Props = {
  setInput: (args?: any) => void;
};

const Examples = ({...props}: Props) => {
  return (
    <View style={{flex: 1, marginBottom: '40%'}}>
      <Text
        style={{
          textAlign: 'center',
          ...styles.response,
        }}>
        Examples
      </Text>
      <Card mode="elevated" style={styles.card}>
        <Pressable
          style={styles.pressable}
          android_ripple={{color: 'gray'}}
          onPress={() => props.setInput(Suggestions.One)}>
          <Text style={styles.example}>{Suggestions.One}</Text>
        </Pressable>
        <Pressable
          style={styles.pressable}
          android_ripple={{color: 'gray'}}
          onPress={() => props.setInput(Suggestions.Two)}>
          <Text style={styles.example}>{Suggestions.Two}</Text>
        </Pressable>
      </Card>
    </View>
  );
};

export default Examples;
