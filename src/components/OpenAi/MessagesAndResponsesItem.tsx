import React from 'react';
import {View, Image, Text} from 'react-native';
import {CONTANTS} from '../../helpers/api';
import {Message} from '../../screens/openAI';
import {styles} from '../../screens/openAI/styles';
import Chat from '../../assets/chat.png';

export default function MessagesAndResponsesItem({item}: {item: Message}) {
  return (
    <View
      style={{
        backgroundColor:
          item.role === CONTANTS.role.user ? '#343541' : '#444654',
        padding: 0,
        borderRadius: 0,
        margin: 0,
        borderBottomColor: '#202123',
        borderBottomWidth: 1,
      }}>
      <>
        {item.role !== CONTANTS.role.user ? (
          <Image source={Chat} style={styles.image} />
        ) : null}
      </>
      <Text
        style={{
          color: item.role === CONTANTS.role.user ? '#fff' : '#fff',
          marginLeft: '3%',
          marginRight: '2%',
          marginBottom: '4%',
          paddingHorizontal: '2%',
          marginTop: item.role === CONTANTS.role.user ? '4%' : '2%',
        }}>
        {item.content}
      </Text>
    </View>
  );
}
