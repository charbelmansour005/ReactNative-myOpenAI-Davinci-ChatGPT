import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  SafeAreaView,
  Pressable,
  FlatList,
} from 'react-native';
import {Divider} from 'react-native-paper';
import {styles} from './styles';
import Chat from '../../assets/chat.png';
import {CONTANTS} from '../../helpers/api';
import axios from 'axios';
import {StatusBar} from 'react-native';
import {useMutation} from 'react-query';

import {Examples, InputSubmit, Loading} from '../../components';

type Message = {
  id: string;
  role: string;
  content: string;
  timestamp: Date;
};

interface Choice {
  message: Message;
  index: number;
}

interface Completion {
  id: string;
  object: string;
  created: number;
  model: string;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
  choices: Choice[];
}

const OpenAI = () => {
  const [input, setInput] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [response, setResponse] = useState<Message[]>([]);
  // const [response, setResponse] = useState<string | null>(null);
  const [base, setBase] = useState<any>(null);

  const {mutate, isLoading: isOpenAIing} = useMutation(
    async () => {
      const token = CONTANTS.myToken;
      const payload = {
        model: 'gpt-3.5-turbo',
        messages: [{role: 'user', content: input}],
      };
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.post(CONTANTS.URL, payload, {
        headers: headers,
      });
      return response.data;
    },
    {
      onSuccess: async response => {
        try {
          const botMessage = response.choices[0].message;
          setResponse(prev => [...prev, botMessage]);
        } catch (error: any) {
          throw new Error(error);
        }
      },
      onError: (error: any) => {
        if (error.response) {
          const message = error.response.data.message;
          console.log(message);
        }
      },
    },
  );

  const handleSendMessage = () => {
    if (input === '') return;
    const message = {
      id: new Date().toISOString(),
      role: 'user',
      content: input,
      timestamp: new Date(), // add timestamp property
    };
    setMessages(prev => [...prev, message]);
    mutate();
    setInput('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={'#ffffff'} barStyle="dark-content" />
      {isOpenAIing && Loading()}
      <FlatList
        data={messages.concat(response)}
        keyExtractor={(item: Message) =>
          `${Math.random()}+${item.timestamp ? item.timestamp.getTime() : ''}`
        } // use timestamp property as part of the key
        renderItem={({item}: {item: Message}) => (
          <View
            style={{
              backgroundColor: item.role === 'user' ? '#e6e6e6' : '#2f95dc',
              padding: 10,
              borderRadius: 10,
              margin: 5,
            }}>
            <Text style={{color: item.role === 'user' ? '#333' : '#fff'}}>
              {item.content}
            </Text>
          </View>
        )}
      />
      {response.length > 1 && !isOpenAIing ? (
        <View style={{marginBottom: 80}}>
          {/* <Divider style={{height: 0.5}} /> */}
          {/* <Text selectable style={styles.baseFont}>
            You: {base}
          </Text>
          <Divider style={{height: 0.5}} /> */}
          {/* <Image source={Chat} style={styles.image} /> */}
          {/* <Text selectable style={styles.response}>
            {response}
          </Text> */}
          <Divider />
          <View
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              marginVertical: 20,
            }}>
            <Pressable
              style={{
                padding: 8,
                backgroundColor: '#28a47c',
                borderRadius: 2,
                marginHorizontal: 20,
              }}
              android_ripple={{color: 'white'}}
              onPress={() => {
                setInput('');
              }}>
              <Text style={{color: 'white'}}>Clear</Text>
            </Pressable>
            <Pressable
              style={{
                padding: 8,
                backgroundColor: '#28a47c',
                borderRadius: 2,
                marginHorizontal: 20,
              }}
              android_ripple={{color: 'white'}}
              onPress={() => {
                setInput(base);
                setBase(input);
                handleSendMessage();
              }}>
              <Text style={{color: 'white'}}>Regenerate response</Text>
            </Pressable>
          </View>
        </View>
      ) : null}
      {!response && !isOpenAIing && <Examples setInput={setInput} />}
      <InputSubmit
        input={input}
        setInput={setInput}
        loading={isOpenAIing}
        setBase={setBase}
        handleSubmit={handleSendMessage}
      />
    </SafeAreaView>
  );
};

export default OpenAI;
