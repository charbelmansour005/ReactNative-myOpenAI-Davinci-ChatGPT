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
    <View style={styles.exampleWrapper}>
      <View style={styles.sonWrapper}>
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
        {Suggestions.map(suggestion => (
          <Pressable
            key={suggestion.key}
            style={styles.pressable}
            android_ripple={{
              color: 'white',
            }}
            onPress={() => setInput(suggestion.value)}>
            <Text style={styles.example}>{suggestion.value}</Text>
          </Pressable>
        ))}
      </Card>
    </View>
  );
};

export default Examples;
