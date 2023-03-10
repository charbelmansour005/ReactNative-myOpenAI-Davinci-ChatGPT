import React from 'react';
import {View, Image, Text} from 'react-native';
import {CONTANTS} from '../../services/api';
import {Message} from '../../screens/openAI';
import Chat from '../../assets/chat.png';
import {styles} from './styles';

export default function MessagesAndResponsesItem({item}: {item: Message}) {
  return (
    <View
      style={{
        backgroundColor:
          item.role === CONTANTS.role.user ? '#343541' : '#444654',
        ...styles.textWrapper,
      }}>
      <>
        {item.role !== CONTANTS.role.user ? (
          <Image source={Chat} style={styles.image} />
        ) : null}
      </>
      <Text
        style={{
          color: item.role === CONTANTS.role.user ? '#fff' : '#fff',
          marginTop: item.role === CONTANTS.role.user ? '4%' : '2%',
          ...styles.botUserText,
        }}>
        {item.content}
      </Text>
    </View>
  );
}
